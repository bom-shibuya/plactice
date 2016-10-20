import TweenMax from 'TweenMax';
import TimelineLite from 'TimelineLite';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';


$(function() {

  // // smoothscroll
  // $('.js-smooth').on('click', function(e) {
  //   e.preventDefault();
  //   var _targetTop = $($(this).attr('href')).get(0).offsetTop;
  //   $('html,body').animate({
  //     scrollTop: _targetTop
  //   }, 'normal');
  // });



  var timelineLite = new TimelineLite();

  var tweenparent = $('.js-section03');
  var tweenchild = tweenparent.children('.content');
  console.log(tweenchild);
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: ".js-section03",
      duration: 5000,
    })
    .setPin(".js-section03") // pins the element for the the scene's duration
    .addIndicators()
    .addTo(controller); // assign the scene to the controller

  scene.on('progress', function(){
    timelineLite.to(tweenchild,2 ,{
      background: '#000'
    })
  });

});
