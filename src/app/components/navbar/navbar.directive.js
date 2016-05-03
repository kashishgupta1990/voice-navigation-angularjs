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
    function NavbarController(moment, $state, $rootScope) {
      var vm = this;

      $rootScope.$watch($rootScope.currentState,function(){
        vm.currentState = $rootScope.currentState;
        console.log(vm.currentState);
      });

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
