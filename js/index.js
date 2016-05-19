// topbar fixo com scroll
(function($){
    $(window).ready(function(){
        var menuContainer = $("nav").find(".navbar-nav");
        var topMenuHeight = $('.navbar.navbar-fixed-top').height();
        var selectMenu = function(hash){
            if(!hash || hash == "undefined") hash = "#home";
            $(menuContainer).find("li").removeClass("active");
            var toSelect = $(menuContainer).find("li").find("a[href="+hash+"]");
            if(toSelect.size() > 0){
                $(toSelect).parent("li").addClass("active");
                if(document.location.hash != hash) {
                    if(history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        document.location.hash = hash;
                    }
                }
                return true;
            }
            return false;
            // }
        }

        /* function para chamar o carousel */
         $(".owl-carousel").owlCarousel({
            loop:true,
            margin:30,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                544:{
                    items:2,
                    nav:false
                },
                768:{
                    items:2,
                    nav:true,
                    loop:false
                },
                992:{
                    items:3,
                    nav:true,
                    loop:false
                },
                1200:{
                    items:4,
                    nav:true,
                    loop:false
                }
            }
        });

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            // if (scroll > 500) {
            //     $('.topbar').addClass('topbarFixo');
            // } else {
            //     $('.topbar').removeClass('topbarFixo');
            // }

            $(".xp_slide").each(function(){
                // console.log($(this).find("h2").eq(0).offset());
                var padding = parseInt($(this).css("padding-bottom"));
                var height = parseInt($(this).height());
                var position = parseInt($(this).offset().top);
                var endPoint = padding + height + position;

                var visible = (endPoint - scroll - topMenuHeight) > 0 ? true : false;
                if(visible){
                    var elementId = $(this).attr("id");
                    // if found a valid menu item
                    if(selectMenu("#"+elementId))
                        return false;
                }
            });
        });

        $(window).on('hashchange', function(e) {
            selectMenu(document.location.hash);
        });
        // on load
        selectMenu(document.location.hash);

        /* validação do formulário de contato */
        $("#contact").validate({
            submitHandler: function(form) {
                // esconde mensagem de validação
                $('#messageError').hide();
                $('#messageErrorSMTP').hide();
                $('#messageSuccess').hide();
                // disable form fields before send
                var formData = $(form).serialize();
                // console.log(formData);
                $(form).find("input, textarea").attr("disabled","disabled");
                /* faz a requisição para enviar o formulário */
                $.ajax({
                    url:$(form).attr("action"),
                    data:formData,
                    dataType:'json',
                    method:'POST',
                    complete:function(data){
                        console.log(data);
                        data = data.responseJSON;
                        if(data.error == false){
                            $('#messageSuccess').show();
                            // limpa os campos do form
                            $(form).trigger('reset');
                        } else {
                            $('#messageErrorSMTP').show();
                        }
                        $(form).find("input, textarea").attr("disabled",null);
                    }
                })
            },
            errorLabelContainer: "#messageBox",
            wrapper: "li",
            invalidHandler: function(event, validator) {
                // exibe a mensagem de erro
                $('#messageErrorSMTP').hide();
                $('#messageSuccess').hide();
                $('#messageError').show();
            }
        });
    });
})(jQuery)




















// (function () {
   // var topbar = document.getElementById('topbar'); // colocar em cache
    // window.addEventListener('scroll', function () {
       // if (window.scrollY > 0) menu.classList.add('topbarFixo'); // > 0 ou outro valor desejado
       // else menu.classList.remove('topbarFixo');
    // });
// })();
