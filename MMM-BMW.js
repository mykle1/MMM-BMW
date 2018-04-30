/* Magic Mirror
 * Module: MMM-BMW
 * By Mykle1
 * MIT Licensed
 */
Module.register("MMM-BMW", {

    // Module config defaults.
    defaults: {
	apiKey: "",                               // Get FREE API key from wunderground.com
	tempUnits: "",		                      // C  or F
        stateOrCountry: "NY",                     // State if in US. Country if not in US
        city: "New_York",                         // city, no spaces. Use underscore.
        useHeader: false,                         // true if you want a header      
        header: "Your Header",                    // Any text you want. useHeader must be true
        maxWidth: "100%",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,           // 5 minutes

    },

    getStyles: function() {
        return ["MMM-BMW.css"];
    },

//    getScripts: function() {
//        return ["moment.js"];
//    },

    start: function() {
        Log.info("Starting module: " + this.name);


        //  Set locale.
        this.url = 'http://api.wunderground.com/api/' + this.config.api_key + '/forecast/q/' + this.config.stateOrCountry + '/' + this.config.city +'.json';
        this.forecast = [];
        this.scheduleUpdate();
    },

    getDom: function() {
		
		
//		function to_celcius (t) {
//		 	return (t - 32) * 5 / 9;              // convert celcius to fahrenheit
//		 }

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
		var apiKey = this.config.apiKey;
   
        
        // title and icon
//        var title = document.createElement("div");
//        title.classList.add("small", "bright", "title");
//  		title.innerHTML = forecast.forecast.txt_forecast.forecastday[1].title + " &nbsp " + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[1].icon + ".png width=2% height=2%>";
//        wrapper.appendChild(title);
  
        
        // forecast text, F or C
        var fcttext = document.createElement("div");
        fcttext.classList.add("small", "bright", "fcttext");
  		fcttext.innerHTML = this.config.tempUnits != "C" ? "Current conditions: &nbsp &nbsp " + forecast.forecast.txt_forecast.forecastday[0].fcttext.split(".").join(".\xA0 &nbsp ") : "Current conditions: &nbsp &nbsp " + forecast.forecast.txt_forecast.forecastday[1].fcttext_metric.split(".").join(".\xA0 &nbsp ");
        wrapper.appendChild(fcttext);
        
        
        
        // daily names and icons
        var daily = document.createElement("div");
        daily.classList.add("small", "bright", "daily");
  		daily.innerHTML = forecast.forecast.txt_forecast.forecastday[1].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[1].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp " 
                        + forecast.forecast.txt_forecast.forecastday[2].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[2].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp "
                        + forecast.forecast.txt_forecast.forecastday[3].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[3].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp "
                        + forecast.forecast.txt_forecast.forecastday[4].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[4].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp "
                        + forecast.forecast.txt_forecast.forecastday[5].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[5].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp "
                        + forecast.forecast.txt_forecast.forecastday[6].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[6].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp "
                        + forecast.forecast.txt_forecast.forecastday[7].title + " &nbsp" + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[7].icon + ".png width=2% height=2%>" + " &nbsp &nbsp  &nbsp &nbsp ";
        wrapper.appendChild(daily);
        
        
        // day2 name and icon
//        var day2 = document.createElement("div");
//        day2.classList.add("small", "bright", "day2");
//  		day2.innerHTML = forecast.forecast.txt_forecast.forecastday[2].title + " &nbsp " + "<img src=./modules/MMM-BMW/images/" + forecast.forecast.txt_forecast.forecastday[2].icon + ".png width=2% height=2%>";;
//        wrapper.appendChild(day2);
        
        
        
        //Mookie Wilson
        
//        td3.innerHTML = config.units != "metric" ? current.current.pressure_in : current.current.pressure_mb+ " hPa";
        
        
                
//                '<marquee behavior="scroll" direction="left" scrollamount="5">'
                
//                + forecast.forecast.txt_forecast.forecastday[1].title
        
//                + '</marquee>';
        
			
        
	
            
//            title.innerHTML =
                
//                '<marquee behavior="scroll" direction="left" scrollamount="3">'
                
            
 //               +'</marquee>';
            
//			wrapper.appendChild(title);
	
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
        if (notification === "WEATHER_RESULT") {
            this.processWeather(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
