<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
	<head>
		<meta charset="utf-8">
		<title>Online Judge</title>
		<link rel="stylesheet" href="resources/css/bootstrap/bootstrap.css">
		<link rel="stylesheet" href="resources/css/custom/custom.css">
		
		<script src="resources/js/lib/jquery-3.2.0.js"></script>
		<script src="resources/js/lib/angular.js"></script>
		<script src="resources/js/lib/angular-ui-router.js"></script>
		<script src="resources/js/lib/bootstrap.js"></script>
		<script src="resources/js/lib/angular-cookies.js"></script>
		<script src="resources/js/lib/query-string.js"></script>
		<script src="resources/js/lib/angular-oauth2.js"></script>
		<script src="resources/js/lib/angular-breadcrumb.js"></script>
		
	</head> 
	<body ng-app="onlinejudgeApp" ng-controller="mainController">
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
		<div ui-view="header" ></div>
		<div ncy-breadcrumb></div>
		<div ui-view="menu" ></div>
		<div ui-view="main" class="container"></div>
		<div ui-view="footer" ></div>
		
		<script src="resources/js/core/config/config.js"></script>
		<script src="resources/js/core/common/common-core.js"></script>
		<script src="resources/js/core/app.js"></script>
		<script src="resources/js/core/controller/login-ctrl.js"></script>
		<script src="resources/js/core/controller/register-ctrl.js"></script>
		<script src="resources/js/core/service/user-service.js"></script>
	</body>
</html>
