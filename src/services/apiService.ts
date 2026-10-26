import type { ResumeAnalysis } from '../types'
import type { CareerService } from './contracts'
import { request } from './httpClient'
// Chỉ chứa endpoint thật. Thống nhất URL và JSON với nhóm backend tại đây.
export const apiService: CareerService = {
  listJobs: () => request('/jobs'),
  getSaved: () => request('/me/saved-jobs'),
  setSaved: (id, saved) => request(`/me/saved-jobs/${id}`, { method: saved ? 'PUT' : 'DELETE' }),
  getApplications: () => request('/me/applications'),
  apply: jobId => request('/me/applications', { method: 'POST', body: JSON.stringify({ jobId }) }),
  getProfile: () => request('/me/profile'),
  saveProfile: profile => request('/me/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  authenticate: (data, register) => request(register ? '/auth/register' : '/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  createJob: data => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  analyzeResume: async (file) => { const body = new FormData(); body.append('file', file); return request<ResumeAnalysis>('/me/resume/analysis', { method: 'POST', body }) },
  inviteCandidate: id => request(`/company/candidates/${id}/interview`, { method: 'POST' }),
}
