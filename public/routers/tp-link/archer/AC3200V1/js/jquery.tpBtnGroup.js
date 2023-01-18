(function($) {
    'use strict';

    function TPBtnGroup() {};

    TPBtnGroup.prototype = {
        constuctor: TPBtnGroup,
        instances: [],
        init: function(id) {
            var tag;
            var self = this;
            self.id = id;

            self.$btngroup = $('#' + id);

            var bTmp = self.$btngroup.children("b");
            if ($(bTmp).attr('class') !== undefined) {
                /*var tag = $(bTmp).attr('class').match(/\b(T_|t_)(\w+)\b/);*/
                tag = $(bTmp).attr('class');
            }
            $(bTmp).replaceWith("<label class='label-title" + " " + tag + "'>" + $(bTmp).html() + "</label>");
            self.$btngroup.addClass("pure-control-group");
            self.$btngroup.children("ul").addClass("button-group-container");
            self.$button = self.$btngroup.find("ul li button");
            self.$button.addClass("button-group-button").html('');
            var str = "<div class='button-group-wrap widget-wrap'></div>";
            self.$btngroup.children("ul").wrap(str);
            var btnCover = "<ul class='button-group-cover'></ul>";
            self.$btngroup.children("div").children("ul").after(btnCover);
            // If already selected, the button should be disabled.
            var errorTips = '<div class="widget-error-tips" id="' + self.$btngroup.attr('id') + '_tips">' +
                '<span class="widget-error-tips-delta"></span>' +
                '<div class="widget-error-tips-wrap">' +
                '<div class="content error-tips-content">' +
                '<span id="' + self.$btngroup.attr('id') + '_tips_content"></span>' +
                '</div>' +
                '</div>' +
                '</div>';
            self.$btngroup.find('.button-group-wrap').append(errorTips);
            self.refresh();
            self.registerHandlers();
        },
        refresh: function() {
            var self = this;
            var status = self.$btngroup.find('button.button-group-button.selected').val();
            if (status == 'on') {
                self.$btngroup.addClass('on').removeClass('off');
            } else {
                self.$btngroup.addClass('off').removeClass('on');
            }
        },
        clickBtn: function(e, me) {
            e.preventDefault();

            if ($(me).hasClass('selected')) {
                return;
            } else {
                $(me).addClass('selected');
                $(me).closest('li').siblings('li').find('button.button-group-button').removeClass('selected');
            }
        },
        registerHandlers: function() {
            var self = this;
            self.unregisterHandlers();
            self.$button.on('click.tpBtnGroup', function(e) {
                self.clickBtn(e, this);
                self.refresh();
            });

            self.$btngroup.children("div.button-group-wrap").children("ul.button-group-cover").on('click.tpBtnGroup', function(e) {
                if (self.$btngroup.hasClass("disabled")) {
                    return;
                } else if (self.$btngroup.hasClass("on")) {
                    self.$btngroup.find('button.button-group-button[value=off]').click();
                } else {
                    self.$btngroup.find('button.button-group-button[value=on]').click();
                }
            });
        },
        unregisterHandlers: function() {
            var self = this;
            $(self).off('.tpBtnGroup');
        },
        destroy: function() {
            var self = this;
            self.unregisterHandlers();
            delete Object.getPrototypeOf(self).instance[self.id];
            $(self).removeData('tpBtnGroup');
        }
    };

    $.fn.tpBtnGroup = function(options) {
        options = $.extend({}, options);

        this.each(function() {
            var tpbtngroup = $(this).data('tpBtnGroup');
            if (!tpbtngroup) {
                var instance = new TPBtnGroup();
                $(this).data('tpBtnGroup', instance);
                if (this.id == '' || this.id === undefined) {
                    $(this).prop('id', $.randomId('tpbtngroup'));
                }
                instance.instances[this.id] = instance;
                instance.init(this.id);
            } else if (options === 'destroy' && tpbtngroup) {
                tpbtngroup.destroy();
            } else {
                $(this).data('tpBtnGroup').refresh();
            }
        });
    };
})(jQuery);
