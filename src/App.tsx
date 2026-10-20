
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <a href="/" className="logo">✦ CareerSync</a>

        <nav className="nav">
          <a href="#jobs">채용공고</a>
          <a href="#features">서비스 소개</a>
          <a href="#login">로그인</a>
          <a href="#signup" className="signup-btn">회원가입</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">AI 기반 맞춤 채용 플랫폼</span>
            <h1>
              나에게 맞는 커리어,<br />
              <span>CareerSync에서 시작하세요.</span>
            </h1>
            <p>
              AI가 이력서와 채용공고를 분석하여
              나에게 적합한 채용 기회를 찾아드립니다.
            </p>

            <div className="search-box">
              <input
                type="text"
                placeholder="직무명, 기업명, 기술 스택을 검색하세요"
              />
              <button type="button">채용공고 검색</button>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <h2>CareerSync 주요 서비스</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>채용공고 탐색</h3>
              <p>다양한 채용공고를 검색하고 비교하세요.</p>
            </article>
            <article className="feature-card">
              <h3>AI 이력서 분석</h3>
              <p>이력서의 주요 역량을 분석하고 확인하세요.</p>
            </article>
            <article className="feature-card">
              <h3>AI 맞춤 매칭</h3>
              <p>나에게 적합한 채용공고를 추천받으세요.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
