
$(function($){




    function show_advantage(cnt_id){
        $('.advantage_content').hide();
        $('#advantage_content_' + cnt_id).show();
        $(".advantage_button").removeClass('current');
        $("#advantage_button_" + cnt_id).addClass('current');
    }


    $('.advantage_button').hover(function(){
        var $this = $(this);
        show_advantage($this.data('id'));
    });

    show_advantage(1);




    $('.language_current').click(function(){
        $('.language_drop').show();
    });

    $('.public_account_current').click(function(){
        $('.public_account_drop').show();
    });


    $(document).click(function(e){
        var x = $(e.target) ;
        var y = x.closest('.language_select');
        if(y && y.length > 0 ){
            return;
        }
        $('.language_drop').hide();
    });


    $(document).click(function(e){
        var x = $(e.target) ;
        var y = x.closest('.public_account_select');
        if(y && y.length > 0 ){
            return;
        }
        $('.public_account_drop').hide();
    });



    $.getJSON("/isChinaIP",function (d) {
        $("#download_link_android_loading").hide();
        $("#download_link_android").show();

        $("#download_link_android").attr("is_cn",d.isChina);

        if(d.isChina){
            $("#download_link_android").attr("href",window.download_link_android);
        }else {
            $("#download_link_android").attr("href",window.download_link_android_alien)
        }
    })




});