'use strict';
onlinejudgeApp.service('userService', function($http, $q, OAuth, connectorService) {
	function UserService(){
		this.userDetail = {};
	}
	
	UserService.prototype.isAuthenticated = function isAuthenticated(){
		return OAuth.isAuthenticated();
	}
	
	UserService.prototype.login = function login(user){
		var self = this;
    	var deferred = $q.defer();
    	
		OAuth.getAccessToken(user).then(function(response){
			self.loadUserDetail().then(function(){
				deferred.resolve();
			});
		});
		
		return deferred.promise; 
	}
	UserService.prototype.logout = function logout(){
		var self = this;
		var deferred = $q.defer();
		
		OAuth.revokeToken().then(function(){
			deferred.resolve();
		});
		
		return deferred.promise; 
	}
	
	UserService.prototype.refresh = function refresh(){
		var self = this;
    	var deferred = $q.defer();
		OAuth.getRefreshToken().then(function success(response){
			OAuth.user = response.data;
			deferred.resolve();
		}, function error(response){
			deferred.reject();
		});
		
		return deferred.promise; 
	}
	
	UserService.prototype.loadUserDetail = function getUserDetail(){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "USER_GET_USER_DETAIL",
					actionParams : ["hoangnhuocquy@csc.com"]
				}
		).then(function success(response){
			angular.extend(self.userDetail, response.data);
			deferred.resolve(self.userDetail);
		}, function error(response){
			deferred.reject();
		});
		
		return deferred.promise; 
	}
	return new UserService();
});