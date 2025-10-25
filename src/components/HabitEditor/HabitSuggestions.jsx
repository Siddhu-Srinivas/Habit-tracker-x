import styles from '../../css/HabitSuggestions.module.css';
import { FaDumbbell, FaBook, FaPrayingHands, FaRunning, FaApple, FaBed, FaTint, FaBrain, FaGuitar, FaPencilAlt } from 'react-icons/fa';

const predefinedHabits = [
  {
    title: 'Gym Workout',
    icon: <FaDumbbell />,
    description: 'Build strength and fitness',
    colorIndex: 0,
    iconTitle: 'dumbbell'
  },
  {
    title: 'Reading',
    icon: <FaBook />,
    description: 'Read for personal growth',
    colorIndex: 1,
    iconTitle: 'book'
  },
  {
    title: 'Meditation',
    icon: <FaPrayingHands />,
    description: 'Practice mindfulness',
    colorIndex: 2,
    iconTitle: 'praying-hands'
  },
  {
    title: 'Running',
    icon: <FaRunning />,
    description: 'Cardio exercise',
    colorIndex: 3,
    iconTitle: 'running'
  },
  {
    title: 'Healthy Eating',
    icon: <FaApple />,
    description: 'Maintain a balanced diet',
    colorIndex: 4,
    iconTitle: 'apple'
  },
  {
    title: 'Early Sleep',
    icon: <FaBed />,
    description: 'Better sleep schedule',
    colorIndex: 5,
    iconTitle: 'bed'
  },
  {
    title: 'Drink Water',
    icon: <FaTint />,
    description: 'Stay hydrated',
    colorIndex: 6,
    iconTitle: 'water'
  },
  {
    title: 'Learn Something',
    icon: <FaBrain />,
    description: 'Daily learning habit',
    colorIndex: 7,
    iconTitle: 'brain'
  },
  {
    title: 'Practice Music',
    icon: <FaGuitar />,
    description: 'Improve musical skills',
    colorIndex: 8,
    iconTitle: 'guitar'
  },
  {
    title: 'Journaling',
    icon: <FaPencilAlt />,
    description: 'Daily reflection',
    colorIndex: 9,
    iconTitle: 'pencil'
  }
];

function HabitSuggestions({ onSelect }) {
  return (
    <div className={styles.suggestionsContainer}>
      <h3 className={styles.suggestionsTitle}>Suggested Habits</h3>
      <div className={styles.suggestionsList}>
        {predefinedHabits.map((habit, index) => (
          <div
            key={index}
            className={styles.suggestionItem}
            onClick={() => onSelect(habit)}
          >
            <div className={styles.suggestionIcon}>{habit.icon}</div>
            <div className={styles.suggestionInfo}>
              <h4>{habit.title}</h4>
              <p>{habit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitSuggestions;