import type { Job, Profile, ResumeAnalysis } from '../types'
export interface Credentials {
  email: string
  password: string
  role: string
  [key: string]: string
}
export interface SessionUser {
  role: string
}
export interface CareerService {
  listJobs(): Promise<Job[]>
  getSaved(): Promise<number[]>
  setSaved(jobId: number, saved: boolean): Promise<number[]>
  getApplications(): Promise<number[]>
  apply(jobId: number): Promise<number[]>
  getProfile(): Promise<Profile>
  saveProfile(profile: Profile): Promise<Profile>
  authenticate(data: Credentials, register: boolean): Promise<SessionUser>
  createJob(data: Record<string, string>): Promise<Job>
  analyzeResume(file: File): Promise<ResumeAnalysis>
  inviteCandidate(candidateId: number): Promise<void>
}
