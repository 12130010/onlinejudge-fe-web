'use strict';
var problemController = function ($state, $scope, commonService, problemService){
	
	function init(){
		$scope.listProblem = problemService.listProblem;
		
		$scope.pageSize = 10;
		
		problemService.getListProblem().then(function success(){
			
		});
	}
	init();
}