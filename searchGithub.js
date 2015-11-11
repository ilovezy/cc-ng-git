/*
 * @Author: fhc
 * @Date:   2015-11-10 10:51:16
 * @Last Modified by:   fhc
 * @Last Modified time: 2015-11-10 11:36:12
 */

(function() {
    angular.module('ccApp', [])
        .controller('mainController', ['$scope', '$http', function($scope, $http) {

            var onUserComplete = function(response) {
                $scope.user = response.data;
                console.log($scope.user);
                $http.get($scope.user.repos_url)
                    .then(onRepos, onError)
            };

            function onRepos(response) {
                $scope.repos = response.data;
            }

            function onError(reason) {
                $scope.error = 'something wrong happened';
            };

            $scope.searchPattern = "angular";

            $scope.searchGithub = function(searchPattern) {
                $http.get('https://api.github.com/users/' + $scope.searchPattern)
                    .then(onUserComplete, onError);
            };

            $scope.message = 'hello angular';

            $scope.repoSortOrder = 'homepage';
        }]);
}());
