(function (window, document, $) {
	var browserConsole = window.console;
	var tracker = {};
	
	function assert(espression, object){
		browserConsole.assert(expression, object);
	}
	
	function count(label){
		var key = 'count-' + label;
			
		if(!tracker[key]){
			tracker[key] = 1;		
		} else {
			trasker[key]++;
		}
		
		browserConsole.count(label);
	}
	
	function debug(){
		logToBrowser(arguments, 'debug');
	}
	
	function dir(object){
		browserConsole.dir(object);	
	}
	
	function error(){
		 logToBrowser(arguments, 'error');
	}
	
	function group(){
		logToBrowser(arguments, 'group');
	}
	
	function groupCollapsed(){
		logToBrowser(arguments, 'groupCollapsed');
	}
	
	function groupEnd(){
		browserConsole.groupEnd();
	}
	
	function info(){
		logToBrowser(arguments, 'info');
	}
	
	function log(){
		logToBrowser(arguments, 'log');
	}
	
	function time(label){
		var key = 'time-' + label;
		
		if(!tracker[key]){
			tracker[key]  = new Date();	
		}
		
		browserConsole.time(label);
	}
	
	function timeEnd(label){
		var key = 'time-' + label;
		
		tracker[key] = null;
		
		browserConsole.timeEnd(label);
	}
	
	function warn(){
		logToBrowser(arguments, 'warn');
	}
	
	function logToBrowser(arguments, func){
		if((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string'){
			browserConsole[func]((Array.prototype.slice.call(arguments)).toString());	
		} else {
			browerConsole[func](Array.prototype.slice.call(arguments));
		}
	}
		
	window.console = $.extend({
		assert: assert,
		count: count,
		debug: debug,
		dir: dir,
		error: error,
		group: group,
		groupCollapsed: groupCollapsed,
		groupEnd: groupEnd,
		info: info,
		log: log,
		time: time,
		timeEnd: timeEnd,
		warn: warn
	}, window.console);
})(window, document, $);