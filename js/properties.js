var connectionSection = {
	type: "items",
	label: "NPrinting Connection",
	items: {
		server: {
			ref: "npsod.conn.server",
			label: "Server Connection",
			type: "string",
			expression: "optional"
		},

		/*
		ntlm: {
			ref: "npsod.conn.ntlm",
			type: "string",
			defaultValue: "null",
			show: function(){
				return false;
			}
		},

		test: {
			label: "Connect",
			component: "button",
			ref: "npsod.conn.ntlm",
			action: function(data) {
				//Test the connection by sending API request ntlm request
				var URL = data.npsod.conn.server + 'api/v1/login/ntlm'
				$.ajax({
					url: URL,
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).done(function(response){
					if(response.code == 0){
						alert("Connect Succeed!");
					}else {
						alert("Connect Failed! Message:" + response.message + ' Code: (' + response.code + ')');
					}
				}).fail(function(e){
					alert("Connect Failed! Pease check your connection.");		
				});
			}
		},
		*/

		app: {
			type: "string",
			component: "dropdown",
			label: "Choose App",
			ref: "npsod.conn.app",
			options: function(data) {
				return $.ajax({
					url: data.npsod.conn.server + 'api/v1/apps',
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).then(function(response) {
					return response.data.items.map(function(app) {
						return {
							value: app.id,
							label: app.name
						}
					});
				});
			}
		}
	}
};

var ReportSection ={
	type: "items",
	label: "Report Configuration",
	items: {
		report: {
			type: "string",
			component: "dropdown",
			label: "Choose Report",
			ref: "npsod.conn.report",
			options: function(data) {
				var requestUrl = data.npsod.conn.server + 'api/v1/reports' + '?appId=' + data.npsod.conn.app + '&sort=+title';

				return $.ajax({
					url: requestUrl,
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).then(function(response) {
					return response.data.items.map(function(report) {
						return {
							value: report.id,
							label: report.title
						}
					});
				});
			}
		},

		exportFormat: {
			type: "string",
			component: "dropdown",
			label: "Default Export Format",
			ref: "npsod.conn.exportFormat",
			options: function(data) {
				var requestUrl = data.npsod.conn.server + 'api/v1/reports' + '/' + data.npsod.conn.report;

				return $.ajax({
					url: requestUrl,
					method: 'GET',
					xhrFields: {
						withCredentials: true
					}
				}).then(function(response) {
					return response.data.outputFormats.map(function(format) {
						return {
							value: format,
							label: format.toUpperCase()
						}
					});
				});
			}
		}
	}
};