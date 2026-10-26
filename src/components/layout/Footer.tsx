import { useCareer } from '../../context/CareerContext'
export function Footer() {
  const { setRole, go } = useCareer()
  return (<footer>
    <button className="brand" onClick={() => go('home')}>
      <span className="brand-mark">✳</span>CareerSync.</button>
    <p>가능성을 연결하고, 내일을 바꾸다.</p>
    <span>© 2026 CareerSync · Team project</span>
    <button onClick={() => { setRole('기업'); go('company') }}>기업 서비스 ↗</button>
  </footer>)
}
