'use strict';
onlinejudgeApp.service('contestService', function($http, $q, $cookies, connectorService) {
	function ContestService(){
		this.listContest = [];
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
	return new ContestService();
});