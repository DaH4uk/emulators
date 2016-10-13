(function($) {
    'use strict';

    function TPCheckbox() {}

    TPCheckbox.prototype = {
        constructor: TPCheckbox,
        instances: [],
        init: function(id) {
            var tag;
            var self = this;
            self.id = id;

            self.$checkbox = $("#" + id);

            var divTmp = self.$checkbox.parent("div");
            var bTmp = $(divTmp).find("b");
            if ($(bTmp).attr('class') !== undefined) {
                /*var tag = $(bTmp).attr('class').match(/\b(T_|t_)(\w+)\b/);*/
                tag = $(bTmp).attr('class');
            }
            $(divTmp).addClass("pure-control-group").addClass("relative");
            $(bTmp).replaceWith("<label class='label-title" + " " + tag + "'>" + $(bTmp).html() + "</label>");
            var labelTmp = self.$checkbox.next("label").first();
            var str = "<label class='checkbox-label' for='" + self.$checkbox.attr('id') + "'>";
            if (labelTmp.html() == '' || labelTmp.html() === undefined) {
                str += "<span class='icon no-text'></span></label>";
            } else {
            str += "<span class='icon'></span><span class='text T " + labelTmp.attr('class') + "'>" + labelTmp.html() + "</span></label>";
            }
            self.$checkbox.next("label").replaceWith(str);
            self.$label = self.$checkbox.next("label");

            var errorTips = '<div class="widget-error-tips" id="' + self.$checkbox.attr('id') + '_tips">' +
                '<span class="widget-error-tips-delta"></span>' +
                '<div class="widget-error-tips-wrap">' +
                '<div class="content error-tips-content">' +
                '<span id="' + self.$checkbox.attr('id') + '_tips_content"></span>' +
                '</div>' +
                '</div>' +
                '</div>';
            self.$label.append(errorTips);
            self.refresh();
            self.registerHandlers();
        },
        refresh: function() {
            var self = this;
            var isChecked = self.$checkbox.prop('checked');
            var checkboxText = self.$label.find('.text');
            var checkboxIcon = self.$label.find('.icon');
            checkboxText.removeClass('span-click').removeClass('span-disable-click');
            checkboxIcon.removeClass('checkbox-click').removeClass('checkbox-disable-click').removeClass('checkbox-disable-unchecked');
            if (self.$checkbox.prop('disabled')) {
                if (isChecked == true || isChecked == "checked") {
                    self.$checkbox.addClass("checkbox-checkbox").prop('data-checked', true);
                    checkboxText.addClass('span-disable-click');
                    checkboxIcon.addClass('checkbox-disable-click');
                } else {
                    self.$checkbox.addClass("checkbox-checkbox").prop('data-checked', false);
                    checkboxText.addClass('span-disable-click');
                    checkboxIcon.addClass('checkbox-disable-unchecked');
                }
            } else {
                if (isChecked == true || isChecked == "checked") {
                    self.$checkbox.addClass("checkbox-checkbox").prop('data-checked', true);
                    checkboxText.addClass('span-click');
                    checkboxIcon.addClass('checkbox-click');
                } else {
                    self.$checkbox.addClass("checkbox-checkbox").prop('data-checked', false);
                    checkboxText.removeClass('span-click');
                    checkboxIcon.removeClass('checkbox-click');
                }
            }
        },
        registerHandlers: function() {
            var self = this;
            self.unregisterHandlers();
            self.$label.on('mouseenter.tpCheckbox', function(e) {
                self.labelMouseEnter(e);
            });
            self.$label.on('mouseleave.tpCheckbox', function(e) {
                self.labelMouseLeave(e);
            });
            self.$label.on('click.tpCheckbox', function(e) {
                self.labelClick(e);
            });
        },
        labelMouseEnter: function() {
            var self = this;
            self.$label.find('.text').addClass('span-hover');
            if (self.$label.siblings('.checkbox-checkbox').prop('data-checked') === true) {
                self.$label.find('.icon').removeClass('checkbox-click')
                    .addClass('checkbox-hover-checked');
            } else {
                self.$label.find('.icon').addClass('checkbox-hover-unchecked');
            }
        },
        labelMouseLeave: function() {
            var self = this;
            if (self.$label.siblings('.checkbox-checkbox').prop('data-checked') === true) {
                self.$label.find('.icon').addClass('checkbox-click');
            }
            self.$label.find('.text').removeClass('span-hover');
            self.$label.find('.icon').removeClass('checkbox-hover-checked')
                .removeClass('checkbox-hover-unchecked');
        },
        labelClick: function(e) {
            e.preventDefault();
            var self = this;
            if (self.$checkbox.prop('disabled')) {
                return;
            }
            self.$label.find('.text').removeClass('span-hover');
            self.$label.find('.icon').removeClass('checkbox-hover-checked')
                .removeClass('checkbox-hover-unchecked');
            if (self.$label.siblings('.checkbox-checkbox').prop('data-checked') === false) {
                self.$label.siblings('.checkbox-checkbox').prop('data-checked', true);
                self.$label.find('.text').addClass('span-click');
                self.$label.find('.icon').addClass('checkbox-click');
            } else {
                self.$label.siblings('.checkbox-checkbox').prop('data-checked', false);
                self.$label.find('.text').removeClass('span-click');
                self.$label.find('.icon').removeClass('checkbox-click');
            }
            // In IE8, if a tag's dispaly is none(display: none;), we can not click it on the page.
            self.$checkbox.click();
        },
        unregisterHandlers: function() {
            var self = this;
            self.$label.off('.tpCheckbox');
        },
        destroy: function() {
            var self = this;
            self.unregisterHandlers();
            delete Object.getPrototypeOf(self).instances[self.id];
            $(self).removeData('tpCheckbox');
        }
    };

    $.fn.tpCheckbox = function(options) {
        this.each(function() {
            var tpcheckbox = $(this).data('tpCheckbox');
            if (!tpcheckbox) {
                var instance = new TPCheckbox();
                $(this).data('tpCheckbox', instance);
                instance.instances[this.id] = instance;
                instance.init(this.id);
            } else if (options === 'destroy' && tpcheckbox) {
                tpcheckbox.destroy();
            } else {
                $(this).data('tpCheckbox').refresh();
            }
        });
    };
})(jQuery);
