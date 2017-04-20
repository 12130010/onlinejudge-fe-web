<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
	<head>
		<meta charset="utf-8">
		<title>Online Judge</title>
		<link rel="stylesheet" href="resources/css/bootstrap/bootstrap.css">
		
		<script src="resources/js/lib/jquery-3.2.0.js"></script>
		<script src="resources/js/lib/angular.js"></script>
		<script src="resources/js/lib/angular-ui-router.js"></script>
		<script src="resources/js/lib/bootstrap.js"></script>
		<script src="resources/js/lib/angular-cookies.js"></script>
		<script src="resources/js/lib/query-string.js"></script>
		<script src="resources/js/lib/angular-oauth2.js"></script>
	</head> 
	<body ng-app="onlinejudgeApp">
		Go to <a ui-sref="login">Login</a>
		or
		<a ui-sref="register">Register</a>
		
		<div ui-view="header" ></div>
		<div ui-view="menu" ></div>
		<div ui-view="main" ></div>
		<div ui-view="footer" ></div>
		
	</body>
	<script src="resources/js/core/app.js"></script>
	<script src="resources/js/core/controller/login-ctrl.js"></script>
</html>
