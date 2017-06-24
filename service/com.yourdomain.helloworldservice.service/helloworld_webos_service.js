var Service = require('webos-service');
var service = new Service("com.yourdomain.helloworldservice.service");

service.register("hello", function(message) {
	message.respond({
		data: "Hello, " + message.payload.name + "!"
	});
});