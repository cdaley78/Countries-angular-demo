(function (undefined) {

  var app = angular.module('cjd-countries', [])

  app.controller('CountryController', ['$scope', '$http', function($scope, $http) {
    $scope.filterOptions = {
      landlocked: [
        { value: 'All' },
        { value: 'Yes' },
        { value: 'No' }
      ]
    }
    $scope.filterItem = {
      landlocked: $scope.filterOptions.landlocked[0]
    }
    $scope.isLandlocked = function(data) {
      var landlocked = $scope.filterItem.landlocked.value === 'Yes'
      return data.landlocked === landlocked || $scope.filterItem.landlocked.value === 'All'
    }
    $scope.countries = [
      {
        "name": {
          "common": "Aruba",
        },
        "capital": "Oranjestad",
        "region": "Americas",
        "languages": {
          "nld": "Dutch",
          "pap": "Papiamento"
        },
        "landlocked": false
      }
    ]

    $http.get('data/countries.json').success(function(data) {
      $scope.countries = data
    })
  }])

  app.filter('langName', function() {
    return function (obj) {
      const keys = Object.keys(obj)
      let str = ''
      if(keys.length !== 0) {
        keys.forEach(function(v, i, a) {
          const val = obj[v]
          str += i === a.length - 1 ? val : val + ', '
        })
        return str
      }
      else {
        return 'No Official Language'
      }
    }
  })

  app.filter('yesNo', function() {
    return function(isTrue) {
      return isTrue ? 'Landlocked' : ''
    }
  })

  app.directive('countryBlock', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/countryinfo.html'
    }
  })

})();