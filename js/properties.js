var connectionSection = {
	type: "items",
	label: "QActive Connection",
	items: {
		server: {
			ref: "npsod.conn.server",
			label: "Server Connection",
			type: "string",
			expression: "optional"
		},

		request_method: {
			type: "string",
			component: "dropdown",
			label: "Request Metod",
			ref: "npsod.conn.requestMethod",
			options: [
				{
					value: "GET",
					label: "GET"
				},
				{
					value: "POST",
					label: "POST"
				}
			],
			defaultValue: "GET",
			show: (data) => data?.npsod?.conn?.requestMethod
		},

		username: {
			ref: "npsod.conn.username",
			label: "Basic Auth Username",
			type: "string"
			//,show: (data) => data?.npsod?.conn?.username
		},

		password: {
			ref: "npsod.conn.password",
			label: "Basic Auth Password",
			type: "string"
			//,show: (data) => data?.npsod?.conn?.password
		},

		/*jwtAuth: {
			ref: "npsod.conn.jwtAuth",
			label: "JWT Auth",
			type: "boolean",
			component: "switch",
			options: [
				{
				  value: true,
				  label: "Yes",
				},
				{
				  value: false,
				  label: "No",
				},
			],
			defaultValue: false,
		},

		jwtChannel: {
			type: "string",
			component: "dropdown",
			label: "JWT Channel",
			ref: "npsod.conn.jwtChannel",
			options: [
				{
					value: "clientJWT",
					label: "Client JWT"
				},
				{
					value: "serverJWT",
					label: "Server JWT"
				}
			],
			defaultValue: "clientJWT",
			show: (data) => data?.npsod?.conn?.jwtAuth
		},

		jwtPrivateKEY: {
			label:"Private KEY",
			component: "textarea",
			rows: 10,
			maxlength: 2048,
			ref: "npsod.conn.jwtPrivateKEY",
			show: (data) => data?.npsod?.conn?.jwtAuth && data?.npsod?.conn?.jwtChannel === "clientJWT"
		},

		jwtServer: {
			ref: "npsod.conn.jwtServer",
			label: "JWT Server Connection",
			type: "string",
			expression: "optional",
			show: (data) => data?.npsod?.conn?.jwtAuth && data?.npsod?.conn?.jwtChannel === "serverJWT"
		},


		ntlm: {
			ref: "npsod.conn.ntlm",
			type: "string",
			defaultValue: "null",
			show: function(){
				return false;
			}
		},*/

		test: {
			label: "Test Connect",
			component: "button",
			ref: "npsod.conn.test",
			action: function(data) {
				//Test the connection by sending API request
				var URL = data.npsod.conn.server
				var username = data.npsod.conn.username
				var password = data.npsod.conn.password
				var basic_auth = btoa(username+ ":" + password)
				var request_met = data.npsod.conn.requestMethod;
				$.ajax({
					url: URL,
					method: request_met,
					crossDomain: true,
					headers: {
    					Authorization : "Basic " + basic_auth
  				}
					/*,xhrFields: {
						withCredentials: true
					}*/
				}).done(function(response){
					if(response.code == 0){
						alert("Connect Succeed!");
						console.log("Connect Succeed!");
					}else {
						alert("Connect Failed! Message:" + response.message + ' Code: (' + response.code + ')');
						console.log("Connect Failed! Message:" + response.message + ' Code: (' + response.code + ')');
					}
				}).fail(function(e){
					alert("Connect Failed! Pease check your connection.");
					console.log("Credential " + btoa(username+ ":" + password));
					console.log("Method " + request_met);
					console.log("Connect Failed! Pease check your connection.");
				});
			}
		},

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
				const $scope = $(`#nprinting-object-${data.qInfo.qId}`).scope();
				return $.ajax({
					url: requestUrl,
					method: 'GET',
					headers: {
						Authorization: $scope.getJwtAuthToken(data.npsod.conn),
					},
					xhrFields: {
						withCredentials: !$scope.getJwtAuthToken(data.npsod.conn),
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
		}
	}
};

var AppearanceSection = {
	uses: "settings",
	items: {
		label: {
			ref: "npsod.conn.label",
			label: "Button Label",
			type: "string",
			expression: "optional"
		},
		presentation : {
				label : "Display",
				items : {
					buttonPosition: {
						type: "string",
						component: "buttongroup",
						label: "Button position",
						ref: "npsod.button.position",
						options: [
						  {
							value: "top",
							label: "Top",
							tooltip: "Top"
						  },
						  {
							value: "middle",
							label: "Middle",
							tooltip: "Middle"
						  },
						  {
							value: "bottom",
							label: "Bottom",
							tooltip: "Bottom"
						  }
						],
						defaultValue: "top"
					},
					DomId: {
						type: "string",
						label: "DOM Id",
						ref: "npsod.button.DomId",
						expression:"optional",
						default:"[]"
					},
					CSSConditionalClass: {
						type: "string",
						label: "CSS Conditional Class",
						ref: "npsod.button.CSSConditionalClass",
						expression:"always",
						defaultValue: ""
					}
				}
			},
	}
};
