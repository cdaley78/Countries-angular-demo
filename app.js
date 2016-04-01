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
        "languages": [
          "Dutch",
          "Papiamento"
        ],
        "landlocked": false
      },
      {
        "name": {
          "common": "Belgium",
        },
        "capital": "Brussels",
        "region": "Europe",
        "languages": [
          "German",
          "French",
          "Dutch"
        ],
        "landlocked": false
      }
    ]

    $http.get('data/countries.json').success(function(data) {
      // convert language data into array for filtering support
      data.forEach(function(country) {
        let arr = []
        for(let lang in country.languages) {
          arr.push(country.languages[lang])
        }
        country.languages = arr
      })

      $scope.countries = data
    })
  }])

  app.filter('langName', function() {
    return function (obj) {
      return obj.join(", ")
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