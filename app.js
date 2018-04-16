console.clear();
var chargeRect = document.querySelector("div[battery] svg rect#level");
var chargePower = document.querySelector("div[battery] svg path#power");
var labelMode = document.querySelector("div[battery] span[mode]");
var labelTime = document.querySelector("div[battery] span[time]");
var run = function(battery) {
	var timeToString = function(time) {
		if (time == Infinity)
			return "Calculating time...";
		if (time < 60)
			return "less than a minute";
		var minutes = Math.floor(time / 60);
		var minutesRest = minutes % 60;
		var minutesString = 1 == minutesRest ? "one minute" : minutesRest + " minutes";
		if (minutes < 60)
			return 1 == minutes ? "one minute" : minutesString;
		var hours = Math.floor(minutes / 60);
		return (1 == hours ? "one hour" : hours + " hours") + " and " + minutesString;
	}
	var update = function() {
		if (battery.charging) {
	
			if (0 == battery.chargingTime) {
				labelMode.textContent = "Charged";
				labelTime.textContent = "";
			} else {
				labelMode.textContent = "Charging";
				labelTime.textContent = timeToString(battery.chargingTime);
			}
			chargeRect.setAttribute("visibility", "hidden");
			chargePower.setAttribute("visibility", "visible");
		} else {
			if (1 == battery.level && battery.dischargingTime == Infinity) {
				
				labelMode.textContent = "Charged";
				labelTime.textContent = "";
			} else {
				labelMode.textContent = "Remaining";
				labelTime.textContent = timeToString(battery.dischargingTime);
				chargeRect.setAttribute("visibility", "visible");
				chargeRect.width.baseVal.value = battery.level * 272;
				chargePower.setAttribute("visibility", "hidden");
			}
		}
		console.log(battery);
	}
	battery.onchargingchange =
		battery.onchargingtimechange =
		battery.ondischargingtimechange =
		battery.onlevelchange = update;
	update();
};
if (navigator.battery)
	run(navigator.battery);
else if (navigator.getBattery)
	navigator.getBattery().then(run);
else {
	labelMode.textContent = "Not supported :(";
}