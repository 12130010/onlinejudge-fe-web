'use strict';
var contestController = function ($state, $scope, commonService, contestService){
	
	$scope.createContest = function createContest(){
		//model binding with ui
		$scope.contest = {};
		
		$('#myModal').modal('show');
	}
	
	$scope.updateContest = function updatecontest(contestID){
		angular.forEach($scope.listContest, function (contest){
			if(contestID == contest.id){
				$scope.contest = angular.copy(contest, {});
			}
		})
		$('#myModal').modal('show');
	}
	
	$scope.closeForm = function closeForm(){
		$('#myModal').modal('hide');
		contestService.getListContest();
	}
	
	$scope.saveContest = function saveContest(){
		// model send to server
		var contestData;
		if($scope.contest.id){ // update contest
			contestData = $scope.contest;
		}else{ //aDD new contest
			contestData = {
				shortName : $scope.contest.shortName,
				longName: $scope.contest.longName,
				description: $scope.contest.description,
				numberMemPerTeam : $scope.contest.numberMemPerTeam,
				selfRegister: $scope.contest.selfRegister,
				startDate: $scope.contest.startDate,
				freezeDate: $scope.contest.freezeDate,
				endDate: $scope.contest.endDate,
			};
			
		}
		contestService.saveContest(contestData).then(function success(response){
			alert("Save contest success!");
		}, function fail(){
			alert("Save contest fail!");
		});
		
	}
	
	$scope.deleteContest = function deleteContest(contestID){
		var contestData ;
		angular.forEach($scope.listContest, function (contest){
			if(contestID == contest.id){
				contestData = contest;
			}
		})
		if (confirm('Are you sure you want to delete contest with name: ' + contestData.name + "?")) {
			contestService.deleteContest(contestData).then(function success(){
				alert("Delete success!")
				contestService.getListContest();
			}, function fail(response){
				alert("Delete fail!")
			});
		}
	}
	
	function init(){
		$scope.listContest = contestService.listContest;
		
		$scope.pageSize = 10;
		
		//model binding with ui
		$scope.contest = {};
		
		contestService.getListContest();
	}
	init();
}