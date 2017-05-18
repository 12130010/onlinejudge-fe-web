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