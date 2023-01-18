(function($) {
    'use strict';
    $.fn.tpFile = function(options) {
        options = $.extend({}, options);
        this.each(function() {
            var tmp = $(this);

            var filecont = tmp.children("input");

            var inHTML = "<div class=\"container widget-container text-container file-container\">";

            if (this.fieldLabel !== null) {
                inHTML += "<div class=\"widget-fieldlabel-wrap \">";
                inHTML += "<label class=\"widget-fieldlabel text-fieldlabel\">" + tmp.children("b").html() + "</label>";
/*                if (this.fieldLabel !== "") {
                    inHTML += "<span class=\"widget-separator\">" + ":" + "</span>";
                };*/
                inHTML += "</div>";
            };
            inHTML += "<div class=\"file-wrap-outer widget-wrap-outer\">";
            inHTML += "<div class=\"file-wrap widget-wrap\">"
            inHTML += "<div class=\"widget-wrap text-wrap\">";
            inHTML += "<span class=\"text-wrap\">";
            inHTML += "<input type=\"text\" class=\"file-text text-text \" readonly=\"true\"/>";
            inHTML += "</span>";
            inHTML += "</div>";

            inHTML += "<div class=\"button-container file-button-container inline-block\">"
            inHTML += "<button class=\"file-button button-button\" type=\"button\">" + s_str.browse + "</button>";
            inHTML += "</div>";
            inHTML += "</div>";

            if (this.tips) {
                inHTML += "<div class=\"widget-tips textbox-tips \">";
                inHTML += "<div class=\"content tips-content\"></div>";
                inHTML += "</div>";
            };

            inHTML += "<div class=\"widget-error-tips textbox-error-tips \">";
            inHTML += "<span class=\"widget-error-tips-delta\"></span>";
            inHTML += "<div class=\"widget-error-tips-wrap\">";
            inHTML += "<div class=\"content error-tips-content\"></div>";
            inHTML += "</div>";
            inHTML += "</div>";

            inHTML += "</div>";
            inHTML += "</div>";

            var container = $(inHTML);

            tmp.replaceWith(container);

            container.find("div.file-wrap").append(filecont.addClass("file-input"));

        var container = $("div.file-container");

            container.find("input.file-input").get(0).onchange = function(e) {
            var tar = $(this),
                    value = tar.val(),
                    path = value.split('\\').pop();
                container.find("input.file-text").val(path);
            };

            container.delegate(".file-button", "click", function(e) {
                var tar = $(this);
                tar.closest('.file-wrap').find('input.file-input').click();
        });
        })

    }

})(jQuery);
