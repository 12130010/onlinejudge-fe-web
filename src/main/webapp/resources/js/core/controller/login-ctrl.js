'use strict';

var loginController = function ($state, $scope, userService){
	function init(){
		//check have login or not
		if($scope.isAuthenticated()){
			$state.go("home");
		}
		
		//init user model
		$scope.user = 	{
				username: "hoangnhuocquy@csc.com",
				password:"P@ssword123"
		};
	}
	
	init();
	
	$scope.login = function login(){
		$scope.showLoadingBar();
		userService.login($scope.user).then(function(response){
			$state.go("home");
			$scope.hideLoadingBar();
		}, function error(){
			 $scope.hideLoadingBar();
			 alert("Username and password were not correct!");
		});
	}
	
	$scope.refresh = function refresh(){
		userService.getRefreshToken();
	}
	
//	$scope.loadUser = function loadUser(){
//		userService
//	}
}