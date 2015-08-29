function wealthCaculator(income,pay,restMoney,principal=0,rate=0.06,month=6){
	var _me = this;
	var _profitList = new Array();
	var _income = 0;
	var _pay = 0;
	var _restMoney = 0;
	var _principal = 0;
	var _rate = 0;
	var _month = 0;
	var _investment = 0;
	_me.result = 0;

	_me.setPrincipal = function(principal){_principal = principal; }
	_me.setIncome = function(income){_income = income; }
	_me.setPayOnceMonth = function(pay){_pay = pay; }
	_me.setRestMonth = function(restMoney){_restMoney = restMoney; }
	_me.getResultAfter = function(month){
		for (var i = 0; i < month; i++) {
			if(month-i < _month){
				_month = month-i;
			}
			invest(getInvestment());
			aMonthLater();
		}
		_me.result = _principal;
		return _me.result;
	}
	var PMT = function(principal=0,rate=0,count=0){
		return principal*rate*Math.pow(1+rate,count)/(Math.pow(1+rate,count)-1) || 0; }
	var PMT_YearRate = function(principal=0,rate=0,count=0){return PMT(principal,rate/12,count); }
	var aMonthLater = function(){_principal = _restMoney + getProfit(); }
	var getInvestment = function(){return _investment = _principal + _income - _pay - _restMoney; }
	var invest = function(investment){
		var profit = new Profit(_month,PMT_YearRate(investment,_rate,_month));
		_profitList.push(profit);
	}
	var getProfit = function(){//profit of this month
		var allProfit = 0;
		_profitList.forEach(function(e,i,a){
			if(e.restMonth > 0){
				e.restMonth--;
				allProfit += e.monthProfit;
			}
			if(e.restMonth <= 0){
				a.splice(i,1);
			}
		});
		return allProfit;
	}
	var init = function(){
		_income = income;
		_pay = pay;
		_restMoney = restMoney;
		_principal = principal;
		_rate = rate;
		_month = month;
	}
	function Profit(monthProfit,restMonth){
		var me = this;
		me.restMonth = monthProfit;
		me.monthProfit = restMonth;
		me.setRestMonth = function(restMonth){me.restMonth = restMonth; }
		me.setMonthProfit = function(monthProfit){me.monthProfit = monthProfit; }
	}
	init();
}