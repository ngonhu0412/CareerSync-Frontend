import { useEffect, useState } from 'react'
import type { Job, Page, Profile, ResumeAnalysis } from '../types'
import { careerService, isMockMode } from '../services/careerService'
// Chứa state và điều phối dữ liệu; các trang chỉ hiển thị và gọi action.
export function useCareerStore() {
  const [page, setPage] = useState<Page>((location.hash.slice(1) as Page) || 'home')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')
  const [region, setRegion] = useState('전체 지역')
  const [selected, setSelected] = useState<Job>({ id: 0, company: '', logo: '', title: '', category: '', location: '', tags: [], color: 'blue', score: 0 })
  const [saved, setSaved] = useState<number[]>([])
  const [applied, setApplied] = useState<number[]>([])
  const [role, setRole] = useState('구직자')
  const [logged, setLogged] = useState(false)
  const [toast, setToast] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [analyzed, setAnalyzed] = useState(false)
  const [candidate, setCandidate] = useState(0)
  const [invited, setInvited] = useState<number[]>([])
  const [onlySaved, setOnlySaved] = useState(false)
  useEffect(() => { const sync = () => { setPage((location.hash.slice(1) as Page) || 'home'); window.scrollTo(0, 0) }; window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync) }, [])
  const go = (p: Page) => { setPage(p); location.hash = p; window.scrollTo(0, 0) }
  const notify = (s: string) => { setToast(s); window.setTimeout(() => setToast(''), 3500) }
  const [jobs, setJobs] = useState<Job[]>([])
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [profile, setProfile] = useState<Profile>({})
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  // Tải dữ liệu công khai trước; chỉ tải dữ liệu cá nhân khi đăng nhập ở chế độ API.
  useEffect(() => {
    let active = true
    setBusy(true)
    const load = async () => {
      const list = await careerService.listJobs()
      if (!active)
        return
      setJobs(list)
      setSelected(current => list.find(job => job.id === current.id) || list[0] || current)
      if (isMockMode || logged) {
        const [savedIds, applicationIds, currentProfile] = await Promise.all([
          careerService.getSaved(), careerService.getApplications(), careerService.getProfile(),
        ])
        if (active) {
          setSaved(savedIds)
          setApplied(applicationIds)
          setProfile(currentProfile)
        }
      }
    }
    void load().catch(e => {
      if (active)
        setError(e instanceof Error ? e.message : '데이터를 불러올 수 없습니다.')
    }).finally(() => {
      if (active)
        setBusy(false)
    })
    return () => { active = false }
  }, [logged])
  async function run<T>(action: () => Promise<T>): Promise<T | undefined> {
    setBusy(true)
    setError('')
    try {
      return await action()
    }
    catch (e) {
      const message = e instanceof Error ? e.message : '요청에 실패했습니다.'
      setError(message)
      notify(message)
    }
    finally {
      setBusy(false)
    }
  }
  function requireSession() {
    if (!isMockMode && !logged) {
      notify('로그인이 필요합니다.')
      go('login')
      return false
    }
    return true
  }
  async function save(id: number) {
    if (!requireSession())
      return
    await run(async () => { const next = await careerService.setSaved(id, !saved.includes(id)); setSaved(next) })
  }
  async function apply() {
    if (!requireSession())
      return
    if (applied.includes(selected.id))
      return
    await run(async () => { setApplied(await careerService.apply(selected.id)); notify('지원이 완료되었습니다.') })
  }
  async function saveProfile(data: Profile) { await run(async () => { setProfile(await careerService.saveProfile(data)); notify('프로필이 저장되었습니다.') }) }
  async function authenticate(data: Record<string, string>, register: boolean) { await run(async () => { const user = await careerService.authenticate({ ...data, email: data.email, password: data.password, role }, register); setRole(user.role); setLogged(true); go(user.role === '기업' ? 'company' : 'dashboard'); notify('로그인되었습니다.') }) }
  async function createJob(data: Record<string, string>) { await run(async () => { const job = await careerService.createJob(data); setJobs(current => [job, ...current]); notify('채용공고가 등록되었습니다.'); go('jobs') }) }
  async function analyzeResume() {
    if (!file)
      return
    await run(async () => { setAnalysis(await careerService.analyzeResume(file)); setAnalyzed(true) })
  }
  async function inviteCandidate(id: number) {
    if (!isMockMode) {
      notify('지원자 화면은 아직 데모 데이터입니다. 실제 지원자 API 연결이 필요합니다.')
      return
    }
    await run(async () => { await careerService.inviteCandidate(id); setInvited(current => [...current, id]); notify('면접 대상으로 선정했습니다.') })
  }
  const filtered = jobs.filter(j => (category === '전체' || j.category === category) && `${j.title} ${j.company} ${j.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (region === '전체 지역' || j.location.includes(region)) && (!onlySaved || saved.includes(j.id)))
  return { analysis, page, setPage, query, setQuery, category, setCategory, region, setRegion, selected, setSelected, saved, applied, role, setRole, logged, setLogged, file, setFile, analyzed, setAnalyzed, candidate, setCandidate, invited, setInvited, onlySaved, setOnlySaved, go, notify, save, apply, jobs, profile, saveProfile, authenticate, createJob, analyzeResume, inviteCandidate, busy, error, toast, filtered }
}
