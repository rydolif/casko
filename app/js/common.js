$(function() {

$('.checkbox').on('change', function() {
  var btn = $('.form');
  if ( btn.attr('disabled') ){
    btn.removeAttr("disabled");
    $('.label').addClass('label__active');
  }
  else{
    btn.attr("disabled", true);
    $('.label').removeClass('label__active');
  }
});

$(".header").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 0}, 'slow', 'swing');
});

//-----------------------------slider-----------------------------
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
      }
   }
});

//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
  $(this).toggleClass('hamburger-active');
  $('nav').toggleClass('nav-active');
  $('header').toggleClass('header-menu');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");

  $(".form").validate({
    messages: {
      name: "Введите ваше Имя",
      phone: "Введите ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".form").find("input[name=name]").val(),
        phone: jQuery(".form").find("input[name=phone]").val(),
        subject: jQuery(".form").find("input[name=subject]").val()
      };
      ajaxSend('.order-form', t);
    }
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

});

//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});
