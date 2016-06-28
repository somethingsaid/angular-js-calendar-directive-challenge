var myApp = angular.module('calendarDemoApp', []);

// your controller and directive code go here
myApp.directive('customCalendar', function() {
	return {
		restrict: 'E',
		templateUrl: 'calendar-directive.html',
		scope: true,
		controller: function($scope, $element, $attrs) {
			// Setting up looking array for Date() object
			$scope.optionMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			// Setting up variables for calendar to display current month
			var d = new Date();
			$scope.selectedDate = {};
			$scope.current = {};
			$scope.current.month = $scope.optionMonths[d.getMonth()];
			$scope.current.year = d.getFullYear();

			$scope.selectedDate.month = $scope.current.month;
			$scope.selectedDate.year = $scope.current.year;

			// Giving a range of 20 years in dropdown menu
			$scope.optionYears = [];
			for (var i = $scope.current.year - 20; i <= $scope.current.year + 20; i++) {
				$scope.optionYears.push(i);
			}

			// Sense checking
			console.log('Months: ' +  $scope.optionMonths);
			console.log('Years: ' +  $scope.optionYears);
		}
	}
});