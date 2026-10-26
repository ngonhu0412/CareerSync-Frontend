import { fieldNames } from '../data/formFields'
export const title = (label: string, description: string) => <div className="page-title">
  <span className="eyebrow">YOUR NEXT CHAPTER</span>
  <h1>{label}</h1>
  <p>{description}</p>
</div>
export const fields = (labels: string[]) => labels.map(label => <label key={label}>{label}<input name={fieldNames[label] || label} required type={label.includes('이메일') ? 'email' : label.includes('비밀번호') ? 'password' : 'text'} placeholder={`${label} 입력`} minLength={label.includes('비밀번호') ? 8 : undefined} />
</label>)
