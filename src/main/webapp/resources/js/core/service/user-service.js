'use strict';
onlinejudgeApp.service('userService', function($http, $q, OAuth, $cookies, connectorService) {
	function UserService(){
		this.userDetail = {};
		
		var now = new Date();
		
		//config for persist data into cookie
		this.config = {
				name: "userInfo",
				options: {
					expires :  new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
				}
		};
	}
	
	UserService.prototype.isAuthenticated = function isAuthenticated(){
		return OAuth.isAuthenticated();
	}
	
	UserService.prototype.login = function login(user){
		var self = this;
    	var deferred = $q.defer();
    	
		OAuth.getAccessToken(user).then(function success(response){
			//persist user email
			$cookies.putObject(self.config.name, user, self.config.options);
			
			self.loadUserDetailByEmail(user.username).then(function(){
				deferred.resolve();
			}, function fail(){
				deferred.reject();
			});
		}, function error(response){
			deferred.reject(response);
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
	
	//load user have login
	UserService.prototype.loadUserDetail = function loadUserDetail(){
		var user = $cookies.getObject(this.config.name);
		return this.loadUserDetailByEmail(user.username);
	}
	
	UserService.prototype.loadUserDetailByEmail = function loadUserDetailByEmail(email){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "USER_GET_USER_DETAIL",
					actionParams : [email]
				}
		).then(function success(response){
			angular.extend(self.userDetail, response.data);
			deferred.resolve(self.userDetail);
		}, function error(response){
			deferred.reject();
		});
		
		return deferred.promise; 
	}
	
	UserService.prototype.register = function register(user){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "USER_CREATE_NEW_USER",
					actionParams : [],
					data: user
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise; 
	}
	return new UserService();
});