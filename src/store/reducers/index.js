import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import TrackingReducer from './TrackingReducer';
import EmployeeReducer from './EmployeeReducer';
import ClientReducer from './ClientReducer';
import TaskReducer from './TaskReducer';
import PromoReducer from './PromoReducer';
import NotificationReducer from './NotificationsReducer';
import ExpensesReducer from './ExpensesReducer';
import ReportReducer from './ReportReducer';
import SettigsReducer from './SettingsReducer';

export default combineReducers({
	userReducer: UserReducer,
	trackingReducer: TrackingReducer,
	employeeReducer: EmployeeReducer,
	clientReducer: ClientReducer,
	taskReducer: TaskReducer,
	promoReducer: PromoReducer,
	notificationReducer: NotificationReducer,
	expensesReducer: ExpensesReducer,
	reportReducer: ReportReducer,
	settingsReducer: SettigsReducer
});
