import { motion, AnimatePresence } from 'framer-motion';
import { FaFire } from 'react-icons/fa';
import styles from '../css/StreakNotification.module.css';

function StreakNotification({ habit, onClose }) {
	const { title, currentStreak } = habit;

	const isMilestone = currentStreak > 0 && currentStreak % 7 === 0;

	const variants = {
		initial: { opacity: 0, scale: 0.8, y: -50 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.8, y: -50 }
	};

	return (
		<AnimatePresence>
			<motion.div
				className={`${styles.notification} ${isMilestone ? styles.milestone : ''}`}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.3 }}
				onAnimationComplete={() => {
					setTimeout(onClose, 3000);
				}}
			>
				<div className={styles.content}>
					<FaFire className={styles.icon} />
					<div className={styles.text}>
						<h4>{title}</h4>
						<p>
							{isMilestone ? (
								<strong>🎉 {currentStreak} day streak milestone!</strong>
							) : (
								<span>Streak: <strong>{currentStreak}</strong> days</span>
							)}
						</p>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

export default StreakNotification;
