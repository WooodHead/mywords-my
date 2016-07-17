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

angular.module('Wordly.lookups', []).controller('lookups', function ($scope, $http,words) {

	$scope.queryWord = function () {
		words.queryWord($scope.targetWord);

	};

});

angular.module('Wordly.services', []).factory('words', function ($http) {
	var queryWord = function (word) {
		return $http({
			method : 'POST',
			url : '/api/loopups/query',
			data : JSON.stringify({
				data : word
			})
		});
	};

	return {
		queryWord : queryWord
	};
});
