var app = angular.module('Wordly', ['ui.router', 'Wordly.lookups', 'Wordly.services']);

app.config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state('home', {
				url : "/home",
				templateUrl : "/lookups.html",
				controller : "lookups"
			});

			$urlRouterProvider.otherwise('home');

		}
	]);

angular.module('Wordly.lookups', [])
.controller('lookups', function ($scope, $http, $timeout,words) {

	$scope.queryWord = function () {
		words.queryWord($scope.targetWord);
	};

	$timeout(function () {
		words.loadList($scope.currentUser)
    .then(function(response){
      if(response.length>0){
      $scope.currentList=response.map(function(wordEntry){
        return wordEntry.word;
      });
      }else{
      $scope.currentrList=[];  
      }
    });
	});

});

angular.module('Wordly.services', [])
.factory('words', function ($http) {

	var loadList = function (currentUser) {
		return $http(
    {
      method:'POST',
      url:'/list',
      data:JSON.stringify({username:currentUser})
    }).then(function(response){
      return response.data;
    });
	};

	var queryWord = function (word) {
		return $http({
			method : 'POST',
			url : '/query',
			data : JSON.stringify({
				data : word
			})
		});
	};

	return {
    loadList:loadList,
		queryWord : queryWord
	};
});
