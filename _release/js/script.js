/*! bundled at:2016-09-06 113328 */

// jquery ƒ‰ƒCƒuƒ‰ƒŠ‚Æ‚©


// ‚±‚±‚ÅÀs‚ğ‘‚¢‚Ä‚¢‚­
$(function(){
  // smoothscroll
  $('.js-smooth').on('click',function(e){
    e.preventDefault();
    var _targetTop = $($(this).attr('href')).get(0).offsetTop;
    $('html,body').animate({
      scrollTop : _targetTop
    }, 'normal');
  });
});
