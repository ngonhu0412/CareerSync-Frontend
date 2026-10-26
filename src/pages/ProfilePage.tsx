import { profileFields } from '../data/formFields'
import { useCareer } from '../context/CareerContext'
import { Icon } from '../components/Icon'
import { title } from '../components/formHelpers'
export function ProfilePage() {
  const { busy, profile, saveProfile } = useCareer()
  return (<>{title('나를 더 잘 알릴 수 있도록.', '기본 정보와 희망 조건을 관리하세요.')}<form key={JSON.stringify(profile)} className="panel profile-form" onSubmit={e => { e.preventDefault(); void saveProfile(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>) }}>
    <h2>기본 정보</h2>
    <div className="form-grid">{profileFields.map(({ name, label: l }) => <label key={l}>{l}<input name={name} type={l === '이메일' ? 'email' : 'text'} required defaultValue={profile[name] || ''} placeholder={`${l} 입력`} />
    </label>)}</div>
    <label>보유 기술 스택<input name="skills" defaultValue={profile.skills || 'React, TypeScript, JavaScript'} />
    </label>
    <button className="btn" disabled={busy}>변경 사항 저장 <Icon name="check" />
    </button>
  </form>
  </>)
}
