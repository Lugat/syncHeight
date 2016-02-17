;(function($, window, document, undefined) {
    
  var PLUGIN_NAME = 'syncHeight',
      PLUGIN_VERSION = '0.2',
      PLUGIN_OPTIONS = {
        select: function() {
          return $(this);
        },
        minHeight: 0,
        includeMargin: true,
        before: null,
        after: null,
        timeout: 100
      };
      
  function Plugin(options, element) {
    
    this.name = PLUGIN_NAME;
    this.version = PLUGIN_VERSION;        
    this.opt = $.extend(true, {}, PLUGIN_OPTIONS, options);

    this.element = element;
    
    this._init();
    
  };
  
  Plugin.prototype = {

    _init: function() {
      
      if (this.opt.timeout !== null) {

        this.timeout;

        $(window).resize((function() {

          clearTimeout(this.timeout);
          this.timeout = setTimeout((function() {
            
            this.run();
            
          }).bind(this), this.opt.timeout);

        }).bind(this)).trigger('resize');

      } else {
        this.run();
      }
      
    },
            
    run: function() {
      
      var $items = this.getItems();
      
      if ($items.lenght <= 1) {
        return;
      }
            
      $items.height('auto');

      if ((typeof this.opt.before === 'function' ? this.opt.before.apply(this) : true) === true) {

        var minHeight = typeof this.opt.minHeight === 'function' ? this.opt.minHeight.apply(this) : 0,
            includeMargin = this.opt.includeMargin,
            height;

        $items.each(function() {

          height = $(this).outerHeight(includeMargin);

          if (height > minHeight) {
            minHeight = height;
          }

        });

        $items.height(minHeight);

        if (typeof this.opt.after === 'function') {
          this.opt.after.apply(this);
        }

      }
      
    },
            
    getItems: function() {

      if (typeof this.opt.select === 'function') {
        return this.opt.select.apply(this.element);
      } else if (typeof this.opt.select === 'string') {
        return $(this.opt.select, this.element);
      }
      
      return $(this.element);

    }

  };
  
  $.fn.syncHeight = function(options) {
    
    return $(this).each(function() {
      return new Plugin(options, this);
    });
    
  };

}(jQuery, window, document));