import { useCareer } from '../../context/CareerContext'
import { Icon } from '../Icon'
import type { Page } from '../../types'
export function Sidebar() {
  const { page, role, setRole, go } = useCareer()
  return (<>{['dashboard', 'resume', 'matches', 'profile', 'applications', 'company', 'post', 'candidates'].includes(page) && <aside className="sidebar">
    <span className="eyebrow">MY WORKSPACE</span>{(role === '기업' ? [['company', '대시보드'], ['post', '채용공고 등록'], ['candidates', '지원자 관리']] : [['dashboard', '대시보드'], ['resume', 'AI 이력서 분석'], ['matches', 'AI 매칭 결과'], ['applications', '지원 현황'], ['profile', '프로필 관리']]).map(([p, l]) => <button key={p} className={page === p ? 'selected' : ''} onClick={() => go(p as Page)}>
      <Icon name={p === 'dashboard' ? 'grid' : 'spark'} />{l}</button>)}<div className="sidebar-tip">✦<b>당신의 다음이 기대돼요.</b>
      <p>작은 시작이 큰 변화를 만듭니다.</p>
    </div>
    <button onClick={() => { setRole(role === '기업' ? '구직자' : '기업'); go(role === '기업' ? 'dashboard' : 'company') }}>↔ {role === '기업' ? '구직자' : '기업'} 데모 보기</button>
  </aside>}</>)
}
