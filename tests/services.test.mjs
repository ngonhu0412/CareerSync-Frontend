import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

// Chạy service TypeScript mà không thêm thư viện test vào dự án.
function loadService(file, globals = {}) {
  const cache = new Map()
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports
    const source = fs.readFileSync(filename, 'utf8').replaceAll('import.meta.env', 'testEnv')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2023 } })
    const module = { exports: {} }
    cache.set(filename, module)
    const context = vm.createContext({ module, exports: module.exports, Headers, FormData, ...globals,
      require: name => load(path.resolve(path.dirname(filename), `${name}.ts`)),
    })
    new vm.Script(outputText, { filename }).runInContext(context)
    return module.exports
  }
  return load(path.resolve(file))
}

test('mock: persistence, duplicate prevention, job creation, corrupt storage', async () => {
  const values = new Map()
  const localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const { mockService: service } = loadService('src/services/mockService.ts', { localStorage })
  assert.equal((await service.listJobs()).length, 6)
  await service.setSaved(1, true)
  assert.equal((await service.setSaved(1, true)).length, 1)
  assert.equal((await service.setSaved(1, false)).length, 0)
  await service.apply(2)
  assert.equal((await service.apply(2)).length, 1)
  await service.saveProfile({ name: 'Kim', email: 'kim@example.com' })
  assert.equal((await service.getProfile()).name, 'Kim')
  const job = await service.createJob({ title: 'QA Engineer', location: 'Seoul' })
  assert.equal((await service.listJobs())[0].id, job.id)
  assert.equal(job.title, 'QA Engineer')
  assert.ok((await service.analyzeResume()).skills.length)
  await service.authenticate({ email: 'x@example.com', password: 'secret-value', role: '구직자' })
  assert.equal([...values.values()].some(value => value.includes('secret-value')), false)
  values.set('cs-saved', 'invalid JSON')
  assert.equal((await service.getSaved()).length, 0)
})

test('API: base URL, cookie credentials, JSON body and multipart upload', async () => {
  const calls = []
  const fetch = async (url, options) => { calls.push({ url, ...options }); return { ok: true, status: 200, json: async () => [] } }
  const { apiService } = loadService('src/services/apiService.ts', { fetch, testEnv: { VITE_API_BASE_URL: 'https://backend.example/api/' } })
  await apiService.apply(7)
  assert.equal(calls[0].url, 'https://backend.example/api/me/applications')
  assert.equal(calls[0].credentials, 'include')
  assert.equal(calls[0].body, '{"jobId":7}')
  assert.equal(calls[0].headers.get('Content-Type'), 'application/json')
  await apiService.analyzeResume(new Blob(['pdf'], { type: 'application/pdf' }))
  assert.ok(calls[1].body instanceof FormData)
  assert.equal(calls[1].headers.has('Content-Type'), false)
})

test('HTTP: server error is surfaced instead of reporting success', async () => {
  const { request } = loadService('src/services/httpClient.ts', {
    testEnv: {}, fetch: async () => ({ ok: false, status: 401, json: async () => ({ message: 'Login required' }) }),
  })
  await assert.rejects(request('/me/profile'), /Login required/)
})
