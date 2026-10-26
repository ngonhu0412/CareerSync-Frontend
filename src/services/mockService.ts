import type { Job, Profile } from '../types'
import type { CareerService } from './contracts'
import { demoJobs } from '../data/jobs'
import { readStored, writeStored } from './mockStorage'
// Giả lập backend khi chưa có server. Không lưu mật khẩu.
export const mockService: CareerService = {
  async listJobs() { return readStored<Job[]>('cs-jobs', demoJobs) },
  async getSaved() { return readStored<number[]>('cs-saved', []) },
  async setSaved(id, saved) {
    const current = readStored<number[]>('cs-saved', [])
    return writeStored('cs-saved', saved ? [...new Set([...current, id])] : current.filter(value => value !== id))
  },
  async getApplications() { return readStored<number[]>('cs-applied', []) },
  async apply(id) { return writeStored('cs-applied', [...new Set([...readStored<number[]>('cs-applied', []), id])]) },
  async getProfile() { return readStored<Profile>('cs-profile', {}) },
  async saveProfile(profile) { return writeStored('cs-profile', profile) },
  async authenticate(data) { return { role: data.role } },
  async createJob(data) {
    const job: Job = { id: Date.now(), company: '우리 기업', logo: 'C', title: data.title, category: '개발 · IT', location: data.location, tags: [], color: 'blue', score: 0 }
    writeStored('cs-jobs', [job, ...readStored<Job[]>('cs-jobs', demoJobs)])
    return job
  },
  async analyzeResume() { return { skills: ['React', 'TypeScript', 'UI 개발'], strengths: '프로젝트 경험과 협업 역량이 명확하게 드러나요.', improvements: '성과를 수치로 표현하고, 프로젝트에서 맡은 역할을 구체적으로 작성해보세요.' } },
  async inviteCandidate() { },
}
