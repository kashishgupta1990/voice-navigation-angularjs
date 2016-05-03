(function () {
  'use strict';

  angular
    .module('voiceCommand')
    .run(stateOperation)
    .run(runBlock)
    .run(voiceManager);

  /** @ngInject */
  function stateOperation($rootScope) {
    $rootScope
      .$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          $rootScope.currentState = toState.name;
        });
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

  /** @ngInject */
  function voiceManager($window, $state) {

    // Checking the support
    if ($window.webkitSpeechRecognition) {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      var process = _voiceManagerProcess();
      recognition.onresult = function (event) {
        console.log(event);
        process.getCommand(event, $state);
      };
      recognition.start();
    }
  }

  // Private Methods
  function _voiceManagerProcess() {
    return {
      getCommand: function (event, $state) {
        var command = '';
        if (event && event.results && event.results[0] && event.results[0][0] && event.results[0][0].transcript) {
          angular.forEach(event.results, function (value, key) {
            command = value[0].transcript;
            console.log('In loop: ', command);
          });
          console.log('Command: ', command);
          this.runCommand(command.trim().toLowerCase(), $state);
        }
      },
      runCommand: function (command, $state) {
        var _currentX, _currentY;
        var actionItem;
        switch (command) {
          case 'home':
            $state.go('home');
            break;
          case 'about':
            $state.go('about');
            break;
          case 'contact':
            $state.go('contact');
            break;
          case 'scroll down':
            _currentX = window.pageXOffset;
            _currentY = window.pageYOffset;
            window.scrollTo(_currentX, _currentY + 800);
            break;
          case 'scroll up':
            _currentX = window.pageXOffset;
            _currentY = window.pageYOffset;
            window.scrollTo(_currentX, _currentY - 800);
            break;
          case 'builder search':
            $('#builderSearch')[0].placeholder = 'Say Builder Name';
            actionItem = $('#builderSearch')[0];
            break;
          case 'go':
            if (actionItem) {
              alert('Searching for ' + actionItem.value);
              actionItem.placeholder = 'Say Builder Search';
              actionItem = '';
            }
            break;
          case 'open google':
            window.location.href = 'http://google.com';
                break;
          default:
            if (actionItem) {
              actionItem.value = command;
            }
            console.log('Oppps I dont know what you are saying!!!. Please try once again.');
        }
      }
    };
  }

})();
