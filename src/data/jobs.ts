import type { Job } from '../types'
// Dữ liệu mẫu chỉ được dùng bởi mock service.
export const demoJobs: Job[] = [
  { id: 1, company: '토스', logo: 'toss', title: '프론트엔드 개발자', category: '개발 · IT', location: '서울 · 강남구', tags: ['React', 'TypeScript', 'Next.js'], color: 'blue', score: 96 },
  { id: 2, company: '당근', logo: '🥕', title: '프로덕트 디자이너', category: '디자인', location: '서울 · 서초구', tags: ['Figma', 'UX/UI', 'Design System'], color: 'orange', score: 92 },
  { id: 3, company: '네이버', logo: 'N', title: 'AI / ML 엔지니어', category: '데이터 · AI', location: '경기 · 성남시', tags: ['Python', 'PyTorch', 'LLM'], color: 'green', score: 89 },
  { id: 4, company: '카카오', logo: 'kakao', title: '백엔드 개발자', category: '개발 · IT', location: '경기 · 성남시', tags: ['Java', 'Spring', 'AWS'], color: 'yellow', score: 87 },
  { id: 5, company: '무신사', logo: 'M', title: '브랜드 마케터', category: '마케팅', location: '서울 · 성동구', tags: ['브랜딩', '콘텐츠', '캠페인'], color: 'black', score: 84 },
  { id: 6, company: '오늘의집', logo: '집', title: '서비스 기획자', category: '기획 · 경영', location: '서울 · 서초구', tags: ['서비스 기획', '데이터 분석', 'SQL'], color: 'cyan', score: 82 },
]
