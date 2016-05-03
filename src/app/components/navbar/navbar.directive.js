(function() {
  'use strict';

  angular
    .module('voiceCommand')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $state, $rootScope, $scope) {
      var vm = this;

      if($rootScope.micFlag == undefined){
        $rootScope.micFlag = false;
      }
      $rootScope.$watch($rootScope.currentState,function(){
        vm.currentState = $rootScope.currentState;
      });

      vm.micAction = function(){
        if(!$rootScope.speechAPI.getState()){
          $rootScope.speechAPI.start();
        }else{
          $rootScope.speechAPI.end();
        }
      };

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
