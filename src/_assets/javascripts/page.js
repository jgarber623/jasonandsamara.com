(function(window) {
  'use strict';

  var Page = window.Page = function() {
    this.navigation = new Navigation({
      $control: document.querySelector('#navigation-control'),
      $region: document.querySelector('#navigation-list')
    });

    new Timer({
      $timer: document.querySelector('#timer'),
      $days: document.querySelector('#timer-days'),
      $hours: document.querySelector('#timer-hours'),
      $minutes: document.querySelector('#timer-minutes'),
      $seconds: document.querySelector('#timer-seconds')
    }).create();

    window.addEventListener('resize', this.events.resize.bind(this));

    this.events.resize.call(this);
  };

  Page.prototype = {
    events: {
      resize: function() {
        this.navigation[window.matchMedia('(min-width: 64rem)').matches ? 'destroy' : 'create']();
      }
    }
  };
})(window);
