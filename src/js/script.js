
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        cssEase: 'Linar',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/st/980.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/st/982.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    

    // modal
    $('[data-modal=consultation]').on('click', function(){
        $('.overflay, #consultation').fadeIn('slow');
    }); 

    $('.modal__close').on('click', function() {
        $('.overflay, #consultation, #thanks, #order').fadeOut('slow');
    });

    // 
    

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
           $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
           $('.overflay, #order').fadeIn('slow');
        })

    });


// модуль jquery валидация форм
    function validaForms(form){
        $(form).validate({
            rules:{
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
                
            }
        }, 
        messages: {
            name: "Пожалуйста, введите свое имя",
            phone: "Пожалусйта введите свой телефон",
            email: {
              required: "Пожалуйста, введите свой почтовый адрес",
              email: "Неправильно введт адрес почты"
            }
        }
    
    });

};

validaForms('#consultation-form');
validaForms('#consultation form');
validaForms('#order form');

// mask

$('input[name=phone]').mask("+7 (999) 999-99-99");

// server

$('form').submit(function(e){
    e.preventDefault()
    $.ajax({
        type:"POST",
        url: "mailer/smart.php",
        data: $(this).serialise()
    }).done(function(){
        $(this).find("input").val("");
        $('#consultation. #order').fadeOut();
        $('.overflay, #thanks').fadeIn('slow');


        $('form').triger('reset');
    });
    return false;
});

// pagep up
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pagep').fadeIn();
        } else {
            $('.pagep').fadeOut();

        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html. body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });




    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    
    new WOW().init();
              


});
