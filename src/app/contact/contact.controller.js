(function() {
  'use strict';

  angular
    .module('voiceCommand')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($timeout, webDevTec, toastr) {
    var _that = this;

    _that.awesomeThings = [];
    _that.classAnimation = '';
    _that.creationDate = 1461754004571;
    _that.showToastr = showToastr;
    _that.para = [];

    for(var x=0;x<20;x++){
      _that.para.push(x);
    }

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        _that.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      _that.classAnimation = '';
    }

    function getWebDevTec() {
      _that.awesomeThings = webDevTec.getTec();

      angular.forEach(_that.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
