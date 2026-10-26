import { isMockMode } from '../services/careerService'
import { useCareer } from '../context/CareerContext'
import { Icon } from '../components/Icon'
import { fields } from '../components/formHelpers'
export function AuthPage() {
  const { busy, page, role, setRole, go, notify, authenticate } = useCareer()
  return (<div className="auth-layout">
    <div className="auth-intro">
      <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
      <h1>가능성의 시작,<br />
        <span className="blue-text">함께 연결해요.</span>
      </h1>
      <div className="auth-art">✳</div>
      <p>나를 알아보는 기회, CareerSync.</p>
    </div>
    <div className="panel auth-panel">{page === 'signup' ? <>
      <span className="eyebrow">LET’S GET STARTED</span>
      <h2>어떤 여정을 시작할까요?</h2>
      <p className="muted">이용 목적에 맞는 계정을 선택해주세요.</p>{['구직자', '기업'].map(r => <button key={r} className="role-card" onClick={() => { setRole(r); go('register') }}>
        <span>{r === '기업' ? '▦' : '✦'}</span>
        <div>
          <h3>{r}로 시작하기</h3>
          <p>{r === '기업' ? '우리 팀의 다음 동료를 만나세요.' : '나에게 맞는 다음 기회를 발견하세요.'}</p>
        </div>↗</button>)}<button className="text-link" onClick={() => go('login')}>이미 계정이 있나요? 로그인 →</button>
    </> : <form onSubmit={e => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      if (page === 'register' && data.get('password') !== data.get('confirm')) {
        notify('비밀번호가 일치하지 않습니다.')
        return
      }
      void authenticate(Object.fromEntries(data) as Record<string, string>, page === 'register')
    }}>
      <span className="eyebrow">WELCOME TO CAREERSYNC</span>
      <h2>{page === 'login' ? '다시 만나 반가워요.' : `${role} 회원가입`}</h2>
      <p className="muted">당신의 다음 챕터를 시작하세요.</p>{page === 'register' && fields(['이름'])}<label>이메일<input name="email" type="email" required placeholder="hello@example.com" />
      </label>
      <label>비밀번호<input name="password" type="password" minLength={8} required placeholder="8자 이상 입력해주세요" />
      </label>{page === 'register' && <>
        <label>비밀번호 확인<input name="confirm" type="password" required placeholder="비밀번호를 다시 입력해주세요" />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" required />서비스 이용약관 및 개인정보 처리방침에 동의합니다.</label>
      </>}<button className="btn full" disabled={busy}>{page === 'login' ? '로그인' : '가입하기'} <Icon name="arrow" />
      </button>
      <p className="demo-note">{isMockMode ? '실제 계정 생성 없이 체험하는 프론트엔드 데모입니다.' : '계정 정보는 연결된 서버에서 처리됩니다.'}</p>
      <button type="button" className="text-link" onClick={() => go(page === 'login' ? 'signup' : 'login')}>{page === 'login' ? '처음이신가요? 회원가입 →' : '이미 계정이 있나요? 로그인 →'}</button>
    </form>}</div>
  </div>)
}
