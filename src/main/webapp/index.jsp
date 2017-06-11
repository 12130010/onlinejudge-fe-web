<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
	<head>
		<meta charset="utf-8">
		<title>Online Judge</title>
		<link rel="stylesheet" href="resources/css/bootstrap/bootstrap.css">
		<link rel="stylesheet" href="resources/css/custom/custom.css">
		<link rel="stylesheet" href="resources/css/custom/form.css">
		<link rel="stylesheet" href="resources/css/angular/angular-material.css">
		
		<script src="resources/js/lib/jquery-3.2.0.js"></script>
		<script src="resources/js/lib/jquery.mask.js"></script>
		<script src="resources/js/lib/moment.min.js"></script>
		<script src="resources/js/lib/angular.js"></script>
		<script src="resources/js/lib/angular-material.js"></script>
		<script src="resources/js/lib/angular-ui-router.js"></script>
		<script src="resources/js/lib/bootstrap.js"></script>
		<script src="resources/js/lib/angular-cookies.js"></script>
		<script src="resources/js/lib/query-string.js"></script>
		<script src="resources/js/lib/angular-oauth2.js"></script>
		<script src="resources/js/lib/angular-breadcrumb.js"></script>
		<script src="resources/js/lib/dirPagination.js"></script>
		<script src="resources/js/lib/angular-aria.js"></script>
		<script src="resources/js/lib/angular-animate.js"></script>
		<script src="resources/js/lib/angular-messages.js"></script>
		<script src="resources/js/lib/angular-translate.js"></script>
		<script src="resources/js/lib/angular-translate-loader-partial.js"></script>
	
		
	</head> 
	<body ng-app="onlinejudgeApp" ng-controller="mainController" id="onlinejudgeApp">
		<div id="ipos-full-loading" class="ipos_popup_overlay" style="
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    top: 0;
	    bottom: 0;
	    background-color: #252533;
	    z-index: 10000;
	    opacity: 0.7;
	    left: 0;
	    display: none;
	    min-width: 100%;
		">	<div style="position: fixed; top: 85px; z-index: 999; width: 100%">
				<div class="row" style="text-align: center;">
					<img src="resources/images/loading_ten.gif"/>
				</div>
			</div>
		</div>
		<div class="container">
			<nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Online Judge</a>
			    </div>
			    <div ui-view="menu" ></div>
			    <ul class="nav navbar-nav navbar-right" ng-if="!isAuthenticated()">
			      <li><a ui-sref="register"><span class="glyphicon glyphicon-user"></span> {{'signup' | translate}}</a></li>
			      <li><a ui-sref="login"><span class="glyphicon glyphicon-log-in"></span> {{'login' | translate}}</a></li>
			    </ul>
			    <div ng-if="isAuthenticated()">
				    <ul class="nav navbar-nav navbar-right" >
				      <li><a><span class="glyphicon glyphicon-user"></span> {{'hello' | translate}} {{userDetail.displayName}}</a></li>
				      <li><a ng-click="logout()" style="cursor: pointer;"><span class="glyphicon glyphicon-log-in"></span> {{ 'logout' | translate}}</a></li>
				    </ul>
			    </div>
			  </div>
			</nav>
			<div id="ctl00_Header1_ucLogout_dLog" class="logout" style="text-align: right;margin-bottom:0px;">
			    <img src="resources/images/US.gif" alt="English" ng-click="changeLanguage('en')" id="imgUS" title="English" style="height: 20px;cursor: pointer;">
			    <img src="resources/images/VI.gif" alt="Vietnamese" ng-click="changeLanguage('vi')" id="imgVi" title="Vietnamese" style="height: 20px;cursor: pointer;">
			</div>
			<div ncy-breadcrumb></div>
			<div ui-view="main" class="container"></div>
			<div ui-view="footer" ></div>
		</div>
		
		<script src="resources/js/core/config/config.js"></script>
		<script src="resources/js/core/common/common-core.js"></script>
		<script src="resources/js/core/common/common-directive.js"></script>
		<script src="resources/js/core/app.js"></script>
		<script src="resources/js/core/controller/login-ctrl.js"></script>
		<script src="resources/js/core/controller/register-ctrl.js"></script>
		<script src="resources/js/core/controller/problem-ctrl.js"></script>
		<script src="resources/js/core/controller/contest-ctrl.js"></script>
		<script src="resources/js/core/controller/student-contest-ctrl.js"></script>
		<script src="resources/js/core/service/user-service.js"></script>
		<script src="resources/js/core/service/problem-service.js"></script>
		<script src="resources/js/core/service/contest-service.js"></script>
		<script src="resources/js/core/service/team-service.js"></script>
	</body>
</html>
