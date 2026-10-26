import { useCareer } from '../context/CareerContext'
import { JobCard } from '../components/JobCard'
import { title } from '../components/formHelpers'
import type { Page } from '../types'
export function DashboardPage() {
  const { page, saved, applied, file, setCandidate, invited, go, jobs } = useCareer()
  return (<>{title(page === 'company' ? '좋은 팀의 시작, 여기서.' : '안녕하세요, 김지원님 👋', page === 'company' ? '우리 팀에 꼭 맞는 동료를 만나보세요.' : '오늘도 당신의 가능성에 한 걸음 더 가까이.')}<div className="stats">{(page === 'company' ? [['진행 중인 공고', '4'], ['신규 지원자', '18'], ['검토 대기', '7'], ['면접 예정', String(invited.length)]] : [['이력서 상태', file ? '등록 완료' : '미등록'], ['추천 채용공고', '6'], ['지원 현황', String(applied.length)], ['저장한 공고', String(saved.length)]]).map(([l, v], i) => <button className="stat panel" key={l} onClick={() => go(page === 'company' ? i === 0 ? 'post' : 'candidates' : (['resume', 'matches', 'applications', 'jobs'] as Page[])[i])}>
    <span>{l} ↗</span>
    <b>{v}</b>
    <small>{i === 1 ? '새로운 가능성이 기다려요' : '자세히 확인하기'}</small>
  </button>)}</div>
    <div className="dashboard-banner">
      <span>✳</span>
      <div>
        <h2>{page === 'company' ? '함께 성장할 동료를 찾고 있나요?' : '당신의 경험 속에 숨은 강점을 발견하세요.'}</h2>
        <p>AI와 함께 더 선명한 다음 단계를 그려보세요.</p>
      </div>
      <button className="btn" onClick={() => go(page === 'company' ? 'post' : 'resume')}>{page === 'company' ? '공고 등록하기' : '이력서 분석하기'} ↗</button>
    </div>
    <div className="section-heading">
      <h2>{page === 'company' ? '최근 지원자' : '당신을 위한 추천 기회'}</h2>
      <button className="text-link" onClick={() => go(page === 'company' ? 'candidates' : 'matches')}>전체 보기 →</button>
    </div>{page === 'company' ? <div className="panel">{['김지원', '박민서', '이서준'].map((n, i) => <button className="list-row" key={n} onClick={() => { setCandidate(i); go('candidates') }}>
      <span className="avatar">{n[0]}</span>
      <b>{n}</b>
      <span>프론트엔드 개발자</span>
      <b className="blue-text">{96 - i * 5}% 매칭</b>
      <span className="status">서류 검토</span>
    </button>)}</div> : <div className="job-grid">{jobs.slice(0, 3).map(j => <JobCard key={j.id} job={j} />)}</div>}</>)
}
