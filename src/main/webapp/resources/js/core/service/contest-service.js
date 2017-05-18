'use strict';
onlinejudgeApp.service('contestService', function($http, $q, $cookies, connectorService) {
	function ContestService(){
		this.listContest = [];
		this.listContestForUser = [];
		this.detailContestForUser = {};
	}
	
	ContestService.prototype.getListContest = function getListContest(){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "CONTEST_GET_ALL_CONTEST",
					actionParams : []
				}
		).then(function success(response){
			// clear all element in current listProblem
			self.listContest.splice(0, self.listContest.length);
			
			//add new element to current listProblem
			angular.forEach(response.data, function(value, key) {
				  self.listContest.push(value);
			});
			
			deferred.resolve(self.listContest);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	
	ContestService.prototype.saveContest = function saveContest(contest){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_ADD_CONTEST",
					actionParams : [],
					data: contest
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	ContestService.prototype.addTeamToContest = function addTeamToContest(contestID, team){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_ADD_TEAM_CONTEST",
					actionParams : [contestID],
					data: team
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		return deferred.promise;

	}
	ContestService.prototype.deleteTeamInContest = function deleteTeamInContest(contestID, teamID){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_DELETE_TEAM_CONTEST",
					actionParams : [contestID, teamID]
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		return deferred.promise;
		
	}
	
	
	ContestService.prototype.updateProblemToContest = function updateProblemToContest(contestID, problems){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_UPDATE_PROBLEM_CONTEST",
					actionParams : [contestID],
					data: problems
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		return deferred.promise;
		
	}
	
	ContestService.prototype.deleteContest = function deleteContest(contestID){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_DELETE_CONTEST",
					actionParams : [contestID],
					data: ""
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function error(response){
			deferred.reject(response);
		});
		return deferred.promise;
	}
	
	
	/**
	 * For end user
	 */
	ContestService.prototype.getListContestForUser = function getListContestForUser(){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "CONTEST_USER_GET_ALL_CONTEST",
					actionParams : []
				}
		).then(function success(response){
			// clear all element in current listProblem
			self.listContestForUser.splice(0, self.listContestForUser.length);
			
			//add new element to current listProblem
			angular.forEach(response.data, function(value, key) {
				  self.listContestForUser.push(value);
			});
			
			deferred.resolve(self.listContestForUser);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	
	ContestService.prototype.getContestDetailForUser = function getContestDetailForUser(contestID){
		var self = this;
		var deferred = $q.defer();
		
		if(self.detailContestForUser.id != contestID){
			connectorService.get(
					{
						actionName: "CONTEST_USER_GET_DETAIL_CONTEST",
						actionParams : [contestID]
					}
			).then(function success(response){
				angular.extend(self.detailContestForUser, response.data);
				deferred.resolve(self.detailContestForUser);
			}, function error(response){
				deferred.reject(response);
			});
		}else{
			deferred.resolve(self.detailContestForUser);
		}
		
		return deferred.promise;
	}
	
	return new ContestService();
});