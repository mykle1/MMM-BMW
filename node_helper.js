/* Magic Mirror
 * Module: MMM-wundergroundBar
 * 
 * MIT Licensed
 */
const NodeHelper = require('node_helper');
const fetch = require("node-fetch");

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getWeather: function(url) {
		fetch(url).then(response => {
			response.json().then(data => {
				this.sendSocketNotification('WEATHER_RESULT', data);
			})
		}), error => {
			console.error(this.name + ' ERROR:', error);
		}
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_WEATHER') {
            this.getWeather(payload);
        }
    }
});
