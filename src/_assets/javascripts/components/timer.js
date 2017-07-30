(function() {
  'use strict';

  var hiddenAttribute = 'hidden',
      seconds = 1000,
      minutes = seconds * 60,
      hours = minutes * 60,
      days = hours * 24;

  var Timer = window.Timer = function(options) {
    this.$timer = options.$timer;

    this.$days = options.$days;
    this.$hours = options.$hours;
    this.$minutes = options.$minutes;
    this.$seconds = options.$seconds;

    this.initialized = false;
  };

  Timer.prototype = {
    create: function() {
      if (!this.initialized) {
        this.endDateTime = new Date(this.$timer.getAttribute('datetime'));
        this.interval = setInterval(this.update.bind(this), 1000);

        this.$timer.removeAttribute(hiddenAttribute);

        this.initialized = true;
      }
    },

    destroy: function() {
      if (this.initialized) {
        clearInterval(this.interval);

        this.$timer.setAttribute(hiddenAttribute, true);

        this.initialized = false;
      }
    },

    update: function() {
      var delta = this.endDateTime - (new Date());

      if (delta < 0) {
        this.destroy.call(this);
      } else {
        this.$days.innerHTML = Math.floor(delta / days);
        this.$hours.innerHTML = Math.floor((delta % days) / hours);
        this.$minutes.innerHTML = Math.floor((delta % hours) / minutes);
        this.$seconds.innerHTML = Math.floor((delta % minutes) / seconds);
      }
    }
  };
})();
