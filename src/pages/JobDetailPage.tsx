import { useCareer } from '../context/CareerContext'
export function JobDetailPage() {
  const { busy, selected, saved, applied, go, save, apply } = useCareer()
  return (<>
    <button className="text-link" onClick={() => go('jobs')}>← 채용공고로 돌아가기</button>
    <div className="detail-layout">
      <article className="panel">
        <span className={`company-logo ${selected.color}`}>{selected.logo}</span>
        <p>{selected.company} <span className="verified">✓</span>
        </p>
        <h1>{selected.title}</h1>
        <p className="muted">{selected.location} · 정규직 · 경력 1–5년</p>
        <div className="tags">{selected.tags.map(t => <span key={t}>{t}</span>)}</div>{[['함께 만들어요', '더 나은 일상을 만드는 서비스를 함께 만들어갈 동료를 찾습니다. 사용자 중심의 문제 해결과 팀의 성장을 중요하게 생각합니다.'], ['주요 업무', '서비스의 핵심 기능 기획 및 구현\n사용자 경험 개선과 품질 향상\n다양한 직군의 동료와 긴밀한 협업'], ['자격 요건', `${selected.tags.join(', ')} 관련 경험\n문제를 정의하고 해결하는 능력\n열린 커뮤니케이션과 협업 역량`], ['혜택 및 복지', '유연 근무제 · 자기계발비 지원 · 건강검진 · 최신 업무 장비']].map(([h, p]) => <section className="detail-section" key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </section>)}</article>
      <aside className="panel apply-panel">
        <span className="eyebrow">YOUR NEXT OPPORTUNITY</span>
        <h2>새로운 시작을 함께해요.</h2>
        <p>이력서와 함께 당신의 가능성을 전하세요.</p>
        <button className="btn" onClick={apply} disabled={busy || applied.includes(selected.id)}>{applied.includes(selected.id) ? '지원 완료 ✓' : '지원하기 ↗'}</button>
        <button className="btn secondary" onClick={() => save(selected.id)}>{saved.includes(selected.id) ? '저장됨 ✓' : '공고 저장하기'}</button>
        <div className="info-box">✦ AI 매칭 적합도 <b>{selected.score}%</b>
          <p>예시 프로필을 기준으로 한 데모 점수입니다.</p>
        </div>
      </aside>
    </div>
  </>)
}
