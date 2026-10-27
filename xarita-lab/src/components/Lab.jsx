import { useState } from 'react'
import CompassDemo from './demos/CompassDemo.jsx'
import ContourDemo from './demos/ContourDemo.jsx'
import CoordinateDemo from './demos/CoordinateDemo.jsx'
import ScaleDemo from './demos/ScaleDemo.jsx'
import SectionHeading from './SectionHeading.jsx'

const EXERCISES = [
  {
    id: 'compass',
    number: '01',
    label: 'Azimut',
    kicker: 'Yo‘nalish',
    title: 'Shimol — boshlang‘ich nuqta',
    text: 'Azimut — shimol yo‘nalishidan soat strelkasi bo‘yicha o‘lchanadigan burchak. U xaritada yo‘nalishni aniq aytishning eng qisqa yo‘li.',
    points: [
      '0° — shimol, 90° — sharq, 180° — janub, 270° — g‘arb.',
      '45° shimoli-sharqni, 315° shimoli-g‘arbni bildiradi.',
      'Doira bo‘ylab tortib, azimut qanday o‘zgarishini kuzating.',
    ],
    Demo: CompassDemo,
  },
  {
    id: 'scale',
    number: '02',
    label: 'Masshtab',
    kicker: 'Nisbat',
    title: 'Xarita qanchalik kichraytirilgan?',
    text: 'Masshtab xaritadagi har bir santimetr yerdagi qancha masofaga tengligini aytadi. U kasr yoki chiziqli ko‘rinishda yoziladi.',
    points: [
      '1:50 000 — xaritadagi 1 sm yerdagi 500 m ga teng.',
      'Masshtab soni kichik bo‘lsa (1:25 000), xarita batafsilroq bo‘ladi.',
      'Masofani hisoblash: xarita uzunligi × masshtab.',
    ],
    Demo: ScaleDemo,
  },
  {
    id: 'coordinate',
    number: '03',
    label: 'Koordinatalar',
    kicker: 'Manzil',
    title: 'Kenglik va uzoqlik bilan toping',
    text: 'Har bir nuqtaning manzili ikki burchak bilan yoziladi: kenglik (ekvatordan) va uzoqlik (bosh meridiandan). Ular birgalikda dunyodagi yagona nuqtani beradi.',
    points: [
      'Kenglik: 0° dan 90° gacha shimol yoki janubga.',
      'Uzoqlik: 0° dan 180° gacha sharq yoki g‘arbga.',
      'Avval kenglikni, keyin uzoqlikni xaritaga qo‘ying.',
    ],
    Demo: CoordinateDemo,
  },
  {
    id: 'contour',
    number: '04',
    label: 'Relyef',
    kicker: 'Balandlik',
    title: 'Gorizontallar tepalikni ochadi',
    text: 'Gorizontallar bir xil balandlikdagi nuqtalarni tutashtiradi. Ularning shakli va orasidagi masofa relyefning tikligini aytib beradi.',
    points: [
      'Yopiq halqalar tepalik yoki chuqurlikni bildiradi.',
      'Chiziqlar yaqin bo‘lsa — yonbag‘ir tik.',
      'Chiziqlar keng bo‘lsa — yonbag‘ir yumshoq.',
    ],
    Demo: ContourDemo,
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
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

export default function Lab({ learned, onComplete }) {
  const [activeId, setActiveId] = useState('compass')
  const active = EXERCISES.find((exercise) => exercise.id === activeId)
  const ActiveDemo = active.Demo
  const doneCount = EXERCISES.filter((exercise) => learned[exercise.id]).length
  const activeDone = Boolean(learned[activeId])

  const moveFocus = (index) => {
    const next = EXERCISES[(index + EXERCISES.length) % EXERCISES.length]
    setActiveId(next.id)
    window.requestAnimationFrame(() => {
      document.getElementById(`tab-${next.id}`)?.focus()
    })
  }

  const handleTabKeyDown = (event, index) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      moveFocus(index + 1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(index - 1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      moveFocus(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      moveFocus(EXERCISES.length - 1)
    }
  }

  return (
    <section className="section lab-section" id="lab">
      <div className="shell">
        <SectionHeading
          index="01"
          title="Xarita laboratoriyasi"
          lead="To‘rtta qisqa mashq — har biri xaritaning alohida tilini ochadi. Harakat qiling, natijani darhol ko‘ring."
        />

        <div className="lab-progress">
          <div className="lab-progress-bar" aria-hidden="true">
            <span style={{ width: `${(doneCount / EXERCISES.length) * 100}%` }} />
          </div>
          <span className="lab-progress-text" aria-live="polite">
            {doneCount} / {EXERCISES.length} mashq o‘zlashtirildi
          </span>
        </div>

        <div className="lab-tabs" role="tablist" aria-label="Interaktiv mashqlar">
          {EXERCISES.map((exercise, index) => {
            const selected = exercise.id === activeId
            return (
              <button
                key={exercise.id}
                type="button"
                role="tab"
                id={`tab-${exercise.id}`}
                aria-selected={selected}
                aria-controls={`panel-${exercise.id}`}
                tabIndex={selected ? 0 : -1}
                className={`lab-tab${selected ? ' is-active' : ''}`}
                onClick={() => setActiveId(exercise.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="lab-tab-number">{exercise.number}</span>
                <span className="lab-tab-label">{exercise.label}</span>
                {learned[exercise.id] ? (
                  <span className="lab-tab-check" aria-label="o‘zlashtirildi">
                    <CheckIcon />
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>

        <div
          className="lab-card"
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
        >
          <div className="lab-stage">
            <ActiveDemo onComplete={onComplete} />
          </div>

          <aside className="lab-note">
            <span className="lab-note-kicker">{active.kicker}</span>
            <h3>{active.title}</h3>
            <p className="lab-note-text">{active.text}</p>
            <ul className="lab-note-list">
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={`lab-status${activeDone ? ' is-done' : ''}`}>
              {activeDone ? (
                <>
                  <CheckIcon />
                  O‘zlashtirildi
                </>
              ) : (
                <>
                  <span className="lab-status-dot" aria-hidden="true" />
                  Mashqni bajaring
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
