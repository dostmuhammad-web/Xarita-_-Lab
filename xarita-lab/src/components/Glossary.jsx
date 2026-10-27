import { glossary } from '../data/glossary.js'
import SectionHeading from './SectionHeading.jsx'

export default function Glossary() {
  return (
    <section className="section glossary-section" id="lugat">
      <div className="shell">
        <SectionHeading
          index="03"
          title="Atlas lug‘ati"
          lead="Xarita bilan ishlashda eng ko‘p uchraydigan sakkiz atama — qisqa va aniq izohlar bilan."
        />

        <div className="glossary-grid">
          {glossary.map((item, index) => (
            <article className="glossary-card" key={item.term}>
              <div className="glossary-top">
                <span className="glossary-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="glossary-symbol" aria-hidden="true">
                  {item.symbol}
                </span>
              </div>
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
