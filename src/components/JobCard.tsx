import type { Job } from '../types'
import { Icon } from './Icon'
import { useCareer } from '../context/CareerContext'
export function JobCard({ job: j }: {
  job: Job
}) {
  const { busy, saved, save, setSelected, go } = useCareer()
  return <article className="job-card">
    <div className="job-top">
      <span className={`company-logo ${j.color}`}>{j.logo}</span>
      <button className={`icon-button ${saved.includes(j.id) ? 'is-saved' : ''}`} disabled={busy} onClick={() => save(j.id)} aria-label={`${j.company} 공고 저장`}>
        <Icon name="bookmark" />
      </button>
    </div>
    <div className="company-name">{j.company} <span className="verified">✓</span>
      <span className="hiring">적극 채용 중</span>
    </div>
    <button className="job-title" onClick={() => { setSelected(j); go('detail') }}>{j.title}<span>↗</span>
    </button>
    <p className="job-meta">{j.location} <i /> 경력 1–5년 <i /> 정규직</p>
    <div className="tags">{j.tags.map(t => <span key={t}>{t}</span>)}</div>
    <div className="job-bottom">
      <span>새로운 커리어의 시작</span>
      <b>D-{j.id * 3 + 4}</b>
    </div>
  </article>
}
