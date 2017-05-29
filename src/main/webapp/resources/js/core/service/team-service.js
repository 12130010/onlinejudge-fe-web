'use strict';
onlinejudgeApp.service('teamService', function($http, $q, $cookies, connectorService) {
	function TeamService(){
		this.teamDetail = {};
		this.listSubmit = [];
	}
	
	TeamService.prototype.getTeamDetail = function getTeamDetail(idContest){
		var self = this;
		var deferred = $q.defer();
		
		connectorService.get(
				{
					actionName: "CONTEST_TEAM_GET_TEAM_DETAIL",
					actionParams : [idContest]
				}
		).then(function success(response){
			angular.extend(self.teamDetail, response.data);
			
			self.getAllSubmit(self.teamDetail);
			
			deferred.resolve(self.teamDetail);
		}, function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise;
	}
	
	TeamService.prototype.getAllSubmit = function getAllSubmit(team){
		var self = this;
		
		//add problem name to submit
		//TODO need to improve
		angular.forEach(team.listProblem, function (problem){
			angular.forEach(problem.listSubmit, function(submit){
				submit.problemName = problem.problemForContest.nameDisplay;
			});
			self.listSubmit.push.apply(self.listSubmit, problem.listSubmit);
		})		
		
		self.listSubmit.splice(0, self.listSubmit.length);
		
		angular.forEach(team.listProblem, function (problem){
			self.listSubmit.push.apply(self.listSubmit, problem.listSubmit);
		});
		
		self.listSubmit.sort(function (submit1, submit2){
			return -(submit1.dateSubmit - submit2.dateSubmit )
		});
	}
	
	return new TeamService();
})