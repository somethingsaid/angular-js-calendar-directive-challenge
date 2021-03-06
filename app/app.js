var myApp = angular.module('calendarDemoApp', []);

// your controller and directive code go here
myApp.controller('calendarCtrl', ['$scope', function($scope) {
    // Setting up today's date and array of months
    $scope.optionMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var current = {
        monthIndex: d.getMonth(),
        month: $scope.optionMonths[d.getMonth()],
        year: d.getFullYear()
    };

    // Initializing calendar-view
    $scope.selectedDate = {
        monthIndex: current.monthIndex,
        month: current.month,
        year: current.year
    }
    $scope.range = CalendarRange.getMonthlyRange(new Date(current.year, $scope.optionMonths.indexOf(current.month)));
    console.log('Initial date range: ' + JSON.stringify($scope.range));

    // Provide a range of 100 years in dropdown menu
    $scope.optionYears = [];
    for (var i = current.year - 50; i <= current.year + 50; i++) {
        $scope.optionYears.push(i);
    }

    // Get calendar range of selected month as user makes selections via ng-change:
    $scope.dateChanged = function () {
        $scope.selectedDate.monthIndex = $scope.optionMonths.indexOf($scope.selectedDate.month);
    };
}]);

myApp.directive('customCalendar', function() {
    return {
        restrict: 'E',
        templateUrl: 'calendar-directive.html',
        scope: true,
        controller: 'calendarCtrl',
        link: function(scope, element, attrs) {
            var calendarContainer = angular.element(element[0].querySelector('.calendar-container'));
            // Each time scope.selectedDate changes: clear html, update range, append html
            scope.$watch('selectedDate', function(newCollection, oldCollection) {
                if (newCollection) {
                    calendarContainer.empty();
                    scope.range = CalendarRange.getMonthlyRange(new Date(scope.selectedDate.year, scope.selectedDate.monthIndex));
                    var rangeOfDays = [];
                    for (var i = 0; i < scope.range.days.length; i++) {
                        rangeOfDays.push(scope.range.days[i].day);
                        if (scope.range.days[i].month !== scope.selectedDate.monthIndex) {
                            calendarContainer.append("<div class='cell grey'><p>" + scope.range.days[i].day + "</p></div>");
                        }
                        else {
                           calendarContainer.append("<div class='cell'><p>" + scope.range.days[i].day + "</p></div>"); 
                        }
                    }
                    console.log('Date change: ' + JSON.stringify(scope.selectedDate) + ' --> Days in range: ' + rangeOfDays);
                }
            }, true);
        }
    }
});