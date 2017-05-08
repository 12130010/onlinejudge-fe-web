'use strict';
var contestController = function ($state, $scope, commonService, contestService, problemService){
	/*
	 *---------- Contest ------------- 
	 */
	$scope.createContest = function createContest(){
		//model binding with ui
		$scope.contest = {};
		
		$('#modalAddContest').modal('show');
	}
	
	$scope.updateContest = function updatecontest(contestID){
		
		$scope.contest = angular.copy(findContestById(contestID), {});
		
		$('#modalAddContest').modal('show');
	}
	
	$scope.closeForm = function closeForm(){
		$('#modalAddContest').modal('hide');
		$('#modalAddTeam').modal('hide');
		$('#modalAddProblemForContest').modal('hide');
		contestService.getListContest();
	}
	
	$scope.saveContest = function saveContest(){
		// model send to server
		var contestData;
		if($scope.contest.id){ // update contest
			contestData = $scope.contest;
		}else{ //add new contest
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
			$scope.closeForm();
		}, function fail(){
			alert("Save contest fail!");
		});
		
	}
	
	//TODO API to delete Contest
	$scope.deleteContest = function deleteContest(contestID){
		var contestData = findContestById(contestID);
		if (confirm('Are you sure you want to delete contest with name: ' + contestData.shortName + " - " + contestData.longName + "?")) {
			contestService.deleteContest(contestData).then(function success(){
				alert("Delete success!")
				contestService.getListContest();
			}, function fail(response){
				alert("Delete fail!")
			});
		}
	}
	
	/*
	 *---------- End Contest ------------- 
	 */
	
	/*
	 *---------- Team ------------- 
	 */
	
	$scope.createTeam = function createTeam(contestID){
		$scope.contestIDSelected = contestID;
		$scope.contestSelected = findContestById(contestID);
		
		//model binding with ui
		$scope.team = {
			name : "",
			listMember : []
		};
		
		$scope.emailOfMember = "@gmail.com";
		
		$('#modalAddTeam').modal('show');
	}
	
	$scope.addMember = function addMember(){
		$scope.team.listMember.push({email : $scope.emailOfMember});
		$scope.emailOfMember = "";
	}
	
	$scope.deleteMember = function deleteMember(email){
		var index = -1;
		for(var i = 0; i <$scope.team.listMember.length; i++){
			if($scope.team.listMember[i].email == email){
				index = i;
			}
		}
		$scope.team.listMember.splice(index,1);
	}
	
	$scope.addTeam = function addTeam(){
		contestService.addTeamToContest($scope.contestIDSelected, $scope.team).then(function success(){
			alert("Add team success!");
			$scope.closeForm();
		}, function fail(){
			alert("Add team fail!");
		});
	}
	
	
	/*
	 * ---------------- Problem ----------------
	 */
	
	// problemForContestModel model
	var problemForContestModel = {
			problem: {
				id:""
			},
			index: 0,
			color: "",
			score: 0,
			nameDisplay: "",
	};

	$scope.createProblemForContest = function createProblemForContest(contestID){
		$scope.contestIDSelected = contestID;
		$scope.contestSelected = findContestById(contestID);
		
		
		$scope.problemForContest = angular.copy(problemForContestModel, {});
		
		//problem was selected by tag select
		$scope.problemSelected = undefined;
		
		$('#modalAddProblemForContest').modal('show');
		
		$scope.listProblem = problemService.listProblem;
		problemService.getListProblem();
		
		$scope.listProblemForContest = [];
		
		// use for update ProblemForContest
		$scope.isEditing = false;
	}
	
	$scope.addNewProblemForContest = function addNewProblemForContest(){
		//copy problem's id to problemForContest's id
		if($scope.problemSelected == undefined){
			alert("Please choose original problem!");
			return;
		}
		
		$scope.problemForContest.problem = $scope.problemSelected;
		
		// if it is new problem (not editing problem), add to listProblemForContest
		if(!$scope.isEditing)
			$scope.listProblemForContest.push($scope.problemForContest);
		
		
		//create new model
		$scope.problemForContest = angular.copy(problemForContestModel, {});
		$scope.isEditing = false;
		
		//problem was selected by tag select
		$scope.problemSelected = undefined;
	}
	
	$scope.removeProblemForContest = function removeProblemForContest(index){
		var problemForContest = $scope.listProblemForContest[index];
		if (confirm('Are you sure you want to delete problem with name: ' + problemForContest.nameDislay + "?")) {
			$scope.listProblemForContest.splice(index, 1);
		}
	}
	
	$scope.editProblemForContest = function editProblemForContest(index){
		$scope.problemForContest = $scope.listProblemForContest[index];
		$scope.isEditing = true;
	}
	
	/*
	 * Common function
	 */
	
	function findContestById(contestID){
		var contestData;
		angular.forEach($scope.listContest, function (contest){
			if(contestID == contest.id){
				contestData = contest;
			}
		})
		return contestData;
	}
	function init(){
		$scope.listContest = contestService.listContest;
		
		$scope.pageSize = 10;
		
		contestService.getListContest();
	}
	init();
};
