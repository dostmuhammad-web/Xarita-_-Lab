import { useRef, useState } from 'react'
import { quizQuestions } from '../data/quiz.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import SectionHeading from './SectionHeading.jsx'

const LETTERS = ['A', 'B', 'C', 'D']
const TOTAL = quizQuestions.length

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <path
        d="m3.2 8.4 3.1 3.1 6.5-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <path
        d="m4 4 8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function resultMessage(score) {
  const ratio = score / TOTAL
  if (ratio === 1) return 'Mukammal natija. Xarita tili sizga tanish.'
  if (ratio >= 0.75) return 'Kuchli natija. Bir-ikki detalni mustahkamlash kifoya.'
  if (ratio >= 0.5) return 'Asoslar o‘zlashtirilmoqda. Laboratoriyaga qaytib, mashqlarni takrorlang.'
  return 'Boshlanish yaxshi. Mashqlarni yana bir bor ko‘rib, testni qayta yeching.'
}

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])
  const [best, setBest] = useLocalStorage('xaritalab.quiz.best', 0)
  const nextButtonRef = useRef(null)

  const question = quizQuestions[index]
  const answered = selected !== null
  const isCorrect = answered && selected === question.answer
  const progress = ((index + (answered ? 1 : 0)) / TOTAL) * 100

  const chooseOption = (optionIndex) => {
    if (answered) return
    setSelected(optionIndex)
    const correct = optionIndex === question.answer
    if (correct) setScore((current) => current + 1)
    setAnswers((current) => [
      ...current,
      { id: question.id, choice: optionIndex, correct },
    ])
    window.setTimeout(() => nextButtonRef.current?.focus(), 0)
  }

  const goNext = () => {
    if (index + 1 < TOTAL) {
      setIndex((current) => current + 1)
      setSelected(null)
      return
    }
    setFinished(true)
    if (score > best) setBest(score)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setAnswers([])
    setFinished(false)
  }

  return (
    <section className="section quiz-section" id="quiz">
      <div className="shell">
        <SectionHeading
          index="02"
          title="Bilimni sinang"
          lead="Sakkizta savol — masshtabdan relyefgacha. Har bir javobdan keyin qisqa izoh beriladi."
        />

        <div className="quiz-card">
          {finished ? (
            <div className="quiz-results">
              <div className="result-top">
                <div
                  className="score-ring"
                  style={{ '--score': `${(score / TOTAL) * 360}deg` }}
                  aria-hidden="true"
                >
                  <div className="score-ring-inner">
                    <strong>{score}</strong>
                    <span>/ {TOTAL}</span>
                  </div>
                </div>

                <div className="result-copy">
                  <span className="result-label">Test yakunlandi</span>
                  <h3>{resultMessage(score)}</h3>
                  <p>
                    Eng yaxshi natijangiz:{' '}
                    <strong>
                      {Math.max(best, score)} / {TOTAL}
                    </strong>
                    . Natija brauzeringizda saqlanadi.
                  </p>
                </div>
              </div>

              <div className="result-actions">
                <button type="button" className="btn btn-primary" onClick={restart}>
                  Yana urinish
                </button>
                <a className="btn btn-ghost" href="#lab">
                  Laboratoriyaga qaytish
                </a>
              </div>

              <details className="result-review">
                <summary>Javoblarni ko‘rib chiqish</summary>
                <ol>
                  {quizQuestions.map((item, itemIndex) => {
                    const answer = answers.find((entry) => entry.id === item.id)
                    return (
                      <li key={item.id} className={answer?.correct ? 'is-correct' : 'is-wrong'}>
                        <div className="review-heading">
                          <span className="review-icon" aria-hidden="true">
                            {answer?.correct ? <CheckIcon /> : <CrossIcon />}
                          </span>
                          <p>
                            {itemIndex + 1}. {item.question}
                          </p>
                        </div>
                        <p className="review-answer">
                          To‘g‘ri javob: <strong>{item.options[item.answer]}</strong>
                          {answer && !answer.correct ? (
                            <>
                              {' '}
                              · Sizning javobingiz:{' '}
                              <em>{item.options[answer.choice]}</em>
                            </>
                          ) : null}
                        </p>
                        <p className="review-explanation">{item.explanation}</p>
                      </li>
                    )
                  })}
                </ol>
              </details>
            </div>
          ) : (
            <div className="quiz-body">
              <div className="quiz-meta">
                <div className="quiz-meta-left">
                  <span className="quiz-count">
                    Savol <strong>{index + 1}</strong> / {TOTAL}
                  </span>
                  <span className="quiz-best">
                    Eng yaxshi: {best} / {TOTAL}
                  </span>
                </div>
                <span className="quiz-score">
                  <strong>{score}</strong> to‘g‘ri
                </span>
              </div>

              <div className="quiz-progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>

              <h3 className="quiz-question">{question.question}</h3>

              <div className="quiz-options" role="group" aria-label="Javob variantlari">
                {question.options.map((option, optionIndex) => {
                  let className = 'quiz-option'
                  if (answered) {
                    if (optionIndex === question.answer) className += ' is-correct'
                    else if (optionIndex === selected) className += ' is-wrong'
                    else className += ' is-muted'
                  }
                  return (
                    <button
                      key={option}
                      type="button"
                      className={className}
                      onClick={() => chooseOption(optionIndex)}
                      disabled={answered}
                    >
                      <span className="quiz-letter">{LETTERS[optionIndex]}</span>
                      <span>{option}</span>
                      {answered && optionIndex === question.answer ? (
                        <span className="option-icon is-correct">
                          <CheckIcon />
                        </span>
                      ) : null}
                      {answered && optionIndex === selected && !isCorrect ? (
                        <span className="option-icon is-wrong">
                          <CrossIcon />
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              {answered ? (
                <div
                  className={`quiz-feedback${isCorrect ? ' is-correct' : ' is-wrong'}`}
                  role="status"
                  aria-live="polite"
                >
                  <div className="feedback-copy">
                    <strong>{isCorrect ? 'To‘g‘ri javob.' : 'Hozircha noto‘g‘ri.'}</strong>
                    <p>{question.explanation}</p>
                  </div>
                  <button
                    ref={nextButtonRef}
                    type="button"
                    className="btn btn-primary quiz-next"
                    onClick={goNext}
                  >
                    {index + 1 === TOTAL ? 'Natijani ko‘rish' : 'Keyingi savol'}
                  </button>
                </div>
              ) : (
                <p className="quiz-hint">Bitta variantni tanlang.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
