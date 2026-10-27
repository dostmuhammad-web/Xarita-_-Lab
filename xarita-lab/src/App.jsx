import { useCallback } from 'react'
import Footer from './components/Footer.jsx'
import Glossary from './components/Glossary.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Lab from './components/Lab.jsx'
import Quiz from './components/Quiz.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const TOTAL_EXERCISES = 4

export default function App() {
  const [learned, setLearned] = useLocalStorage('xaritalab.learned', {})

  const markLearned = useCallback(
    (id) => {
      setLearned((current) =>
        current[id] ? current : { ...current, [id]: true },
      )
    },
    [setLearned],
  )

  const learnedCount = Object.keys(learned).filter(
    (key) => learned[key] && key !== 'quiz',
  ).length

  return (
    <>
      <a className="skip-link" href="#main">
        Asosiy mazmunga o‘tish
      </a>
      <Header learnedCount={learnedCount} total={TOTAL_EXERCISES} />
      <main id="main">
        <Hero />
        <div className="term-strip" aria-hidden="true">
          <div className="shell term-strip-inner">
            <span>Masshtab</span>
            <span className="term-dot" />
            <span>Azimut</span>
            <span className="term-dot" />
            <span>Koordinata</span>
            <span className="term-dot" />
            <span>Relyef</span>
            <span className="term-dot" />
            <span>Legenda</span>
          </div>
        </div>
        <Lab learned={learned} onComplete={markLearned} />
        <Quiz />
        <Glossary />
        <section className="closing">
          <div className="shell closing-inner">
            <p className="closing-kicker">Keyingi qadam</p>
            <h2>Endi haqiqiy xaritani qo‘lingizga oling.</h2>
            <p>
              Laboratoriyada o‘rgangan to‘rt ko‘nikma — azimut, masshtab,
              koordinata va relyef — har qanday xaritani o‘qishning asosi.
            </p>
            <a className="btn btn-light" href="#lab">
              Mashqlarni takrorlash
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
