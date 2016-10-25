import TweenMax from 'TweenMax';
import TimelineLite from 'TimelineLite';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';
import Vivus from 'vivus'
import Snap from 'snapsvg-cjs'

const svgAnimationKlass = (Klass) => {

  let svg_target = document.querySelectorAll('.' + Klass)
  let path = [
    'M590.2,31.1c-122.6-70.7-374.6,10.4-476.8,81.3C-4.2,194-36,382,61.8,483.3c165.2,171,545.8,152.9,711.6-0.6c113-104.7,87.7-302.4-69-382.6C665.2,80,631.2,50.1,590.2,31.1L590.2,31.1z',
    'M576.6,37C454-33.7,199.9,20.1,97.7,91.1C-19.9,172.7-28,381.1,78.8,473c167.3,143.9,534.7,150.6,674.4-7.1c102.2-115.3,109.6-290.8-47.1-371C666.9,74.9,617.6,56,576.6,37L576.6,37z'
  ];
  let path_number = 0;

  let svgAnimation = (arrySVG) => {

    let svgAction = () =>{
      if (path_number === 0) {
        Snap(arrySVG[i]).animate({
          d: path[0]
          }, 3000, svgAction);
        path_number = 1;
      } else {
        Snap(arrySVG[i]).animate({
          d: path[1]
          }, 3000, svgAction);
          path_number = 0;
      }
    }
    for(var i = 0; i < arrySVG.length; i++){
      // svgAction()
    }

  console.log(arrySVG.length);
  }
  svgAnimation(svg_target)
}
svgAnimationKlass('js-svg_balloon')


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
  var pigAnime = new Vivus('loveMeat').stop()
  var tweenparent = $('.js-section03');
  var tweenchild = tweenparent.children('.content');
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: ".js-section03",
      duration: 5000,
    })
    .setPin(".js-section03") // pins the element for the the scene's duration
    .addIndicators()
    .addTo(controller); // assign the scene to the controller

  scene.on('progress', function() {

    $(window).on('scroll', function() {
      var scrollProgress = scene.progress();
      TweenMax.to(tweenchild, 1, {
        background: '#000',
      });
      pigAnime.setFrameProgress(scrollProgress*2);
    });
  });

});
