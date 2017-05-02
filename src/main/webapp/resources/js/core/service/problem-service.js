'use strict';
onlinejudgeApp.service('problemService', function($http, $q, $cookies, connectorService) {
	function ProblemService(){
		this.listProblem = [];
	}
	
	ProblemService.prototype.getListProblem = function getListProblem(){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "CONTEST_GET_ALL_PROBLEM",
					actionParams : []
				}
		).then(function success(response){
			// clear all element in current listProblem
			self.listProblem.splice(0, self.listProblem.length);
			
			//add new element to current listProblem
			angular.forEach(response.data, function(value, key) {
				  self.listProblem.push(value);
			});
			
			deferred.resolve(self.listProblem);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	
	ProblemService.prototype.saveProblem = function saveProblem(problem){
		var self = this;
		var deferred = $q.defer();
		connectorService.post(
				{
					actionName: "CONTEST_SAVE_PROBLEM",
					actionParams : [],
					data: problem
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function fail(response){
			deferred.reject(response);
		})
		return deferred.promise;
	}
	
	/**
	 * problem : problemData
	 * files: array of file. file = {name : "testCaseInput", file : file}
	 */
	ProblemService.prototype.upfileProblem = function upfileProblem(problem, files){
		var self = this;
		var deferred = $q.defer();
		
		files.push({name: "idProblem", file: problem.id});
		connectorService.postResource(
				{
					actionName: "CONTEST_SAVE_FILE_OF_PROBLEM",
					actionParams : [],
					data: files
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function fail(response){
			deferred.reject(response);
		})
		return deferred.promise;
	}
	
	ProblemService.prototype.deleteProblem = function deleteProblem(problem){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.post(
				{
					actionName: "CONTEST_DELETE_PROBLEM",
					actionParams : [],
					data: problem
				}
		).then(function success(response){
			deferred.resolve(response);
		}, function fail(response){
			deferred.reject(response);
		})
		
		return deferred.promise;
	}
	
	return new ProblemService();
});