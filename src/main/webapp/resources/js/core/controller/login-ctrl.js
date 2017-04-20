'use strict';

var loginController = function ($state, $scope, OAuth, $http){
	$scope.isAuthenticated = function isAuthenticated(){
		return OAuth.isAuthenticated();
	}
	$scope.login = function login(){
		var user = {
						username: "hoangnhuocquy@csc.com",
						password:"P@ssword123"
					};
		OAuth.getAccessToken(user);
	}
	$scope.refresh = function refresh(){
		OAuth.getRefreshToken();
	}
	$scope.loadUser = function loadUser(){
		$http.get("http://localhost:4000/onlinejudge-ms-user/users?email=hoangnhuocquy@csc.com").then(function (response){
			console.log(response);
		});
	}
}