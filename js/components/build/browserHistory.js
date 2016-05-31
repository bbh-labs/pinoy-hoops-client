'use strict';

var _reactRouter = require('react-router');

if (MOCKUP) {
    module.exports = _reactRouter.hashHistory;
} else {
    module.exports = _reactRouter.browserHistory;
} // This is for switching between browserHistory and hashHistory