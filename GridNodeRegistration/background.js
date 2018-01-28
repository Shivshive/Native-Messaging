
var _port = null;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	console.info("Received %o from %o, frame", msg, sender.tab, sender.frameId);

	var port;

	// As it is registered in registy
	var host_name = 'selenium.node.register';

	if (_port == null) {

		// Open port (for communication).
		port = chrome.runtime.connectNative(host_name);

	}
	else {

		// Recovering earlier port object.
		port = _port;
	}

	if(msg.message == "start-node"){

		// Creating port backup.
		_port = port;
	}
	else{

		//Destroying port backup.
		_port = null;
	}

	// Send message to native application.
	port.postMessage(msg);

	// Listen for response...
	port.onMessage.addListener(function (msg) {
		// Send data to the content.
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg, function (response) { });
		});
	});

	port.onDisconnect.addListener(function () {
		console.info("Disconnected.");
	});
});

