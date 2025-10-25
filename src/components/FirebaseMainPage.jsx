import styles from '../css/MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import FirebaseHeader from './FirebaseHeader';
import HabitList from './HabitList';
import Placeholder from './Placeholder';
import DailyGoal from './DailyGoal';
import HabitStats from './HabitStats';

// icons
import { ReactComponent as Calendar } from '../img/calendar.svg';
import { MdAddToPhotos } from "react-icons/md";
import { useFirebaseHabitsStore } from '../stores/firebaseHabitsStore';

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function FirebaseMainPage() {
	const { habits, isLoading, isInitialized } = useFirebaseHabitsStore();
	
	// Ensure habits is always an array
	const safeHabits = Array.isArray(habits) ? habits : [];
	const filteredHabits = safeHabits.filter((h) => !h.isArchived);

	// Show loading state while data is being fetched or not initialized
	if (isLoading || !isInitialized) {
		return (
			<motion.div className={styles.mainPage} {...mainVariants}>
				<FirebaseHeader />
				<div style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					height: '50vh',
					color: 'white'
				}}>
					<div>Loading your habits...</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div className={styles.mainPage} {...mainVariants}>
			<FirebaseHeader />

			{filteredHabits.length > 0 && (
				<>
					<HabitStats habits={filteredHabits} />
					<DailyGoal habits={filteredHabits} />
				</>
			)}

			{/* Only render HabitList when we have valid data */}
			{Array.isArray(filteredHabits) && (
				<HabitList habits={filteredHabits} />
			)}

			{filteredHabits.length === 0 && (
				<Placeholder
					image={<Calendar />}
					title="No active habits found"
					desc="Why not create one now?"
					textOnButton="Create First Habit"
					buttonIcon={<MdAddToPhotos />}
					to={`${process.env.PUBLIC_URL}/modal/habitEditor`}
					state={{ modalTitle: 'Create new habit' }}
				/>
			)}
		</motion.div>
	);
}

export default FirebaseMainPage;
