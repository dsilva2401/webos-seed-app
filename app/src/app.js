app = angular.module('app', []);

app.directive('app', function () {
    return {
        restrict: 'EA',
        templateUrl: 'src/app.html'
    }
});