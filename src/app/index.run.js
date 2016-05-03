(function () {
  'use strict';

  angular
    .module('voiceCommand')
    .run(stateOperation)
    .run(runBlock)
    .run(voiceManager);

  /** @ngInject */
  function stateOperation($rootScope, $timeout) {
    $rootScope
      .$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          $rootScope.currentState = toState.name;
          $timeout(function(){
            var micImageFlag = $rootScope.speechAPI.getState();
            if(!micImageFlag){
              $('#micImg')[0].src = 'assets/images/mic.gif';
            }else{
              $('#micImg')[0].src = 'assets/images/mic-animate.gif';
            }
          },300);
        });
  }

  /** @ngInject */
  function runBlock($log, $timeout) {
    $log.debug('runBlock end');


  }

  /** @ngInject */
  function voiceManager($rootScope, $window, $state) {

    var recognition;
    var process = _voiceManagerProcess();

    // Checking the support
    if ($window.webkitSpeechRecognition) {
      $rootScope.speechAPI = {
        start: function () {
          recognition = new $window.webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = false;
          recognition.lang = "en-US";

          recognition.onstart = function (event) {
            console.log('On Start: ');
            $rootScope.micFlag = true;
            $('#micImg')[0].src = 'assets/images/mic-animate.gif';
          };
          recognition.onresult = function (event) {
            var final_transcript = '';
            var interim_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; i++) {
              if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
              } else {
                interim_transcript += event.results[i][0].transcript;
              }
            }

            final_transcript = final_transcript.toLocaleLowerCase().trim();
            console.log('Final Transcript: ', final_transcript);

            process.runCommand(final_transcript, $state);
          };
          recognition.onerror = function () {
            console.log('On Error: ', arguments);
          };
          recognition.onend = function () {
            $('#micImg')[0].src = 'assets/images/mic.gif';
            recognition = null;
            console.log('On End: ', arguments);
          };
          recognition.start();
        },
        end: function () {
          recognition.stop();
        },
        getState:function(){
          return recognition?true:false;
        }
      };
    } else {
      $rootScope.speechAPI = {
        start:function(){
          alert('Your browser not supported!! Please Update.');
        },
        end:function(){
          alert('Your browser not supported!! Please Update.')
        }
      };
    }
  }

  // Private Methods
  function _voiceManagerProcess() {
    return {
      runCommand: function (command, $state) {
        var _currentX, _currentY;
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
          case 'open google':
            window.location.href = 'http://google.com';
            break;
          default:
            console.log('Oppps I dont know what you are saying!!!. Please try once again.');
        }
      }
    };
  }

})();
