'use strict';
var problemController = function ($state, $scope, commonService, problemService){
	
	$scope.createProblem = function createProblem(){
		//model binding with ui
		$scope.problem = {};
		
		$('#myModal').modal('show');
	}
	
	$scope.saveProblem = function saveProblem(){
		// model send to server
		var problemData;
		if($scope.problem.id){ // update problem
			
		}else{ //add new problem
			problemData = {
				id : $scope.problem.id,
				name: $scope.problem.name,
				timeLimit: $scope.problem.timeLimit,
				percentToPass : 100
			};
			
		}
		problemService.saveProblem(problemData).then(function success(response){
			
			problemData = response.data;
			
			// prepare problemFile, testCaseInput and testCaseOutput to send to server
			var files = [];
			if($scope.problem.problemFile)
				files.push({name : "problemFile", file : $scope.problem.problemFile});
			
			if($scope.problem.testCaseInput){
				if($scope.problem.testCaseOutput){
					files.push({name : "testCaseInput", file : $scope.problem.testCaseInput});
					files.push({name : "testCaseOutput", file : $scope.problem.testCaseOutput});
				}else{ // error, testcase input and output must exist together.
					alert("Test case input and output must exist together!");
				}
			}else{
				if($scope.problem.testCaseOutput){
					alert("Test case input and output must exist together!");
				}
			}
			
			if(files.length > 0){
				alert("Save Problem success! Continue save file...");
				problemService.upfileProblem(problemData, files).then(function success(){
					alert("Save file success!");
				}, function fail(){
					alert("Save file fail!");
				});
			}else{
				alert("Save Problem success!");
			}
			
		}, function fail(response){
			alert("Save Problem fail!");
		});
		
	}
	
	
	function init(){
		$scope.listProblem = problemService.listProblem;
		
		$scope.pageSize = 10;
		
		//model binding with ui
		$scope.problem = {};
		
		problemService.getListProblem();
	}
	init();
}