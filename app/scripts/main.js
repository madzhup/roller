/* jshint devel:true */
(function($){
  var limit = 2;
  var list = $('.art-list');
  var items = $('.article');

  $('[data-roller]').each(function(){
    var list = $(this);
    var items = $(list.data('roller') || '.article');
    var limit = list.data('roller-limit' || 2);
    var time = list.data('roller-time' || 5000);

    list.prepend(items.filter(':not(:nth-child(-n+' + (items.length - limit) + '))').clone());
    list.addClass('roll');

    items = $(list.data('roller'));

    items.filter(':nth-child(-n+' + (items.length - limit) + ')').addClass('roll-out');

    var index = items.length - limit;

    setInterval(function(){
      if(index == 0){
        items.removeClass('roll-out').filter(':nth-child(-n+' + (items.length - limit) + ')').addClass('roll-out');
        index = items.length - limit;
      }
      index--;
      items.eq(index).addClass('roll-in');
      list.removeClass('roll');

      list.on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
        if(e.target != list[0]) return;
        //console.log(e.target);
        items.eq(index).removeClass('roll-out roll-in');
        list.addClass('roll');
        items.eq(index + limit).addClass('roll-out');
      });
    }, time);
  });

})(jQuery);
