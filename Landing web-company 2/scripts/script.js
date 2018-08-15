"use strict";
$(document).ready(function() {
  $('.nav__dropdown-activator').on('click', function() {
    var headerHeight = $('.header__nav').innerHeight();
    if (headerHeight == 92) {
      $('.header__nav').animate({
        height: '300px'
      }, 500);
      $('.nav__dropdown').addClass('nav__dropdown-open');
    } else {
        $('.header__nav').animate({
          height: '92px'
        }, 500);
        setTimeout(function() {
          $('.nav__dropdown').removeClass('nav__dropdown-open');
        }, 500);
     }
  });
  $('.scroll-down').on('click', function() {
    $("html,body").animate({
      scrollTop: $('body').children()[1].offsetTop
    }, 900);
  });
});