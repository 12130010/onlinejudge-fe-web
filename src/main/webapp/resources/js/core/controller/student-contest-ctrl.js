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
var studentContestProblemsController = function ($state, $scope,$stateParams, commonService, contestService, problemService, userService, connectorService){
	function init(){
		$scope.contest = contestService.detailContestForUser;
		$scope.submit = {};
		
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
	
	
	/**
	 * idContest: manual get
	 * file: binding with UI
	 * idProblemForTeam: binding with UI
	 * idTeam: manual get
	 */
	$scope.submitProblem = function submitProblem(){
		
		var files = [];
		
		files.push({name:"file", file : $scope.submit.file});
		files.push({name:"idContest", file : $scope.contest.id});
		files.push({name:"idTeam", file : findTeamIdByEmailUserLogin()});
		files.push({name:"idProblemForTeam", file :  $scope.submit.idProblemForTeam});
		
		connectorService.postResource(
				{
					actionName: "JUDGE_SUBMIT_PROBLEM",
					actionParams : [],
					data: files
				}
		).then(function success(response){
			alert(response.data.status);
			contestService.getContestDetailForUser($stateParams.contestID, true);
			
		}, function fail(response){
			alert("Error. Please contact admin");
		})
	}
	
	function findTeamIdByEmailUserLogin(){
		var idUser = userService.userDetail.id;
		var idTeam;
		angular.forEach(contestService.detailContestForUser.listTeam, function(team){
			angular.forEach(team.listMember, function (user){
				if(user.id == idUser ){
					idTeam = team.id;
				}
			})
		});
		return idTeam;
	}
	
	init();
}