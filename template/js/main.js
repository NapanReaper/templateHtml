(function ($) {
    "use strict";
    var fullHeight = () => {
        $('.js-fullHeight').css('height', $(window).height())
        $(window).resize(() => {
            $('.js-fullHeight').css('height', $(window).height())
        });
    };
    fullHeight();
    $('#sidebarCollapse').on('click', ()=>{
        $('#sidebar').toggleClass('active');
    });
})(jQuery);