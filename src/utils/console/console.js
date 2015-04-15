(function(window, document) {
	var browserConsole = window.console;
	var tracker = {};
	var logStack = new Array();

	function Log(type, value) {
		this.type = type;
		this.logs = null;
		if (this.type === 'group' || this.type === 'groupCollapsed') {
			this.logs = new Array();
		}
		this.value = value;
	}
	
	function assert(espression, object) {
		if (expression) {
			pushToLogStack('log', object);
		}

		browserConsole.assert(expression, object);
	}

	function count(label) {
		var key = 'count-' + label;

		if (!tracker[key]) {
			tracker[key] = 1;
		} else {
			trasker[key]++;
		}

		pushToLogStack('log', label + ': ' + tracker[key]);

		browserConsole.count(label);
	}

	function debug() {
		pushToLogStack('log', arguments);

		logToBrowser(arguments, 'debug');
	}

	function dir(object) {
		pushToLogStack('dir', object);

		browserConsole.dir(object);
	}

	function error() {
		pushToLogStack('error', arguments);

		logToBrowser(arguments, 'error');
	}

	function group() {
		var log = new Log('group', arguments);

		addLog(log);

		logStack.push(log.logs);

		logToBrowser(arguments, 'group');
	}

	function groupCollapsed() {
		var log = new Log('groupCollapsed', arguments);

		addLog(log);

		logStack.push(log.logs);

		logToBrowser(arguments, 'groupCollapsed');
	}

	function groupEnd() {
		var childStack = logStack.pop();
		var parentStack = logStack.pop();
		if (parentStack) {
			var parentLog = parentStack.pop();
			parentLog.logs = childStack();
			logStack.push(parentStack);
		}

		browserConsole.groupEnd();
	}

	function info() {
		createLog('log', arguments);

		logToBrowser(arguments, 'info');
	}

	function log() {
		createLog('log', arguments);

		logToBrowser(arguments, 'log');
	}

	function time(label) {
		var key = 'time-' + label;

		if (!tracker[key]) {
			tracker[key] = new Date();
		}

		browserConsole.time(label);
	}

	function timeEnd(label) {
		var key = 'time-' + label;

		var currentTime = new Date();

		createLog('log', label + ': ' + currentTime - tracker[key]);

		tracker[key] = null;

		browserConsole.timeEnd(label);
	}

	function warn() {
		createLog('warn', arguments);

		logToBrowser(arguments, 'warn');
	}

	function createLog(type, value) {
		addLog(new Log(type, value));
	}

	function addLog(log) {
		var currentLog = logStack.pop();
		currentLog.push(log);
		logStack.push(currentLog);
	}

	function logToBrowser(arguments, func) {
		if ((Array.prototype.slice.call(arguments)).length === 1
				&& typeof Array.prototype.slice.call(arguments)[0] === 'string') {
			browserConsole[func]((Array.prototype.slice.call(arguments))
					.toString());
		} else {
			browerConsole[func](Array.prototype.slice.call(arguments));
		}
	}

	var console = {
		logStack: logStack,
		assert : assert,
		count : count,
		debug : debug,
		dir : dir,
		error : error,
		group : group,
		groupCollapsed : groupCollapsed,
		groupEnd : groupEnd,
		info : info,
		log : log,
		time : time,
		timeEnd : timeEnd,
		warn : warn
	};

	function init() {
		for ( var command in console) {
			if (console.hasOwnProperty(command)) {
				browserConsole[command] = console[command];
			}
		}

		logStack.push(new Stack());
	}

	init();
})(window, document);