import { isMockMode } from '../services/careerService'
import { useCareer } from '../context/CareerContext'
import { title, fields } from '../components/formHelpers'
export function PostJobPage() {
  const { busy, createJob } = useCareer()
  return (<>{title('우리 팀의 다음 동료를 만나세요.', '구체적인 채용 정보로 좋은 연결을 시작하세요.')}<form className="panel profile-form" onSubmit={e => { e.preventDefault(); void createJob(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>) }}>
    <div className="form-grid">{fields(['채용 직무명', '근무 지역', '고용 형태', '경력 요건', '모집 인원', '마감일'])}</div>
    <label>주요 업무<textarea name="description" required rows={5} placeholder="함께 하게 될 업무를 소개해주세요" />
    </label>
    <label>자격 요건 및 우대 사항<textarea name="requirements" required rows={5} placeholder="필수 역량과 우대 역량을 구분해주세요" />
    </label>
    <button className="btn" disabled={busy}>채용공고 등록 ↗</button>
    <p className="demo-note">{isMockMode ? '이 브라우저에 저장되는 데모 공고입니다.' : '등록한 공고는 연결된 서버에 저장됩니다.'}</p>
  </form>
  </>)
}
