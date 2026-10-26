import { HeroArtwork } from '../components/HeroArtwork'
import { useCareer } from '../context/CareerContext'
import { Icon } from '../components/Icon'
import { JobCard } from '../components/JobCard'
import { categories } from '../data/categories'
export function HomePage() {
  const { query, setQuery, category, setCategory, go, filtered } = useCareer()
  return (<main>
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="pill">
            <span className="live-dot" />가능성을 연결하는 AI 커리어 플랫폼 <span>↗</span>
          </span>
          <h1>다음 커리어는,<br />
            <span className="blue-text">나답게.</span>
            <span className="heading-spark">✳</span>
          </h1>
          <p>당신의 가능성을 알아보는 곳.<br />AI와 함께, 나에게 꼭 맞는 다음 기회를 만나세요.</p>
          <form className="search-box" onSubmit={e => { e.preventDefault(); go('jobs') }}>
            <Icon name="search" />
            <input aria-label="채용공고 검색" placeholder="어떤 커리어를 찾고 있나요?" value={query} onChange={e => setQuery(e.target.value)} />
            <button className="btn" type="submit">기회 찾기 <Icon name="arrow" size={18} />
            </button>
          </form>
          <div className="popular">
            <span>지금 인기 있는</span>{['프론트엔드', '프로덕트 디자이너', 'AI 엔지니어'].map(t => <button key={t} onClick={() => { setQuery(t.split(' ')[0]); go('jobs') }}>{t} ↗</button>)}</div>
          <div className="hero-social">
            <div className="mini-avatars">
              <span>김</span>
              <span>박</span>
              <span>이</span>
              <span>정</span>
            </div>
            <p>
              <b>2,400+</b>명이 새로운 가능성을 찾고 있어요 <span>✦</span>
            </p>
          </div>
        </div>
        <HeroArtwork />
      </div>
    </section>
    <section className="partner-strip">
      <span>좋은 기회는, 좋은 기업에서</span>
      <div className="partner toss-text">toss</div>
      <div className="partner">당근<span className="carrot-dot">●</span>
      </div>
      <div className="partner naver-text">NAVER</div>
      <div className="partner kakao-text">kakao</div>
      <div className="partner musinsa-text">MUSINSA</div>
      <div className="partner bucket-text">오늘의집</div>
    </section>
    <section className="section jobs-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FIND YOUR NEXT</span>
          <h2>설레는 다음 기회, 여기 있어요<span className="blue-text">.</span>
          </h2>
          <p>성장하는 기업에서 당신의 가능성을 펼쳐보세요.</p>
        </div>
        <button className="text-link" onClick={() => { setQuery(''); go('jobs') }}>전체 채용공고 보기 <Icon name="arrow" size={18} />
        </button>
      </div>
      <div className="category-tabs">{categories.map((c, i) => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>
        <span>{['✳', '⌘', '◈', '◐', '↗', '▦'][i]}</span>{c}</button>)}</div>
      <div className="job-grid">{filtered.slice(0, 3).map(j => <JobCard key={j.id} job={j} />)}</div>
      <div className="demo-note">기업 및 채용 정보는 UI 시연을 위한 예시입니다.</div>
    </section>
    <section className="section" id="features">
      <div className="feature-banner">
        <div>
          <span className="eyebrow">LESS SEARCHING. MORE POSSIBILITIES.</span>
          <h2>이력서 한 장으로,<br />가능성은 더 넓게.</h2>
          <p>나의 강점을 발견하고, 다음 커리어까지 연결하세요.</p>
          <button className="btn" onClick={() => go('resume')}>내 이력서 분석하기 <Icon name="arrow" />
          </button>
        </div>
        <div className="feature-steps">{[['01', '나를 이해하는 이력서 분석', '경험 속에 숨겨진 강점과 보완점을 발견해요.'], ['02', '이유가 있는 AI 매칭', '어떤 역량이 연결되는지, 추천 이유까지 투명하게.'], ['03', '한눈에 보는 커리어 여정', '지원부터 면접까지, 다음 단계를 놓치지 마세요.']].map(([n, h, p]) => <div key={n}>
          <span>{n}</span>
          <div>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
          <Icon name="arrow" />
        </div>)}</div>
      </div>
    </section>
  </main>)
}
