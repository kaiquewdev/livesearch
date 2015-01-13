function MainCtrl($log, $scope, $http, $sce) {
  $scope.$sce = $sce;
  $scope.suggestions = [];
  $scope.result = [];

  function highlightSuccess(result, status) {
    $scope.result = result.data;
  }

  function suggestSuccess(result, status) {
    $scope.suggestions = result.data;
  }

  function suggestFail() {
    $log.debug('suggest fail');
  }

  function highlightFail(result, status) {
    $log.debug('highlight fail');
  }

  $scope.suggest = function (key) {
    if (key !== 13) {
      $http
        .get('http://localhost:3000/api/livesearch/suggestion?q=' + $scope.keyword)
        .then(suggestSuccess, suggestFail);
    } else if (key === 13) {
      $scope.suggestions = [];
      $http
        .get('http://localhost:3000/api/livesearch/highlight?q=' + $scope.keyword)
        .then(highlightSuccess, highlightFail);
    }
  };
}

function runHandler($log) {
  $log.debug('livesearch running');
}
angular
  .module('livesearch', [])
  .controller('MainCtrl', MainCtrl)
  .run(runHandler);

angular
  .bootstrap(document, ['livesearch']);
