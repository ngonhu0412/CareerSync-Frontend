import { useCareer } from '../context/CareerContext'
import { Icon } from '../components/Icon'
import { JobCard } from '../components/JobCard'
import { title } from '../components/formHelpers'
import { categories } from '../data/categories'
export function JobsPage() {
  const { query, setQuery, category, setCategory, region, setRegion, saved, onlySaved, setOnlySaved, filtered } = useCareer()
  return (<>{title('새로운 가능성을 탐색하세요.', '당신의 다음 챕터가 될 기회를 찾아보세요.')}<form className="search-box wide-search" onSubmit={e => e.preventDefault()}>
    <Icon name="search" />
    <input aria-label="검색" value={query} onChange={e => setQuery(e.target.value)} placeholder="직무, 기업, 기술 스택 검색" />
    <select aria-label="근무 지역" value={region} onChange={e => setRegion(e.target.value)}>{['전체 지역', '서울', '경기'].map(r => <option key={r}>{r}</option>)}</select>
  </form>
    <div className="category-tabs">{categories.map(c => <button className={category === c ? 'selected' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}<button className={onlySaved ? 'selected' : ''} onClick={() => setOnlySaved(!onlySaved)}>저장한 공고 {saved.length}</button>
    </div>
    <div className="results-heading">
      <b>{filtered.length}개의 기회</b>
      <button onClick={() => { setQuery(''); setCategory('전체'); setRegion('전체 지역'); setOnlySaved(false) }}>필터 초기화 ↻</button>
    </div>
    <div className="job-grid">{filtered.map(j => <JobCard key={j.id} job={j} />)}</div>{!filtered.length && <div className="empty-state">검색 결과가 없어요. 다른 키워드로 찾아보세요.</div>}</>)
}
