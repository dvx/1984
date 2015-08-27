(function( window, document, $1984, undefined ){

	var _NAME = "1984.js";
	var _WS = { };

	var _TRACKING = { };

	var _DEBUG = function() { };
	var _DBGON = function(msg) {
		console.log(_NAME + ": "  + msg);
	}

	var _PROPAGATE = function(e) {
		_DEBUG("Propagating event " + e);
		try {
			console.log(e);
			_WS.send(JSON.stringify({
				"type" : e.type,
				"timestamp" : e.timeStamp,
				"tracking" : _TRACKING
			}));
		} catch (exception) {
			_DEBUG(exception);
		}
	};

	$1984.init = function(server, options) {
		var options = options || { };
		_TRACKING = options.tracking || _TRACKING;
		_DEBUG = options.debug ? _DBGON : _DEBUG;
		_WS = new WebSocket(server);

		document.addEventListener('DOMContentLoaded', function () {
			_WS.onopen = function() {
				var watchable = document.querySelectorAll("[o-watch]");
				var wl = watchable.length;
				for (var i = 0; i < wl; ++i) {
					var events = watchable[i].getAttribute("o-watch").split(" ");
					for (var j = 0; j < events.length; ++j) {
						watchable[i].addEventListener(events[j], _PROPAGATE, true);
						_DEBUG("Spying on " + watchable[i] + "[" + events[j] + "]");
					}
				}
				window.addEventListener("scroll", _PROPAGATE, true);
			};
		});
	};

}( window, window.document, (window.$1984 = window.$1984 || {}) ));