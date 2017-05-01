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
			
//			//add new element to current listProblem
//			angular.forEach(response.data, function(value, key) {
//				  self.listProblem.push(value);
//			});
			
			//test
			var i = 1;
			
			angular.forEach(response.data, function(value, key) {
				 var obj = angular.copy(value, {});
				 obj.id = i++;
				  self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			angular.forEach(response.data, function(value, key) {
				var obj = angular.copy(value, {});
				obj.id = i++;
				self.listProblem.push(obj);
			});
			
			
			deferred.resolve(self.listProblem);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	
	return new ProblemService();
});