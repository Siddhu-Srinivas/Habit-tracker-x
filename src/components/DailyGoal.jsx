import { motion } from 'framer-motion';
import { FaBullseye, FaCheckCircle } from 'react-icons/fa';
import styles from '../css/DailyGoal.module.css';

function DailyGoal({ habits }) {
	const totalHabits = habits?.length || 0;
	const completedHabits = habits?.filter(h => {
		const today = new Date();
		return h.completedDays?.some(d => {
			const completedDate = new Date(d);
			return completedDate.toDateString() === today.toDateString();
		});
	}).length || 0;

	const completionPercentage = totalHabits > 0 ? Math.floor((completedHabits / totalHabits) * 100) : 0;

	const containerVariants = {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.4 }
	};

	return (
		<motion.div
			className={styles.dailyGoalContainer}
			variants={containerVariants}
			initial="initial"
			animate="animate"
		>
			<div className={styles.header}>
				<FaBullseye className={styles.icon} />
				<h3>Today's Goal</h3>
			</div>

			<div className={styles.progressSection}>
				<div className={styles.progressBar}>
					<motion.div
						className={styles.progressFill}
						initial={{ width: 0 }}
						animate={{ width: `${completionPercentage}%` }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						style={{
							background: completionPercentage === 100
								? 'var(--gradient-success)'
								: 'var(--gradient-primary)'
						}}
					/>
				</div>
				<div className={styles.stats}>
					<span className={styles.percentage}>{completionPercentage}%</span>
					<span className={styles.count}>{completedHabits}/{totalHabits}</span>
				</div>
			</div>

			{completionPercentage === 100 && totalHabits > 0 && (
				<motion.div
					className={styles.celebration}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5 }}
				>
					<FaCheckCircle className={styles.celebrationIcon} />
					<p>Great job! All daily habits completed!</p>
				</motion.div>
			)}
		</motion.div>
	);
}

export default DailyGoal;
