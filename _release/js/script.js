/*! bundled at:2016-09-23 183018 */

// jquery ���C�u�����Ƃ�


// �����Ŏ��s�������Ă���
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
