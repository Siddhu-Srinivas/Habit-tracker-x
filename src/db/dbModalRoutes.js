import Achievements from '../components/Achievements/Achievements';
import Archive from '../components/Archive/Archive';
import AppearanceSettings from '../components/Appearance Settings/AppearanceSettings';
import DataTransfer from '../components/DataTransfer/DataTransfer';
import Diary from '../components/Diary/Diary';
import HabitEditor from '../components/HabitEditor/HabitEditor';
import Menu from '../components/Menu/Menu';
import Statistics from '../components/Statistics/Statistics';
import DietModal from '../components/Diet/DietModal';
import CalendarModal from '../components/Calendar/CalendarModal';

const modalRoutes = [
	{
		path: 'achievements',
		element: <Achievements />
	},
	{
		path: 'appearance',
		element: <AppearanceSettings />
	},
	{
		path: 'archive',
		element: <Archive />
	},
	{
		path: 'dataTransfer',
		element: <DataTransfer />
	},
	{
		path: 'diary',
		element: <Diary />
	},
	{
		path: 'habitEditor',
		element: <HabitEditor />
	},
	{
		path: 'menu',
		element: <Menu />
	},
	{
 		path: 'diet',
 		element: <DietModal />
 	},
	{
		path: 'calendar',
		element: <CalendarModal />
	},
	{
		path: 'statistics',
		element: <Statistics />
	}
];

export default modalRoutes;