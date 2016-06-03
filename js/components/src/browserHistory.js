// This is for switching between browserHistory and hashHistory
import { hashHistory, browserHistory } from 'react-router'

if (MOCKUP)
	module.exports = hashHistory;
else
	module.exports = browserHistory;
