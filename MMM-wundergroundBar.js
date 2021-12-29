// MMM-wundergroundBar.js

/* Magic Mirror
 * Module: MMM-wundergroundBar
 * By Mykle1
 * MIT Licensed
 */
Module.register("MMM-wundergroundBar", {

    // Module config defaults.
    defaults: {
        apiKey: "", // Get FREE API key from wunderground.com
        tempUnits: "e", // e or m
        latitude: "40.6892534",
        longitude: "-74.0466891",
        useHeader: false,
        header: "Your Header", // Any text you want. useHeader must be true
        maxWidth: "100%",
        animationSpeed: 3000,
        iconSize: "2%",
        initialLoadDelay: 4250,
        retryDelay: 2500,
        showCurrentText: true,
        updateInterval: 5 * 60 * 1000 // 5 minutes
    },

    getStyles: function() {
        return ["MMM-wundergroundBar.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        //  Set locale.
		this.url = 'https://api.weather.com/v3/wx/forecast/daily/5day?geocode=' + this.config.latitude + "," + this.config.longitude + '&units=' + this.config.tempUnits + "&language=en-US&format=json&apiKey=" + this.config.apiKey
		console.log(this.name + ": url: " + this.url);
        this.forecast = [];
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Boring weather . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var forecast = this.forecast;
		
		/* For testing
		for (let x in forecast) {
			console.log(this.name + ": forecast[" + x + "]: " + forecast[x]);
		};
		
		for (let x in forecast.daypart) {
			console.log(this.name + ": forecast.daypart[" + x + "]: " + forecast.daypart[x]);
			for (let y in forecast.daypart[x]) {
				console.log(this.name + ": forecast.daypart[" + x + "][" + y + "]: " + forecast.daypart[x][y]);	
			}
		}
		
		console.log(this.name + ": forecast.dayOfWeek: "  + forecast.dayOfWeek);  */
        
        
        // daily names and icons
        var daily = document.createElement("div");
        daily.classList.add("small", "bright", "daily");
		var titles = forecast.daypart[0].wxPhraseShort;
		const days = forecast.daypart[0].daypartName;
		const iconCodes = forecast.daypart[0].iconCode;
		for(let i = 0; i < titles.length; i++) {
			if(titles[i] === null) {
				titles[i] = "";
			}
		}
		for(let i = 0; i < iconCodes.length; i++) {
			if(iconCodes[i] === null) {
				iconCodes[i] = "unknown";
			}
		}
		https://www.wunderground.com/static/i/c/v4/nt_clear.svg
		if(this.config.showCurrentText) {
			daily.innerHTML = "Current: " + forecast.narrative[0] + "<BR>";
		}
		else
			daily.innerHTML = "";
  		daily.innerHTML = daily.innerHTML +
						"Sunrise: " + "<img src=https://www.wunderground.com/static/i/c/v4/clear.svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + forecast.sunriseTimeLocal.toString().split("T")[1].split("-")[0] + " &nbsp &nbsp  &nbsp &nbsp " +
						"Sunset: " + "<img src=https://www.wunderground.com/static/i/c/v4/nt_clear.svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + forecast.sunsetTimeLocal.toString().split("T")[1].split("-")[0] + " &nbsp &nbsp  &nbsp &nbsp " +
						"Today: " + forecast.calendarDayTemperatureMax[0] + " " +titles[0] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[0] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp " +
						days[1] + ": " + forecast.calendarDayTemperatureMin[0] + " " +titles[1] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[1] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " <BR> " +
                        days[2] + ": " + forecast.calendarDayTemperatureMax[1] + " " + titles[2] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[2] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp " +
                        days[3] + ": "+ forecast.calendarDayTemperatureMin[1] + " " + titles[3] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[3] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp" +
                        days[4] + ": "+ forecast.calendarDayTemperatureMax[2] + " " + titles[4] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[4] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp " +
                        days[5] + ": "+ forecast.calendarDayTemperatureMin[2] + " " + titles[5] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[5] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp " +
                        days[6] + ": "+ forecast.calendarDayTemperatureMax[3] + " " + titles[6] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[6] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp " +
                        days[7] + ": "+ forecast.calendarDayTemperatureMin[3] + " " + titles[7] + " &nbsp" + "<img src=https://www.wunderground.com/static/i/c/v4/" + iconCodes[7] + ".svg width=" + this.config.iconSize + " height=" + this.config.iconSize + ">" + " &nbsp &nbsp  &nbsp &nbsp ";
        wrapper.appendChild(daily);
	
        return wrapper;
		
    },
	

    processWeather: function(data) {
        this.forecast = data;
//        console.log(this.forecast);
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getWeather();
        }, this.config.updateInterval);
        this.getWeather(this.config.initialLoadDelay);
    },

    getWeather: function() {
        this.sendSocketNotification('GET_WEATHER', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
		var time = this.config.initialLoadDelay;
        if (notification === "WEATHER_RESULT") {
            this.processWeather(payload);

            time = time + this.config.animationSpeed;
        }
        this.updateDom(time);
    },
});
