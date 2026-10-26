// name là khóa JSON gửi backend; label chỉ dùng để hiển thị.
export const profileFields = [
  { name: 'name', label: '이름' },
  { name: 'email', label: '이메일' },
  { name: 'desiredJob', label: '희망 직무' },
  { name: 'region', label: '희망 근무 지역' },
  { name: 'experience', label: '경력 수준' },
  { name: 'employmentType', label: '희망 근무 형태' },
]
export const fieldNames: Record<string, string> = {
  이름: 'name',
  '채용 직무명': 'title',
  '근무 지역': 'location',
  '고용 형태': 'employmentType',
  '경력 요건': 'experience',
  '모집 인원': 'headcount',
  마감일: 'deadline',
}
