var m1 = angular.module("pro",["ionic"])
m1.config(function($stateProvider){
	$stateProvider.state("aaa",{
		url:"/index",
		templateUrl:"temp/shujia.html",
		controller:"shujia"
	}).state("bbb",{
		url:"/tuijian",
		templateUrl:"temp/tuijian.html",
		controller:"tuijian"
	}).state("ccc",{
		url:"/wode",
		templateUrl:"temp/wode.html",
		controller:"wode"
	}).state("login",{
		url:"/wode/login",
		templateUrl:"temp/login.html",
		controller:"login"
	}).state("register",{
		url:"/wode/register",
		templateUrl:"temp/register.html",
		controller:"register"
	}).state("chapter",{
		url:"/index/chapter/:id",
		templateUrl:"temp/chapter.html",
		controller:"chapter"
	}).state("aaa.shoucang",{
		url:"/index/shoucang",
		templateUrl:"temp/shoucang.html",
		controller:"shoucang"
	}).state("aaa.xiazai",{
		url:"/index/xiazai",
		templateUrl:"temp/xiazai.html",
		controller:"xiazai"
	})
})

m1.controller("demo",function($scope,$state,$http){
	$state.go("aaa")


})

m1.controller("tuijian",["$scope","$state","$http",function($scope,$state,$http){

	$scope.myActiveSlide = 0;
	$scope.datalist = [];
	$scope.doRefresh = function() {
	    $scope.$broadcast('scroll.refreshComplete');
	};
	$scope.datalist2 = [];
	$http({
		method:"get",
		url:"mock.json"
	}).success(function(data){
		console.log(data)
		for(var i = 0;i<data.length;i++){
		 	$scope.datalist.push(data[i])
		}
	}).error(function(erro){
		console.log(erro)
	})
	
	$scope.getDetail = function(data){
		localStorage.setItem("detail",data)
		console.log(data)
	}
}])

m1.controller("wode",["$scope","$state","$http",function($scope,$state,$http){
	$scope.clickLogin = function(){
		$state.go("login")
	}
}])

m1.controller("login",function($scope,$state,$http){
	$scope.fanhui=function(){
		window.history.back()
	}
	$scope.toRegister=function(){
		$state.go("register")
	}
	$scope.data = {}
	$scope.login = function(){
		var username = $scope.data.username,
			psw = $scope.data.psw
		if(username == ""){
			alert("请输入用户名")
		}else{
			if(psw == ''){
				alert("请输入密码")
			}else{
				$http({
					method:"post",
					url:"http://stuapi.ysd3g.com/api/login",
					params:{un:username,pwd:psw,token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"},
				}).success(function(data){
					console.log(data)
					var data = angular.fromJson(data)
					console.log(data)
					if(data.success==true){
						alert("登录成功")
						$state.go("ccc")
					}else{
						alert("登录失败")
					}
				})
			}
		}
	}
})

m1.controller("register",function($scope,$state,$http){
	$scope.data={}
	$scope.fanhui=function(){
		window.history.back()
	}
	$scope.register=function(){
		console.log($scope.data.psw)
		if($scope.data.username == undefined){
			alert("请输入用户名")
		}else if($scope.data.psw == undefined){
			alert("请输入密码")
		}else{
			$http({
				method:"POST",
				url:"http://stuapi.ysd3g.com/api/CreateUser",
				params:{loginName:$scope.data.username,pwd:$scope.data.psw,token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"}
			}).success(function(data){
				console.log(data)
				var data2 = angular.fromJson(data)
				console.log(data2.success)
				if(data2.success==true){
					alert('注册成功')
					$state.go("login")
//					location="login.html"
				}else{
					alert("注册失败")
				}
			})
		}
		
	}
		
})
m1.controller("chapter",function($scope,$stateParams,$http){
	$scope.fanhui=function(){
		window.history.back()
	}
	$http({
		method:"get",
		url:"mock.json"
	}).success(function(data){
		console.log(data)
		for(var i = 0;i<data.length;i++){
		 	console.log(data[i].dataImg)
		 	$scope.datalist2 = data[i].dataImg
		 	for(var j = 0;j<data[i].dataImg.length;j++){
		 		if($stateParams.id == data[i].dataImg[j].id){
		 			$scope.datalist = data[i].dataImg[j].detail
		 			break;
		 		}
		 	}
		}
		
		console.log($scope.datalist)
		
	})
	$scope.startRead = function(){
		
	}
	$scope.shoucang = function(){
		
		var arr = localStorage.getItem("id")?JSON.parse(localStorage.getItem("id")):[]
		if(arr.indexOf($stateParams.id)==-1){
			arr.push($stateParams.id)
		}
		alert("收藏成功")
//		localStorage.setItem("id",$stateParams.id)
		localStorage.setItem("id",JSON.stringify(arr))
		
		console.log(localStorage.getItem("id"))
		
		
	}
})
m1.controller("shujia",function($scope,$stateParams,$http,$state){
	$scope.doRefresh = function() {
	    $scope.$broadcast('scroll.refreshComplete');
	};
	$state.go("aaa.shoucang")
	$scope.m1 = true;
	$scope.m2 = false;
	$scope.m3 = false;
	$scope.shoucang=function(){
		$state.go("aaa.shoucang")
		$scope.m1 = true;
		$scope.m2 = false;
		$scope.m3 = false;
	}
	$scope.xiazai=function(){
		$state.go("aaa.xiazai")
		$scope.m1 = false;
		$scope.m2 = true;
		$scope.m3 = false;
	}
	$scope.lishi=function(){
//		$state.go("aaa.shoucang")
		$scope.m1 = false;
		$scope.m2 = false;
		$scope.m3 = true;
	}
	
})
m1.controller("shoucang",function($scope,$stateParams,$http,$state){
	$scope.doRefresh = function() {
	    $scope.$broadcast('scroll.refreshComplete');
	};
	var shoucang = JSON.parse(localStorage.getItem("id"))
	console.log(shoucang)
	$scope.datalist = [];
	$http({
		method:"get",
		url:"mock.json"
	}).success(function(data){
		for(var i = 0;i<data.length;i++){
		 	console.log(data[i].dataImg)
		 	for(var j = 0;j<data[i].dataImg.length;j++){
		 		for(var k=0;k<shoucang.length;k++){
		 			if(shoucang[k] == data[i].dataImg[j].id){
			 			$scope.datalist.push(data[i].dataImg[j])
			 		}
		 		}
		 		
		 	}
		}
		
	})
	
})
m1.controller("xiazai",function($scope,$stateParams,$http,$state){
	
})