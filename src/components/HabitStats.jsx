import { motion } from 'framer-motion';
import { FaChartLine, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import styles from '../css/HabitStats.module.css';

function HabitStats({ habits }) {
	const calculateStats = () => {
		let totalCompletions = 0;
		let totalHabits = habits?.length || 0;
		let longestStreak = 0;
		let averageCompletion = 0;

		habits?.forEach(habit => {
			const completedDays = habit.completedDays?.length || 0;
			totalCompletions += completedDays;

			const streaks = calculateStreaks(habit.completedDays);
			if (streaks.currentStreak > longestStreak) {
				longestStreak = streaks.currentStreak;
			}
		});

		if (totalHabits > 0) {
			averageCompletion = Math.floor(totalCompletions / (totalHabits * 30) * 100);
			averageCompletion = Math.min(averageCompletion, 100);
		}

		return {
			totalCompletions,
			totalHabits,
			longestStreak,
			averageCompletion
		};
	};

	const calculateStreaks = (completedDays) => {
		if (!Array.isArray(completedDays) || completedDays.length === 0) {
			return { currentStreak: 0 };
		}

		const sortedDates = completedDays
			.map(d => new Date(d))
			.sort((a, b) => b - a);

		let currentStreak = 0;
		const today = new Date();
		let checkDate = new Date(today);

		for (const date of sortedDates) {
			const dateCopy = new Date(date);
			dateCopy.setHours(0, 0, 0, 0);
			checkDate.setHours(0, 0, 0, 0);

			if (dateCopy.getTime() === checkDate.getTime()) {
				currentStreak++;
				checkDate.setDate(checkDate.getDate() - 1);
			} else if (dateCopy.getTime() < checkDate.getTime()) {
				break;
			}
		}

		return { currentStreak };
	};

	const stats = calculateStats();

	const containerVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.4, staggerChildren: 0.1 }
	};

	const itemVariants = {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 }
	};

	return (
		<motion.div
			className={styles.statsContainer}
			variants={containerVariants}
			initial="initial"
			animate="animate"
		>
			<motion.div className={styles.statCard} variants={itemVariants}>
				<div className={styles.iconWrapper}>
					<FaChartLine />
				</div>
				<div className={styles.content}>
					<h4>Total Completions</h4>
					<p className={styles.value}>{stats.totalCompletions}</p>
				</div>
			</motion.div>

			<motion.div className={styles.statCard} variants={itemVariants}>
				<div className={styles.iconWrapper}>
					<FaTrophy />
				</div>
				<div className={styles.content}>
					<h4>Longest Streak</h4>
					<p className={styles.value}>{stats.longestStreak} days</p>
				</div>
			</motion.div>

			<motion.div className={styles.statCard} variants={itemVariants}>
				<div className={styles.iconWrapper}>
					<FaCalendarAlt />
				</div>
				<div className={styles.content}>
					<h4>Completion Rate</h4>
					<p className={styles.value}>{stats.averageCompletion}%</p>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default HabitStats;
