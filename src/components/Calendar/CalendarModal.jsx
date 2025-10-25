import styles from '../../css/Calendar.module.css';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

function getMonthDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return { first, last, days };
}

export default function CalendarModal() {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [marked, setMarked] = useState(() => ({})); // keyed by yyyy-mm-dd

  const { first, days } = useMemo(() => getMonthDays(view.year, view.month), [view]);

  const startOffset = first.getDay();

  function toggleDate(date) {
    const key = date.toISOString().slice(0,10);
    setMarked((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <motion.section className={styles.calendarContainer} initial={{opacity:0}} animate={{opacity:1}}>
      <header className={styles.header}>
        <div className={styles.titleWrap}><FaCalendarAlt className={styles.icon} /><h2>Calendar</h2></div>
        <div className={styles.controls}>
          <button onClick={() => setView((v)=> ({ year: v.month===0 ? v.year-1 : v.year, month: v.month===0 ? 11 : v.month-1 }))}>&lt;</button>
          <div className={styles.monthLabel}>{view.year} - {view.month + 1}</div>
          <button onClick={() => setView((v)=> ({ year: v.month===11 ? v.year+1 : v.year, month: v.month===11 ? 0 : v.month+1 }))}>&gt;</button>
        </div>
      </header>

      <div className={styles.grid}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d)=> (<div key={d} className={styles.weekday}>{d}</div>))}

        {Array.from({length: startOffset}).map((_,i)=>(<div key={'pad'+i} className={styles.pad} />))}

        {days.map((dt) => {
          const key = dt.toISOString().slice(0,10);
          const isMarked = Boolean(marked[key]);
          return (
            <div key={key} className={`${styles.day} ${isMarked?styles.marked:''}`} onClick={()=>toggleDate(dt)}>
              <div className={styles.dayNum}>{dt.getDate()}</div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
