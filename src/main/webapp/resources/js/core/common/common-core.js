
'use strict';


var commonModule = angular.module('commonModule', [])
.provider('commonService', function (){
	this.urlMap = {
			"USER_GET_USER_DETAIL" : {
				"baseUrl" : "onlinejudge-ms-user/users?email={0}",
				"params" : ["email"]
			},
			"USER_CREATE_NEW_USER" : {
				"baseUrl" : "onlinejudge-ms-user/users",
				"params" : []
			},
			"CONTEST_GET_ALL_PROBLEM" : {
				"baseUrl" : "onlinejudge-ms-contest/problems",
				"params" : []
			},
			"CONTEST_SAVE_PROBLEM" : {
				"baseUrl" : "onlinejudge-ms-contest/problems",
				"params" : []
			},
			"CONTEST_SAVE_FILE_OF_PROBLEM" : {
				"baseUrl" : "onlinejudge-ms-contest/problems/upfile",
				"params" : []
			},
			"CONTEST_DELETE_PROBLEM" : {
				"baseUrl" : "onlinejudge-ms-contest/problems/delete",
				"params" : []
			}
			
			
	}
	
	this.CONSTANTS = {
			
	}
	
	this.$get = function() {
		return new CommonService(this.urlMap, this.CONSTANTS);
	};
	
	function CommonService(urlMap, constants) {
		this.CONSTANTS = constants;
		this.urlMap = urlMap;
		this.baseURL = baseURL //global variable
	};
	
	CommonService.prototype.getUrl = (function(){

		/**
		 * Replace parameter such as {0}, {1}, {2},.. in request url
		 * @param  {string} 	input 		input url
		 * @param  {array} 		params 		array of string which will replace curly params
		 * @param  {boolean} 	keepParams 	if true, will return the input, otherwise ''
		 * @return {string}		the modified input
		 */
		function replaceUrlParams(input, params, keepParams) {
			var result;
			var index = input.match(/\d+(?=\})/g);

			// there is no {\d} in input, we'll keep it
			if (index === null){
				result = input;	
			}else{
				if (CommonService.prototype.hasValueNotEmpty(params[index])) {
					result = input.replace(/\{\d+\}/g, params[index]);
				} else 
					result = keepParams ? input : '';	
			}
			
			return result;
		}

		/**
		 * append arrayOfParams to urlElement
		 * @param  {string} 	urlElement 		the name of url need to be create
		 * @param  {array} 		arrayOfParams 	of string which will replace curly params
		 * @return {string}		the url with parameters
		 */
		return function(urlElement, arrayOfParams) {
			var baseUrl = urlElement.baseUrl;
			var idx = baseUrl.indexOf('?'); 
			var url;//baseUrl before '?'
			var params = [];//list of params in baseUrl after '?'
			var i = 0;
			//map params to url
			if (this.hasValue(baseUrl) && this.hasValue(arrayOfParams)) {

				if (idx < 0){
					url = baseUrl;
					params = [];
				}
				else{
					url =  baseUrl.substr(0, idx);
					params = baseUrl.substr(idx + 1, baseUrl.length-1).split('&');
				}

				//process url
				url = url.replace(/\{\d+\}/g, function(substr){
					return replaceUrlParams(substr, arrayOfParams, true);
				})

				//process parameters in url
				if (params){
					params = params.map(function(param){
						return replaceUrlParams(param, arrayOfParams, false);
					});
				}
				params = params.filter(function(n){return n!="";});

				return this.baseURL +  (params.length > 0 ? url + '?' + params.join('&') : url );
			}
			else
				return urlElement;
		}
	})();
	
	// Utilities function
	/**
	 * @param variable
	 * @returns {Boolean} Note: if variable is an empty string (""), it still return true; 
	 */
	CommonService.prototype.hasValue = function (variable){
		return (typeof variable !== 'undefined') && (variable !== null);
	};
	CommonService.prototype.hasValueNotEmpty = function (variable){
		return (typeof variable !== 'undefined') && (variable !== null) && (variable.length !== 0);
	};
	
	CommonService.prototype.parseInt = function (str){
		var result = parseInt(str);
		if(result.toString() == "NaN")
			result = 0;
		return result;
	};
	
	/**
	 * Copy attributes values from des to src
	 * @param  {Object} src the object have attribute values need to copy to {@code des}
	 * @param  {Object} des the object have attribute values will be updated by {@code src}
	 */
	CommonService.prototype.copyValueFromOther = function copyValueFromOther (src, des) {
		for (var k in src) {
			if(angular.isObject(src[k])){
				this.copyValueFromOther(src[k], des[k]);
			}else
				des[k] = src[k];
		};
	}
})
.service('connectorService', ['$q', '$http', '$log', 'commonService', function($q, $http, $log, commonService) {
		function ConnectorService() {
			this.loadingBarCounter = 0;
		}
		
		/**
		 * Main function, which call the underline connector
		 * @param 	{object}		params 					input for executing actions, which has properties:
		 * @param 	{string}		params.actionName 		the action which connector need to execute
		 * @param 	{array}			params.actionParams 	array of actionParams
		 * @param 	{object}		params.data 			data send for post action (optional)
		 * @return an Angular Promise instance
		 */
		ConnectorService.prototype.get = function get(param){
			var self = this;
			var deferred = $q.defer();
			
			$log.debug("Call with actionName: " + param.actionName + ", and actionParams: " + param.actionParams);
			self.showLoadingBar();
			$http.get(commonService.getUrl(commonService.urlMap[param.actionName], param.actionParams)).then(function success(response){
				$log.debug(response);
				deferred.resolve(response);
				self.hideLoadingBar();
			}, function fail(response){
				$log.debug(response);
				self.hideLoadingBar();
				deferred.reject(response);
			});
			
			return deferred.promise;
		}
		
		/**
		 * Main function, which call the underline connector
		 * @param 	{object}		params 					input for executing actions, which has properties:
		 * @param 	{string}		params.actionName 		the action which connector need to execute
		 * @param 	{array}			params.actionParams 	array of actionParams
		 * @param 	{object}		params.data 			data send for post action (optional)
		 * @return an Angular Promise instance
		 */
		ConnectorService.prototype.post = function post(param){
			var self = this;
			var deferred = $q.defer();
			
			$log.debug("Call with actionName: " + param.actionName + ", and actionParams: " + param.actionParams);
			$log.debug(param.data);
			
			self.showLoadingBar();
			$http.post(commonService.getUrl(commonService.urlMap[param.actionName], param.actionParams), param.data).then( function success( response ){
				$log.debug(response);
				self.hideLoadingBar();
				deferred.resolve(response);
			}, function fail(response){
				$log.debug(response);
				self.hideLoadingBar();
				deferred.reject(response);
			});
			
			return deferred.promise;
		}
		/**
		 * Main function, which call the underline connector
		 * @param 	{object}		params 					input for executing actions, which has properties:
		 * @param 	{string}		params.actionName 		the action which connector need to execute
		 * @param 	{array}			params.actionParams 	array of actionParams
		 * @param 	{object}		params.data 			array of file, file is {name: "testCaseInput", file: file}
		 * @return an Angular Promise instance
		 */
		ConnectorService.prototype.postResource = function postResource(param){
			var self = this;
			var deferred = $q.defer();
			
			$log.debug("Call with actionName: " + param.actionName + ", and actionParams: " + param.actionParams);
			$log.debug(param.data);
			
			 var formData = new FormData();
			 angular.forEach(param.data, function (value){
				 /*
				  * value : {name: "testCaseInput", file: file}
				  */
				formData.append(value.name, value.file); 
			 });
			
			self.showLoadingBar();
			$http.post(commonService.getUrl(commonService.urlMap[param.actionName], param.actionParams),
						formData, //file
						{ //config
							transformRequest: angular.identity,
				            headers: {'Content-Type': undefined}
						} 
					).then( function success( response ){
						$log.debug(response);
						self.hideLoadingBar();
						deferred.resolve(response);
					}, function fail(response){
						$log.debug(response);
						self.hideLoadingBar();
						deferred.reject(response);
					});
			
			return deferred.promise;
		}
		
		ConnectorService.prototype.showLoadingBar = function showLoadingBar(){
			this.loadingBarCounter++;
			$("#ipos-full-loading").css("display", "block");
		}
		
		ConnectorService.prototype.hideLoadingBar = function hideLoadingBar(){
			this.loadingBarCounter--;
			if(this.loadingBarCounter <= 0){
				 $("#ipos-full-loading").css("display", "none");
				 this.loaddingBarCounter = 0;
			 }
		}
		 
		return new ConnectorService();
	}
])
