'use strict';
var studentContestController = function ($state, $scope, commonService, contestService){
	function init(){
		$scope.listContestForUser = contestService.listContestForUser;
		
		$scope.pageSize = 10;
		
		contestService.getListContestForUser();
	}
	init();
}
/**
 * 
 */
var studentContestDetailController = function ($state, $scope,$stateParams, commonService, contestService, problemService){
	function init(){
		$scope.contest = contestService.detailContestForUser;
		
		contestService.getContestDetailForUser($stateParams.contestID);
	}
	init();
}
/**
 * 
 */
var studentContestBoardController = function ($state, $scope,$stateParams, commonService, contestService, problemService){
	function init(){
		$scope.contest = contestService.detailContestForUser;
		
		contestService.getContestDetailForUser($stateParams.contestID);
	}
	init();
}

/**
 * 
 */
var studentContestProblemsController = function ($state, $scope,$stateParams, commonService, contestService, problemService, connectorService){
	function init(){
		$scope.contest = contestService.detailContestForUser;
		
		contestService.getContestDetailForUser($stateParams.contestID);
	}
	
	$scope.openProblem = function openProblem(problemForContest){
		var resource = {
			"resourceType" : "problem",
			"fileName" : problemForContest.problem.filePath
		}
		
		connectorService.post(
				{
					actionName: "RESOURCE_GENERATE_TOKEN",
					actionParams : [],
					data: resource
				}
		).then(function success(response){
			 var win = window.open(commonService.getUrl(commonService.urlMap["RESOURCE_GET_RESOURCE"], [response.data.obj.token]), '_blank');
			  win.focus();
		}, function error(response){
			alert("Cannot access server! Please contact admin!");
		});
	}
	
	init();
}