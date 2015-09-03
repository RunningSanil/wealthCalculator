function wealthCaculator(config){
	var _me = this;
	var _profitList = new Array();
	var defaultConfig = {

	};
	var _income = 0;
	var _pay = 0;
	var _restMoney = 0;
	var _principal = 0;
	var _rate = 0;
	var _month = 0;
	var _investWay = "";
	var _investment = 0;
	_me.result = 0;
	_me.dataList = new Array();

	_me.setPrincipal = function(principal){_principal = principal; }
	_me.setIncome = function(income){_income = income; }
	_me.setPayOnceMonth = function(pay){_pay = pay; }
	_me.setRestMonth = function(restMoney){_restMoney = restMoney; }
	_me.getResultAfter = function(show,month){
		for (var i = 0; i < month; i++) {
			if(month-i < _month){
				_month = month-i;
			}
			invest(getInvestment());
			aMonthLater();
		}
		if(show){
			show(_me.dataList);
		}
		_me.result = _principal;
		return _me.result;
	}
	var PMT = function(principal=0,rate=0,count=0){
		return principal*rate*Math.pow(1+rate,count)/(Math.pow(1+rate,count)-1) || 0; }
	var PMT_YearRate = function(principal=0,rate=0,count=0){return PMT(principal,rate/12,count); }
	var YCBX = function(principal=0,rate=0,count=0){return principal*(1+rate*count/12); }
	var aMonthLater = function(){
		var temp = {};
		temp.principal = _principal;
		temp.income = _income;
		temp.pay = _pay;
		temp.restMoney = _restMoney;
		temp.rate = _rate;
		temp.month = _month;
		temp.investment = _investment;
		temp.allProfit = getProfit();
		_me.dataList.push(temp);
		_principal = _restMoney + temp.allProfit;
	}
	var getInvestment = function(){return _investment = _principal + _income - _pay - _restMoney; }
	var invest = function(investment){
		var profit = new Array();
		if(_investWay=="DEBX"){
			var monthProfit = PMT_YearRate(investment,_rate,_month);
			for (var i = 0; i < _month; i++) {
				profit.push(monthProfit);
			};
		}
		else if(_investWay=="YCBX"){
			for (var i = 0; i < _month-1; i++) {
				profit.push(0);
			};
			profit.push(YCBX(investment,_rate,_month));
		}
		else if(_investWay=="XXHB"){
			var monthProfit = investment*_rate/12;
			for (var i = 0; i < _month-1; i++) {
				profit.push(monthProfit);
			};
			profit.push(monthProfit+investment);
		}
		_profitList.push(profit);
	}
	var getProfit = function(){//profit of this month
		var allProfit = 0;
		_profitList.forEach(function(e,i,a){
			if(e.length > 0){
				allProfit += e[0];
				e.splice(0,1);
			}
		});
		return allProfit;
	}
	var init = function(){
		_income = config.income;
		_pay = config.pay;
		_restMoney = config.restMoney;
		_principal = config.principal;
		_rate = config.rate;
		_month = config.month;
		_investWay = config.investWay;
	}
	function Profit(monthProfit,restMonth){
		var me = this;
		me.restMonth = restMonth;
		me.monthProfit = monthProfit;
		me.setRestMonth = function(restMonth){me.restMonth = restMonth; }
		me.setMonthProfit = function(monthProfit){me.monthProfit = monthProfit; }
	}
	init();
}