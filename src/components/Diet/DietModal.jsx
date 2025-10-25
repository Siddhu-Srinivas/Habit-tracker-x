import styles from '../../css/Diet.module.css';

import { useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaAppleAlt, FaLeaf } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function estimateCalories(weightKg = 70, goal = 'maintain') {
  // Very simple estimation: maintenance = weightKg * 24 * 1.1
  const maintenance = Math.round(weightKg * 24 * 1.1);
  if (goal === 'lose') return Math.max(1200, maintenance - 400);
  if (goal === 'gain') return maintenance + 400;
  return maintenance;
}

function generate30DayPlan(calories, habitKey) {
  const days = [];
  const templates = {
    'gym': {
      breakfast: 'Eggs & oats',
      lunch: 'Grilled chicken, rice & veggies',
      dinner: 'Salmon, sweet potato & greens',
      snack: 'Greek yogurt + nuts'
    },
    'running': {
      breakfast: 'Banana oatmeal',
      lunch: 'Turkey sandwich + salad',
      dinner: 'Pasta with veggies',
      snack: 'Energy bar'
    },
    'reading': {
      breakfast: 'Yogurt & granola',
      lunch: 'Quinoa salad',
      dinner: 'Stir-fry tofu & veg',
      snack: 'Fruit'
    },
    'meditation': {
      breakfast: 'Smoothie bowl',
      lunch: 'Lentil soup',
      dinner: 'Vegetable curry',
      snack: 'Herbal tea & almonds'
    },
    'default': {
      breakfast: 'Oats with fruit',
      lunch: 'Grilled chicken salad',
      dinner: 'Steamed veggies + fish',
      snack: 'Nuts or yogurt'
    }
  };

  const tpl = templates[habitKey] || templates['default'];

  for (let i = 1; i <= 30; i++) {
    // Distribute calories: breakfast 30%, lunch 40%, dinner 25%, snack 5%
    const breakfast = Math.round(calories * 0.3);
    const lunch = Math.round(calories * 0.4);
    const dinner = Math.round(calories * 0.25);
    const snack = Math.round(calories * 0.05);

    days.push({
      day: i,
      meals: {
        breakfast: { name: tpl.breakfast, cal: breakfast },
        lunch: { name: tpl.lunch, cal: lunch },
        dinner: { name: tpl.dinner, cal: dinner },
        snack: { name: tpl.snack, cal: snack }
      }
    });
  }
  return days;
}

export default function DietModal() {
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState('maintain');
  const [habit, setHabit] = useState('default');
  const planRef = useRef(null);

  const calories = useMemo(() => estimateCalories(Number(weight), goal), [weight, goal]);
  const plan = useMemo(() => generate30DayPlan(calories, habit), [calories, habit]);
  const totalCalories30 = useMemo(() => plan.reduce((s,d)=> s + d.meals.breakfast.cal + d.meals.lunch.cal + d.meals.dinner.cal + d.meals.snack.cal, 0), [plan]);
  const avgPerDay = Math.round(totalCalories30 / plan.length);
  const weeklyTotals = useMemo(() => {
    const weeks = [];
    for (let i=0;i<30;i+=7){
      const slice = plan.slice(i,i+7);
      const weekSum = slice.reduce((s,d)=> s + d.meals.breakfast.cal + d.meals.lunch.cal + d.meals.dinner.cal + d.meals.snack.cal,0);
      weeks.push(weekSum);
    }
    return weeks;
  },[plan]);

  const handleExportPDF = async () => {
    if (!planRef.current) return;
    const canvas = await html2canvas(planRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`diet-plan-${habit}.pdf`);
  };

  return (
    <motion.section
      className={styles.dietContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className={styles.header}>
        <div className={styles.titleWrap}>
          <FaAppleAlt className={styles.icon} />
          <h2>30-Day Diet Plan</h2>
        </div>
        <p className={styles.subtitle}>Personalized daily meal plan based on weight and goal.</p>
      </header>

      <div className={styles.controls}>
        <label>
          Weight (kg)
          <input type="number" min="30" max="300" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>

        <label>
          Goal
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="maintain">Maintain</option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
          </select>
        </label>

        <div className={styles.calorieBox}>
          <FaLeaf />
          <div>
            <div className={styles.calLabel}>Estimated calories</div>
            <div className={styles.calValue}>{calories} kcal/day</div>
          </div>
        </div>
        <label>
          Related Habit
          <select value={habit} onChange={(e) => setHabit(e.target.value)}>
            <option value="default">General</option>
            <option value="gym">Gym Workout</option>
            <option value="running">Running</option>
            <option value="reading">Reading / Low activity</option>
            <option value="meditation">Meditation / Calm</option>
          </select>
        </label>
        <button className={styles.exportBtn} onClick={handleExportPDF}>Export to PDF</button>
      </div>

      <div className={styles.statsPanel}>
        <div className={styles.statBox}>
          <h4>Total (30 days)</h4>
          <p>{totalCalories30} kcal</p>
        </div>
        <div className={styles.statBox}>
          <h4>Average / day</h4>
          <p>{avgPerDay} kcal</p>
        </div>
        <div className={styles.statBox}>
          <h4>Weekly totals</h4>
          <p>{weeklyTotals.map((w,i)=> `W${i+1}:${w}`).join('  ')}</p>
        </div>
      </div>
      <div className={styles.planList} ref={planRef}>
        {plan.map((d) => (
          <article key={d.day} className={styles.dayCard}>
            <div className={styles.dayHeader}>Day {d.day}</div>
            <ul>
              <li><strong>Breakfast:</strong> {d.meals.breakfast.name} — {d.meals.breakfast.cal} kcal</li>
              <li><strong>Lunch:</strong> {d.meals.lunch.name} — {d.meals.lunch.cal} kcal</li>
              <li><strong>Dinner:</strong> {d.meals.dinner.name} — {d.meals.dinner.cal} kcal</li>
              <li><strong>Snack:</strong> {d.meals.snack.name} — {d.meals.snack.cal} kcal</li>
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
