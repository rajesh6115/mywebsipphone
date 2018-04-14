

CONSOLE = "Console/dsp" -- Console interface for demo
IAXINFO = "guest"       -- IAXtel username/password
TRUNK = "DAHDI/G2"
TRUNKMSD = 1
function default_context(context, extension)
	app.NoOp("call should not come here "..context.." <"..extension..">")
	app.Dial('PJSIP/'..extension)
	app.Hangup()
end
function customer_care(context, extension)
	app.NoOp('Testing One way')
	app.PlayBack('hello-world')
	app.Hangup()
end
extensions = {
	['default'] = {
		['121'] = customer_care,
		['_X.'] = default_context
	};
}

hints = {
	default = {
		["1234"] = "SIP/1234";
	};
}

