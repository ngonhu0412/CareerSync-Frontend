import { useCareer } from '../context/CareerContext'
import { title } from '../components/formHelpers'
export function MatchesPage() {
  const { setSelected, go, jobs } = useCareer()
  return (<>{title('당신과 연결되는 기회.', '추천 이유와 성장 방향까지, 함께 확인해보세요.')}<div className="info-box">✦ 예시 프로필을 사용한 매칭 데모입니다. 점수는 합격 확률을 의미하지 않습니다.</div>
    <div className="job-grid matching-grid">{jobs.slice(0, 3).map(j => <div className="panel" key={j.id}>
      <span className={`company-logo ${j.color}`}>{j.logo}</span>
      <p>{j.company}</p>
      <h2>{j.title}</h2>
      <div className="match-score">
        <b>{j.score}<small>%</small>
        </b>
        <span>AI 커리어 적합도</span>
        <div className="progress">
          <span style={{ width: `${j.score}%` }} />
        </div>
      </div>
      <h3>✓ 연결되는 강점</h3>
      <p>{j.tags[0]} 경험과 프로젝트 역량</p>
      <h3>↗ 더 성장할 수 있는 부분</h3>
      <p>실무 프로젝트 성과 및 협업 경험 구체화</p>
      <button className="btn full" onClick={() => { setSelected(j); go('detail') }}>기회 자세히 보기 →</button>
    </div>)}</div>
  </>)
}
