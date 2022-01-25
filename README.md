Accpted Pr from someone, thinking it would be fixed. Appears this person thinks you can get a free key but I don't see how that can be done

# Assume this module is deprecated till further  notice


# MMM-wundergroundBar



## Features

* Weather forecast for today and the next 3 days, retrieved from www.wunderground.com
* Designed for use in the `bottom_bar` or `top_bar` position of your MagicMirror.
* Sunrise and Sunset times for the current day.
* Weather forecast for each day and night.
  * Daily highs displayed with daytime forecast.
  * Overnight lows displayed with the nighttime forecast.
  * Short description of weather forecast.
  * Images representing the forecast.
* Option to display the current weather, in words, at the top.

## Screenshots

![](Screenshot%202021-12-28%20194420.png)

![](Screenshot%202021-12-24%20102939.png)

## Installation and requirements

In your terminal, go to your MagicMirror's Module folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/Fifteen15Studios/MMM-wundergroundBar
```

Get your [free API key](https://www.wunderground.com)

Configure the module in the `~/MagicMirror/config/config.js` file.

## Config.js entry and options

### Example
```javascript
{
	module: "MMM-wundergroundBar",
	position: "bottom_bar", // bottom_bar or top_bar is best
	config: {
		apiKey: "abcdefg123456789", // Free API key @ https://www.wunderground.com. Empty by default
		tempUnits: "e", // e or m
        // Default location is the statue of liberty
		latitude: '40.6892534',
		longitude: '-74.0466891'
	}
}
```

|Option|Default|Description|
|---|---|---|
|`apiKey`|`""`|Free API key obtained from https://wunderground.com|
|`language`|`"en-US"`|Display language. Can be any langauge code from the [wunderground documentation](https://docs.google.com/document/d/13HTLgJDpsb39deFzk_YCQ5GoGoZCO_cRYzIxbwvgJLI/edit#heading=h.9ph8uehobq12)|
|`tempUnits`|`"e"`|`"e"` for English / Imperial units (F), or `"m"` for Metric units (C)|
|`latitude`|`"40.6892534"`|Latitude of your current location. Best obtained from a site like [Google Maps](https://maps.google.com)|
|`longitude`|`"-74.0466891"`|Longitude of your current location. Best obtained from a site like [Google Maps](https://maps.google.com)|
|`showCurrentText`|`true`|true if you want to show text of current weather conditions.|
|`showText`|`true`|true if you want to show text of daily weather conditions.|
|`iconSize`|`"2%"`|Size of the images displayed with the weather. Can be a percentage, like `"1%"`, or a number, like `25`.|
|`useHeader`|`false`|true if you want to display a custom header.|
|`header`|`"Your Header"`|Custom header to dislay. `useHeader` must be true.|
|`maxWidth`|`"100%"`|Max amount of the screen width to use.|
|`animationSpeed`|`3000`|How long to animate the new data (in milliseconds).|
|`initialLoadDelay`|`4250`|How long to delay loading initial data (in milliseconds).|
|`retryDelay`|`2500`|How long to wait to rety when data retrieval failed  (in milliseconds).|
|`updateInterval`|`5 * 60 * 1000`|How long to wait between data updates (in milliseconds).|
