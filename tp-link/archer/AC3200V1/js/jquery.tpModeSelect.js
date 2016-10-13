(function($) {
    'use strict';
    $.fn.tpModeSelect = function(options) {
        options = $.extend({}, options);

        var self = this;

        this.each(function() {
            if (!$(this).data('tpModeSelect')) {
                self.id = $.randomId('modeSelect');
                $(this).data('tpModeSelect', self.id);
            } else {
                return;
            }

            var hasMode3 = $(this).hasClass('mode-3');

            if (hasMode3) {
                $(this).find('span').first().addClass('first-mode').after('<span class="mode-seperate"> | </span>').next().next().addClass('second-mode').after('<span class="mode-seperate"> | </span>').next().next().addClass('third-mode');
                $(this).next('form').addClass('first-mode').next('form').addClass('second-mode').next('form').addClass('third-mode');
            } else {
            $(this).find('span').first().addClass('first-mode').after('<span class="mode-seperate"> | </span>').next().next().addClass('second-mode');
                $(this).next('form').addClass('first-mode').next('form').addClass('second-mode');
            }

        });

        this.find('span.mode-select').each(function() {
			var hasMode3 = $(this).parent('div.mode-change').hasClass('mode-3');
            if ($(this).hasClass('first-mode')) {
                $("form.first-mode").fadeIn();
                $('form.second-mode').hide();
                if (hasMode3) {
                    $('form.third-mode').hide();
                }
            } else if ($(this).hasClass('second-mode')) {
                $("form.first-mode").hide();
                $('form.second-mode').fadeIn();
                if (hasMode3) {
                    $('form.third-mode').hide();
                }
            } else {
                $("form.first-mode").hide();
                $('form.second-mode').hide();
                if (hasMode3) {
                    $('form.third-mode').fadeIn();
                }
            }
        });

        this.find('span').click(function() {
			var hasMode3 = $(this).parent('div.mode-change').hasClass('mode-3');
            var firstMode = $(this).parent('div.mode-change').next("form.first-mode");
            var secondMode = firstMode.next('form.second-mode');
            if (hasMode3) {
                var thirdMode = secondMode.next('form.third-mode');
            }
            if ($(this).hasClass('mode-select') || $(this).hasClass('mode-seperate')) {
                return;
            } else if ($(self).hasClass('load-page'))  {
                $(this).siblings('span.mode-select').removeClass('mode-select');
                $(this).addClass('mode-select');             
            } else {
                $(this).siblings('span.mode-select').removeClass('mode-select');
                $(this).addClass('mode-select');
                if ($(this).hasClass('first-mode')) {
                    firstMode.fadeIn();
                    secondMode.hide();
                    if (hasMode3) {
                        thirdMode.hide();
                    }
                } else if ($(this).hasClass('second-mode')) {
                    firstMode.hide();
                    secondMode.fadeIn();
                    if (hasMode3) {
                        thirdMode.hide();
                    }
                } else {
                    firstMode.hide();
                    secondMode.hide();
                    if (hasMode3) {
                        thirdMode.fadeIn();
                    }
                }
            }
        });
    }

})(jQuery);
