(function() {
  'use strict';

  var expandedAttribute = 'aria-expanded',
      hiddenAttribute = 'hidden';

  var Navigation = window.Navigation = function(options) {
    this.$control = options.$control;
    this.$region = options.$region;

    this.initialized = false;
  };

  Navigation.prototype = {
    events: {
      click: function(event) {
        event.preventDefault();

        var value = this.$control.getAttribute(expandedAttribute) !== 'true';

        this.$control.setAttribute(expandedAttribute, value);
        this.$region[value ? 'removeAttribute' : 'setAttribute'](hiddenAttribute, true);
      }
    },

    create: function() {
      if (!this.initialized) {
        this.$control.removeAttribute(hiddenAttribute);
        this.$region.setAttribute(hiddenAttribute, true);

        this.boundClickHandler = this.events.click.bind(this);

        this.$control.addEventListener('click', this.boundClickHandler);

        this.initialized = true;
      }
    },

    destroy: function() {
      if (this.initialized) {
        this.$control.setAttribute(hiddenAttribute, true);
        this.$region.removeAttribute(hiddenAttribute);

        this.$control.removeEventListener('click', this.boundClickHandler);

        this.initialized = false;
      }
    }
  };
})();
