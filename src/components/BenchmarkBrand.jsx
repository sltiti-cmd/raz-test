import { Link } from 'react-router-dom'

export default function BenchmarkBrand() {
  return (
    <Link to="/" className="bm-brand" aria-label="Stacey老师测评网站首页">
      <span className="bm-brand-mark" aria-hidden="true" />
      <strong>Stacey老师</strong><span className="bm-brand-caption">测评网站</span>
    </Link>
  )
}
