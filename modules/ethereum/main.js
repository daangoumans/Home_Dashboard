// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed-to-json/
var ethereum = {
	ethereumLocation: '.ethereum',
	api_key: config.ethereum.api_key || null,
	pub_address: config.ethereum.pub_address || null,
	apiBase: 'https://api.etherscan.io/api',
	fetchInterval: config.ethereum.fetchInterval || 60000,
	updateInterval: config.ethereum.interval || 3000,
	eth_balance:'',
	eth_usd_rate:'',
	usd_balance:'',
	fadeInterval: 2000
}

/**
 * Fetches the balance from pub_address
 */
ethereum.fetchRate = function () {
	$.ajax({
		type: 'GET',
		url: ethereum.apiBase + '?module=stats&action=ethprice&apikey=' + ethereum.api_key,
		dataType: 'json',
		data:'',
		success: function (data) {
			var _eth_usd_rate = data.result.ethusd;
			this.eth_usd_rate = _eth_usd_rate;
		}.bind(this),
			error: function () {

			}
		});
}


/**
 * Fetches the balance from pub_address
 */
ethereum.fetchPrice = function () {
	$.ajax({
		type: 'GET',
		url: ethereum.apiBase + '?module=account&action=balance&address=' + ethereum.pub_address + '&apikey=' + ethereum.api_key,
		dataType: 'json',
		data:'',
		success: function (data) {
			var _wei_balance = data.result;
			var _eth_balance = (_wei_balance / 1000000000000000000);
			this.eth_balance = _eth_balance;
		}.bind(this),
			error: function () {

			}
		});
}


function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

ethereum.update = function(){
 this.usd_balance = roundNumber((this.eth_usd_rate * this.eth_balance),2);
 $(this.ethereumLocation).updateWithText("ETH $"+this.usd_balance,this.fadeInterval);
}

ethereum.init = function () {

	if (this.api_key === undefined) {
		return false;
	}

	if(this.pub_address ===undefined){
		return false;
	}

	this.fetchPrice();
	this.fetchRate();

	this.fetchIntervalId = setInterval(function () {
		this.fetchPrice();
		this.fetchRate();
	}.bind(this), this.fetchInterval)

	this.intervalId = setInterval(function () {
		this.update();
	}.bind(this), this.updateInterval);

}

ethereum.init();
