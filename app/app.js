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
			var current = {};
			current.month = $scope.optionMonths[d.getMonth()];
			current.year = d.getFullYear();

			$scope.selectedDate.month = current.month;
			$scope.selectedDate.year = current.year;

			// Giving a range of 20 years in dropdown menu
			$scope.optionYears = [];
			for (var i = current.year - 20; i <= current.year + 20; i++) {
				$scope.optionYears.push(i);
			}

			// Sense checking
			$scope.dateChanged = function () {
				// tied to ng-change in template
				console.log('Selected Date has changed: ' + JSON.stringify($scope.selectedDate));
			};
		}
	}
});