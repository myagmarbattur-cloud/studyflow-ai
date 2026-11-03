"use client"

import { useEffect, useMemo, useState } from "react"
import { BookOpen, Check, ChevronLeft, ChevronRight, Circle, ClipboardCheck, LayoutDashboard, Lightbulb, Plus, Sparkles, Trash2, X } from "lucide-react"

type Task = { id: number; title: string; subject: string; completed: boolean }
type Question = { question: string; options: string[]; answer: number; explanation: string }

const questions: Question[] = [
  { question: "Монгол Улсын нийслэл аль хот вэ?", options: ["Дархан", "Улаанбаатар", "Эрдэнэт", "Ховд"], answer: 1, explanation: "Улаанбаатар нь Монгол Улсын нийслэл хот юм." },
  { question: "Усны химийн томьёо аль нь вэ?", options: ["CO₂", "O₂", "H₂O", "NaCl"], answer: 2, explanation: "Ус нь хоёр устөрөгч, нэг хүчилтөрөгчөөс бүрдэх H₂O томьёотой." },
  { question: "12 × 8 хэд вэ?", options: ["86", "96", "108", "112"], answer: 1, explanation: "12-ыг 8-аар үржүүлэхэд 96 гарна." }
]
const cards = [
  ["Фотосинтез", "Ургамал гэрлийн энергийг ашиглан хоол үүсгэх үйл явц."],
  ["Нэр үг", "Хүн, амьтан, юмс болон үзэгдлийн нэрийг заасан үг."],
  ["Гравитаци", "Масс бүхий биетүүдийг бие бие рүү нь татах хүч."],
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [active, setActive] = useState("Хянах самбар")
  const [newTask, setNewTask] = useState("")
  const [question, setQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [card, setCard] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("studyflow-tasks") || "[]"))
    setAttempts(Number(localStorage.getItem("studyflow-attempts") || 0))
  }, [])
  useEffect(() => { localStorage.setItem("studyflow-tasks", JSON.stringify(tasks)) }, [tasks])
  const completed = tasks.filter(t => t.completed).length
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0

  const addTask = () => { if (!newTask.trim()) return; setTasks([{ id: Date.now(), title: newTask.trim(), subject: "Ерөнхий", completed: false }, ...tasks]); setNewTask("") }
  const answer = (index: number) => { if (selected !== null) return; setSelected(index); const next = attempts + 1; setAttempts(next); localStorage.setItem("studyflow-attempts", String(next)) }
  const nextQuestion = () => { setQuestion((question + 1) % questions.length); setSelected(null) }
  const nav = [{ label: "Хянах самбар", icon: LayoutDashboard }, { label: "Даалгавар", icon: ClipboardCheck }, { label: "Квиз", icon: Lightbulb }, { label: "Флаш карт", icon: BookOpen }, { label: "AI багш", icon: Sparkles }]
  const current = questions[question]
  const greeting = useMemo(() => tasks.length ? "Өнөөдрийн зорилгоо үргэлжлүүлээрэй" : "Өнөөдрийн суралцах төлөвлөгөөг эхлүүлээрэй", [tasks.length])

  return <div className="shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">S</span><span>STUDYFLOW <b>AI</b></span></div><nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}><Icon size={18} />{label}{label === "AI багш" && <span className="demo">Демо</span>}</button>)}</nav><div className="profile"><div className="avatar">Б</div><div><strong>Бат-Эрдэнэ</strong><small>Суралцагч</small></div></div></aside>
    <main><header><div><p className="eyebrow">Мягмар, 11 сарын 3</p><h1>{active}</h1><p className="muted">{greeting}</p></div><button className="icon-button" aria-label="Мэдэгдэл"><Circle size={18} /></button></header>
      {active === "Хянах самбар" && <><section className="stats"><div className="stat"><span className="stat-icon blue"><Check size={18} /></span><div><small>Гүйцэтгэсэн</small><strong>{completed} / {tasks.length}</strong></div></div><div className="stat"><span className="stat-icon purple"><ClipboardCheck size={18} /></span><div><small>Ахиц</small><strong>{progress}%</strong></div></div><div className="stat"><span className="stat-icon yellow"><Lightbulb size={18} /></span><div><small>Квизийн оролдлого</small><strong>{attempts}</strong></div></div></section><section className="grid"><div className="card tasks-card"><div className="card-head"><div><h2>Өнөөдрийн даалгавар</h2><p className="muted">Жижиг алхам бүр ахиц</p></div><button className="text-button" onClick={() => setActive("Даалгавар")}>Бүгдийг харах <ChevronRight size={15} /></button></div><TaskList tasks={tasks} setTasks={setTasks} /><div className="add-row"><input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Шинэ даалгавар нэмэх..." /><button onClick={addTask}><Plus size={16} /> Нэмэх</button></div></div><div className="card progress-card"><h2>Суралцах ахиц</h2><div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}><div><strong>{progress}%</strong><small>Нийт ахиц</small></div></div><p className="muted center">Даалгавраа гүйцээж ахицаа нэмээрэй.</p></div></section></>}
      {active === "Даалгавар" && <section className="card page-card"><div className="card-head"><div><h2>Миний даалгавар</h2><p className="muted">Төлөвлөгөөгөө нэг дор удирдаарай</p></div></div><div className="add-row"><input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Шинэ даалгаврын нэр..." /><button onClick={addTask}><Plus size={16} /> Нэмэх</button></div><TaskList tasks={tasks} setTasks={setTasks} /></section>}
      {active === "Квиз" && <section className="card quiz-card"><div className="quiz-top"><span>Асуулт {question + 1} / {questions.length}</span><span>{selected !== null ? "Хариулсан" : "Бодож үзээрэй"}</span></div><div className="bar"><i style={{ width: `${(question + 1) / questions.length * 100}%` }} /></div><h2>{current.question}</h2><div className="options">{current.options.map((option, i) => <button key={option} onClick={() => answer(i)} className={selected !== null && i === current.answer ? "option correct" : selected === i ? "option wrong" : "option"}><span>{String.fromCharCode(65 + i)}</span>{option}{selected !== null && i === current.answer && <Check size={18} />}</button>)}</div>{selected !== null && <div className="explanation"><strong>{selected === current.answer ? "Зөв хариулт" : "Тайлбар"}</strong><p>{current.explanation}</p></div>}<button className="primary next" onClick={nextQuestion}>{selected === null ? "Алгасах" : "Дараагийн асуулт"}<ChevronRight size={16} /></button></section>}
      {active === "Флаш карт" && <section className="flash-wrap"><p className="muted center">Карт {card + 1} / {cards.length}</p><button className="flashcard" onClick={() => setFlipped(!flipped)}><span className="card-label">{flipped ? "Хариулт" : "Нэр томьёо"}</span><h2>{flipped ? cards[card][1] : cards[card][0]}</h2><small>Эргүүлэхийн тулд дарна уу</small></button><div className="flash-actions"><button onClick={() => { setCard((card + cards.length - 1) % cards.length); setFlipped(false) }}><ChevronLeft size={18} /> Өмнөх</button><button className="primary" onClick={() => { setCard((card + 1) % cards.length); setFlipped(false) }}>Дараагийн карт <ChevronRight size={18} /></button></div></section>}
      {active === "AI багш" && <section className="card tutor"><span className="demo-pill"><Sparkles size={15} /> ДЕМО</span><h2>Таны хувийн AI багш</h2><p>Энэ нь зөвхөн интерфэйсийн демо хувилбар. Бодит AI хариулт одоогоор холбогдоогүй.</p><div className="tutor-message">Сайн байна уу! Өнөөдөр ямар сэдвээр суралцах вэ?</div><div className="add-row"><input placeholder="Асуултаа энд бичнэ үү..." disabled /><button disabled>Илгээх</button></div></section>}
    </main></div>
}

function TaskList({ tasks, setTasks }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) { return <div className="task-list">{tasks.length === 0 ? <div className="empty">Одоогоор даалгавар алга.</div> : tasks.map(task => <div className={task.completed ? "task completed" : "task"} key={task.id}><button className="check" onClick={() => setTasks(items => items.map(item => item.id === task.id ? { ...item, completed: !item.completed } : item))} aria-label="Гүйцэтгэсэн"><Check size={14} /></button><div><strong>{task.title}</strong><small>{task.subject}</small></div><button className="delete" onClick={() => setTasks(items => items.filter(item => item.id !== task.id))} aria-label="Устгах"><Trash2 size={16} /></button></div>)}</div>}
