import { useCareer } from '../context/CareerContext'
import { title } from '../components/formHelpers'
export function ApplicationsPage() {
  const { setSelected, applied, go, jobs } = useCareer()
  return (<>{title('한 걸음씩, 다음 커리어로.', '지원한 공고와 진행 상태를 한눈에 확인하세요.')}<div className="stats">
    <div className="panel stat">
      <span>전체 지원</span>
      <b>{applied.length}</b>
    </div>
    <div className="panel stat">
      <span>서류 검토</span>
      <b>{applied.length}</b>
    </div>
    <div className="panel stat">
      <span>면접 예정</span>
      <b>0</b>
    </div>
  </div>
    <div className="panel">
      <h2>나의 지원 내역</h2>{jobs.filter(j => applied.includes(j.id)).map(j => <button className="list-row" key={j.id} onClick={() => { setSelected(j); go('detail') }}>
        <span className={`company-logo ${j.color}`}>{j.logo}</span>
        <b>{j.company} · {j.title}</b>
        <span className="status">서류 검토 중</span>
        <span>↗</span>
      </button>)}{!applied.length && <div className="empty-state">
        <p>아직 지원한 공고가 없어요.<br />마음에 드는 기회에 첫 발을 내디뎌보세요.</p>
        <button className="btn" onClick={() => go('jobs')}>채용공고 둘러보기 →</button>
      </div>}</div>
  </>)
}
