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
							  'angularUtils.directives.dirPagination',
							  'ngMaterial'
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
		.state('student', {
			url: '/student',
			views: {
				'main@': {
					templateUrl: 'views/student.html',
					controller: studentContestController
				},
				'menu@': {
					templateUrl: 'views/normal-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Student'
			}
		})
		.state('student.contest', {
			url: '/contest/:contestID',
			views: {
				'main@': {
					templateUrl: 'views/student-contest.html',
					controller: studentContestDetailController
				},
				'menu@': {
					templateUrl: 'views/student-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Contest {{contest.shortName}}'
			}
		})
		.state('student.contest.problems', {
			url: '/problems',
			views: {
				'main@': {
					templateUrl: 'views/student-problems.html',
					controller: studentContestProblemsController
				},
				'menu@': {
					templateUrl: 'views/student-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Problems'
			}
		})
		.state('student.contest.board', {
			url: '/board',
			views: {
				'main@': {
					templateUrl: 'views/student-board.html',
					controller: studentContestBoardController
				},
				'menu@': {
					templateUrl: 'views/student-menu.html'
				},
				'footer@': {
					templateUrl: 'views/footer.html',
					controller: studentContestProblemsController
				}
			},
			ncyBreadcrumb: {
				label: 'Score board'
			}
		})
		.state('student.contest.submits', {
			url: '/submits',
			views: {
				'main@': {
					templateUrl: 'views/student-submits.html',
					controller: studentContestSubmitsController
				},
				'menu@': {
					templateUrl: 'views/student-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Score board'
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
		.state('management.contests', {
			url: '/contests',
			views: {
				'main@': {
					templateUrl: 'views/management-contests.html',
					controller: contestController
				},
				'menu@': {
					templateUrl: 'views/management-menu.html'
				}
			},
			ncyBreadcrumb: {
				label: 'Contest'
			}
		})
	}
])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://localhost:8180/chatboxapp/**'
  ]);

  $sceDelegateProvider.resourceUrlBlacklist([
  ]);
})
.config(['OAuthProvider', function(OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: baseURL + 'onlinejudge-ifa-oauth',
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