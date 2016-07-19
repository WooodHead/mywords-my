var app = angular.module('myWord', ['ui.router']);

/*
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

$stateProvider
.state('home',{
url:'/home',
templateUrl:'/home.html',
controller:'MainCtrl'
});


$urlRouterProvider.otherwise('home');

}]);
 */

app.controller('MainCtrl', function ($scope, $q, $http) {

	$scope.queryWord = function () {

		if (!$scope.targetWord || $scope.targetWord === "") {
			return;
		}
		$q.all({
			definitionArray : $http.get('http://api.wordnik.com:80/v4/word.json/' + $scope.targetWord + '/definitions?limit=5&includeRelated=true&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'),
			etymology : $http.get('http://api.wordnik.com:80/v4/word.json/' + $scope.targetWord + '/etymologies?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'),
      sameContext: $http.get('http://api.wordnik.com:80/v4/word.json/'+$scope.targetWord+'/relatedWords?useCanonical=false&relationshipTypes=same-context&limitPerRelationshipType=100&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
		})
		.then(function (result) {
			$scope.wordDefinition = result.definitionArray.data[0].text;
			$scope.wordEtymology = result.etymology.data[0],
			$scope.lookupHistory.push($scope.targetWord);
			$scope.sameContext=result.sameContext.data[0].words;
			
      $scope.lookupList = $scope.lookupHistory.join(', ');
      
		});

		console.log($scope.targetWord);

	};
	$scope.targetWord = '';
	$scope.lookupHistory = [];
  $scope.sameContext = [];

});
