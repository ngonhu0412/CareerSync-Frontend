import { isMockMode } from '../services/careerService'
import { useCareer } from '../context/CareerContext'
import { Icon } from '../components/Icon'
import { title } from '../components/formHelpers'
export function ResumePage() {
  const { analysis, file, setFile, analyzed, setAnalyzed, go, notify, analyzeResume } = useCareer()
  return (<>{title('경험을 넘어, 가능성을 발견해요.', '이력서를 올리고 나의 강점과 다음 단계를 확인하세요.')}<div className="two-columns">
    <div className="panel">
      <h2>이력서 업로드</h2>
      <label className="upload-zone" onDragOver={e => e.preventDefault()} onDrop={e => {
        e.preventDefault()
        const f = e.dataTransfer.files[0]
        if (f?.type === 'application/pdf' && f.size <= 10 * 1024 * 1024) {
          setFile(f)
          setAnalyzed(false)
        }
        else
          notify('PDF 파일을 선택해주세요.')
      }}>
        <Icon name="upload" size={34} />
        <b>{file ? file.name : '이력서를 여기에 놓아주세요'}</b>
        <span>또는 클릭하여 파일 선택 · PDF, 최대 10MB</span>
        <input type="file" accept="application/pdf" onChange={e => {
          const f = e.target.files?.[0]
          if (f && f.size <= 10 * 1024 * 1024 && f.type === 'application/pdf') {
            setFile(f)
            setAnalyzed(false)
          }
          else
            notify('10MB 이하 PDF를 선택해주세요.')
        }} />
      </label>
      <p className="muted small-copy">{isMockMode ? '파일은 서버로 전송되지 않으며, 분석 결과는 예시 데이터입니다.' : '분석 시작 시 선택한 파일을 연결된 서버로 전송합니다.'}</p>
      <button className="btn full" disabled={!file} onClick={() => void analyzeResume()}>{isMockMode ? '✦ 데모 분석 결과 보기' : '✦ 이력서 분석 시작'}</button>
    </div>
    <div className="panel">
      <span className="eyebrow">YOUR CAREER INSIGHTS</span>
      <h2>{analyzed ? '가능성이 더 선명해졌어요.' : '당신의 강점, 곧 만나보세요.'}</h2>{analyzed ? <>
        <div className="info-box">
          <b>핵심 역량</b>
          <div className="tags">{analysis?.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
        </div>
        <h3>✦ 잘하고 있어요</h3>
        <p>{analysis?.strengths}</p>
        <h3>↗ 이렇게 더해보세요</h3>
        <p>{analysis?.improvements}</p>
        <button className="btn secondary" onClick={() => go('matches')}>맞춤 채용공고 확인 →</button>
      </> : <div className="empty-state">
        <span>✳</span>
        <p>경험 · 핵심 기술 · 개선 방향<br />AI 분석 화면을 체험해보세요.</p>
      </div>}</div>
  </div>
  </>)
}
