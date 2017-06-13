'use strict';
var problemController = function ($state, $scope, commonService, connectorService, problemService){
	
	$scope.createProblem = function createProblem(){
		//model binding with ui
		$scope.problem = {};
		
		$('#myModal').modal('show');
	}
	
	$scope.updateProblem = function updateProblem(problemID){
		angular.forEach($scope.listProblem, function (problem){
			if(problemID == problem.id){
				$scope.problem = angular.copy(problem, {});
			}
		})
		
		$('#myModal').modal('show');
	}
	
	$scope.closeForm = function closeForm(){
		$('#myModal').modal('hide');
		problemService.getListProblem();
	}
	
	$scope.saveProblem = function saveProblem(){
		// model send to server
		var problemData;
		if($scope.problem.id){ // update problem
			problemData = $scope.problem;
		}else{ //add new problem
			problemData = {
				id : $scope.problem.id,
				name: $scope.problem.name,
				timeLimit: $scope.problem.timeLimit,
				percentToPass : 100
			};
			
		}
		//step 1: save problem information except resource file.
		problemService.saveProblem(problemData).then(function success(response){
			
			problemData = response.data;
			
			//step 2: prepare resource file to send to server
			
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
	
	$scope.deleteProblem = function deleteProblem(problemID){
		var problemData ;
		angular.forEach($scope.listProblem, function (problem){
			if(problemID == problem.id){
				problemData = problem;
			}
		})
		if (confirm('Are you sure you want to delete problem with name: ' + problemData.name + "?")) {
			problemService.deleteProblem(problemData).then(function success(){
				alert("Delete success!")
				problemService.getListProblem();
			}, function fail(response){
				alert("Delete fail!")
			});
		}
	}
	
	$scope.openProblem = function openProblem(problem){
		var resource = {
			"resourceType" : "problem",
			"fileName" : problem.filePath
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
	
	function init(){
		$scope.listProblem = problemService.listProblem;
		
		$scope.pageSize = 10;
		
		//model binding with ui
		$scope.problem = {};
		
		problemService.getListProblem();
	}
	init();
}