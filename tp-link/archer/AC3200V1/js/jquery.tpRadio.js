(function($) {
    'use strict';

    function TPRadio() {}

    TPRadio.prototype = {
        constructor: TPRadio,
        instances: [],
        init: function(id) {
            var tag = '';
            var self = this;
            self.id = id;
            self.$radio = $("#" + id);

            var divTmp = self.$radio.parent("div").not(".pure-control-group");
            var bTmp = $(divTmp).find("b");
            $(divTmp).addClass("pure-control-group");
            if ($(bTmp).attr('class') !== undefined) {
                /*var tag = $(bTmp).attr('class').match(/\b(T_|t_)(\w+)\b/);*/
                tag = $(bTmp).attr('class');
            }
            $(bTmp).replaceWith("<label class='label-title" + " " + tag + "'>" + $(bTmp).html() + "</label>");
            var labelTmp = self.$radio.next("label:first");
            self.$radio.addClass("radio-radio");
            var str = "<label class='radio-label " + $(labelTmp).attr('class') + "' for='" + self.$radio.attr('id') + "'>";
            str += "<span class='icon'></span><span class='text'>" + labelTmp.text() + "</span></label>";
            self.$radio.next("label:first").replaceWith(str);
            self.$label = self.$radio.next("label:first");

            var errorTips = '<div class="widget-error-tips" id="' + self.$radio.attr('id') + '_tips">' +
                '<span class="widget-error-tips-delta"></span>' +
                '<div class="widget-error-tips-wrap">' +
                '<div class="content error-tips-content">' +
                '<span id="' + self.$radio.attr('id') + '_tips_content"></span>' +
                '</div>' +
                '</div>' +
                '</div>';
            self.$label.append(errorTips);

            self.refresh();
        },
        refresh: function() {
            var self = this;
            var radioText = self.$radio.next('label.radio-label').find('.text');
            var radioIcon = self.$radio.next('label.radio-label').find('.icon');
            radioText.addClass('span-click').removeClass('span-disable-click');
            radioIcon.removeClass('radio-click').removeClass('radio-disable-unchecked').removeClass('radio-disable-click');
            if (self.$radio.prop('disabled')) {
                if (self.$radio.prop('checked') == true || self.$radio.prop('checked') == "checked") {
                    radioText.addClass('span-disable-click');
                    radioIcon.addClass('radio-disable-click');
                } else {
                    radioText.addClass('span-disable-click');
                    radioIcon.addClass('radio-disable-unchecked');
                }
            } else {
                self.registerHandlers();
                if (self.$radio.prop('checked') == true || self.$radio.prop('checked') == "checked") {
                    radioText.addClass('span-click');
                    radioIcon.addClass('radio-click');
                    self.$radio.click();
                } else {
                    radioText.removeClass('span-click');
                    radioIcon.removeClass('radio-click');
                }
            }
        },
        registerHandlers: function() {
            var self = this;
            self.unregisterHandlers();
            self.$label.on('mouseenter.tpRadio', function(e) {
                self.labelMouseEnter(e);
            });
            self.$label.on('mouseleave.tpRadio', function(e) {
                self.labelMouseLeave(e);
            });
            self.$label.on('click.tpRadio', function(e) {
                self.labelClick(e);
            });
        },
        labelMouseEnter: function() {
            var self = this;
            self.$label.find('.text').addClass('span-hover');
            if (self.$label.prev('.radio-radio').prop('checked')) {
                self.$label.find('.icon').removeClass('radio-click').addClass('radio-hover-checked');
            } else {
                self.$label.find('.icon').addClass('radio-hover-unchecked');
            }
        },
        labelMouseLeave: function() {
            var self = this;
            if (self.$label.prev('.radio-radio').prop('checked')) {
                self.$label.find('.icon').addClass('radio-click');
            }
            self.$label.find('.text').removeClass('span-hover');
            self.$label.find('.icon').removeClass('radio-hover-checked')
                .removeClass('radio-hover-unchecked');
        },
        labelClick: function(e) {
            e.preventDefault();
            var self = this;
            if (self.$radio.prop('checked') == true || self.$radio.prop('checked') == "checked" || self.$radio.prop('disabled')) {
                return;
            }

            // Get the checked radio with the same name but different id, remove its classes 
            var radioName = self.$label.prev('input[id=' + self.$label.prop('for') + ']').prop('name');

            var checkedRadioLabel = $('input[name= ' + radioName + '][id!= ' + self.$label.prop('for') + ']:checked').next('.radio-label');
            checkedRadioLabel.find('.text').removeClass('span-click');
            checkedRadioLabel.find('.icon').removeClass('radio-click');

            self.$label.find('.text').removeClass('span-hover')
                .addClass('span-click');
            self.$label.find('.icon').removeClass('radio-hover-checked')
                .removeClass('radio-hover-unchecked')
                .addClass('radio-click');

            self.$radio.prop('checked', true);
            self.$radio.click();
        },
        unregisterHandlers: function() {
            var self = this;
            self.$label.off('.tpRadio');
        },
        destroy: function() {
            var self = this;
            self.unregisterHandlers();
            delete Object.getPrototypeOf(self).instances[self.id];
            $(self).removeData('tpRadio');
        }
    };

    $.fn.tpRadio = function(options) {
        this.each(function() {
            var tpradio = $(this).data('tpRadio');
            if (!tpradio) {
                var instance = new TPRadio();
                $(this).data('tpRadio', instance);
                instance.instances[this.id] = instance;
                instance.init(this.id);
            } else if (options === 'destroy' && tpradio) {
                tpradio.destroy();
            } else {
                $(this).data('tpRadio').refresh();
            }
        });
    };
})(jQuery);
