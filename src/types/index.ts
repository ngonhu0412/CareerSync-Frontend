export type Page = 'home' | 'jobs' | 'detail' | 'login' | 'signup' | 'register' | 'dashboard' | 'resume' | 'matches' | 'profile' | 'applications' | 'company' | 'post' | 'candidates'
export interface Job {
  id: number
  company: string
  logo: string
  title: string
  category: string
  location: string
  tags: string[]
  color: string
  score: number
}
export type Profile = Record<string, string>
export interface ResumeAnalysis {
  skills: string[]
  strengths: string
  improvements: string
}
