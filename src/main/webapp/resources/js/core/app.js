/*
 * //*******************************************************************************
 * // * Online Judge - Hiep Le
 * // ******************************************************************************
 */
'use strict';

var onlinejudgeApp = angular.module('onlinejudgeApp', 
							[
							  'ui.router',
							  'ui.router.state',
							  'angular-oauth2',
							  'ngCookies',
							  'ncy-angular-breadcrumb',
							  'commonModule',
							  'angularUtils.directives.dirPagination'
							]);
onlinejudgeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main@': {
					templateUrl: 'views/home.html',
				},
				'menu@': {
					templateUrl: 'views/normal-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Home'
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'main@': {
					templateUrl: 'views/login.html',
					controller: loginController
				},
				'menu@': {
					templateUrl: 'views/normal-menu.html'
				}
			},
			ncyBreadcrumb: {
			    label: 'Login'
			}
		})
		.state('register', {
			url: '/register',
			views: {
				'main@': {
					templateUrl: 'views/register.html',
					controller: registerController
				},
				'menu@': {
					templateUrl: 'views/normal-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Register'
			}
		})
		.state('management', {
			url: '/management',
			views: {
				'main@': {
					templateUrl: 'views/management.html'
				},
				'menu@': {
					templateUrl: 'views/management-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Management'
			}
		})
		.state('management.problems', {
			url: '/problems',
			views: {
				'main@': {
					templateUrl: 'views/management-problems.html',
					controller: problemController
				},
				'menu@': {
					templateUrl: 'views/management-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Problems'
			}
		})
	}
])
.config(['OAuthProvider', function(OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: 'http://localhost:4000/onlinejudge-ifa-oauth',
      clientId: 'browser',
      scope : 'ui',
      Authorization:'Basic YnJvd3Nlcjo=',
      grant_type : 'password',
      grantPath: '/oauth/token',
      revokePath: '/oauth/token/revoke'
    });
 }])
 .config(['OAuthTokenProvider', function(OAuthTokenProvider ) {
	 var now = new Date();
	 OAuthTokenProvider.configure({
		 options: {
			 expires :  new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
		 }
	 });
 }])
.run(['$rootScope', '$window', 'OAuth', '$state', function($rootScope, $window, OAuth, $state) {
	
    $rootScope.$on('oauth:error', function(event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
    	 alert("Token is expire! Please try again with new token.");
        return OAuth.getRefreshToken();
      }

      // Redirect to `/login` with the `error_reason`.
      $state.go("login");
    });
 }])
 .controller('mainController', function($rootScope, $state, userService) {
	 
	 $rootScope.userDetail = userService.userDetail;
	 
	 var loaddingBarCounter = 0;
	 
	 $rootScope.logout = function logout(){
		 userService.logout().then(function success(){
			 $state.go("login");
		 });
	 }
	 
	 $rootScope.isAuthenticated = function isAuthenticated(){
		return userService.isAuthenticated();
	 }
	 
	 
	 function init(){
		 if(userService.isAuthenticated()){
			 userService.loadUserDetail();
		 }
	 }
	 
	 init();
});