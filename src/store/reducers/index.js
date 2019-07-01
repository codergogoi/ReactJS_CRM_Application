import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import OfferReducer from './OffersReducer';
import EmployeeReducer from './EmployeeReducer';
import ClientReducer from './ClientReducer';
import TaskReducer from './TaskReducer';
import PromoReducer from './PromoReducer';
import NotificationReducer from './NotificationsReducer';
import ExpensesReducer from './ExpensesReducer';
import PassportReducer from './PassportReducer';
import SettigsReducer from './SettingsReducer';

export default combineReducers({
	userReducer: UserReducer,
	offerReducer: OfferReducer,
	employeeReducer: EmployeeReducer,
	clientReducer: ClientReducer,
	taskReducer: TaskReducer,
	promoReducer: PromoReducer,
	notificationReducer: NotificationReducer,
	expensesReducer: ExpensesReducer,
	passportReducer: PassportReducer,
	settingsReducer: SettigsReducer
});
