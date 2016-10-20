import ScrollMagic from 'scrollmagic';
import TweenMax from 'TweenMax';


$(function(){

  // // smoothscroll
  // $('.js-smooth').on('click', function(e) {
  //   e.preventDefault();
  //   var _targetTop = $($(this).attr('href')).get(0).offsetTop;
  //   $('html,body').animate({
  //     scrollTop: _targetTop
  //   }, 'normal');
  // });
  console.log(TweenMax);
  var tweenTarget = document.querySelector('.js-section02');
  TweenMax.to( tweenTarget,2,{
  opacity : 0
  });


});

window.onload = function(){
}
