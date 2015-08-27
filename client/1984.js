(function( window, document, ORWELL, undefined ){

	var _IDENT = "1984.js";
	var _WS = { };

	var _DEBUG = function() { };
	var _DBG01 = function(msg) {
		console.log(_IDENT + ": "  + msg);
	}

	var _PROPAGATE = function(e) {
		_DEBUG("Propagating event " + e);
		try {
			_WS.send(e);
		} catch (exception) {
			_DEBUG(exception);
		}
	};

	ORWELL.init = function(server, options) {
		options = options || {};
		_DEBUG = options.debug ? _DBG01 : _DEBUG;
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

}( window, window.document, (window.ORWELL = window.ORWELL || {}) ));
