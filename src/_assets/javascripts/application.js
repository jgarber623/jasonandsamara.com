//= require_tree ./components

(function(window) {
  'use strict';

  var navigation = new Navigation({
    $control: document.querySelector('#navigation-control'),
    $region: document.querySelector('#navigation-list')
  });

  var handleResize = function() {
    navigation[window.matchMedia('(min-width: 64rem)').matches ? 'destroy' : 'create']();
  };

  window.addEventListener('resize', handleResize);

  handleResize();
})(window);
