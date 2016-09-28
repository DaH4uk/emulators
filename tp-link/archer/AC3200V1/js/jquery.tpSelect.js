(function($) {
    'use strict';
    $.fn.tpSelect = function(options) {
        options = $.extend({
            render: function(option) {
                return $("<li data-val='" + option.val() + "'>" + option.text() + "</li>");
            },
            className: '',
            refresh: 0
        }, options);

        return this.each(function() {

            var tpselect = $(this).data('tpSelect');
            if (!tpselect) {
                $(this).data('tpSelect', this.id);
                
            } else if (tpselect && options.refresh == 1) {
                $('#' + '_' + this.id).remove();
            } else {
                return;
            }

            var select = $(this);
            var bTmp = select.prev('b');
            var title = bTmp.html();
            var bClass = bTmp.prop('class');
            bTmp.addClass('nd');

            if (title){
            var str = '<div class="select-title"><label class="label-title">' + title +
                '</label></div><div class="tp-select"><div class="select-box"></div><div class="select-icon-container"><span class="select-icon"></span></div></div>';
            } else {
                var str = '<div class="tp-select"><div class="select-box"></div><div class="select-icon-container"><span class="select-icon"></span></div></div>';
            }
            var selectBoxContainer = $('<div>', {
                /* class: 'select-container',*/
                html: str
            });
            selectBoxContainer.addClass('select-container');
            selectBoxContainer.prop('id', '_' + this.id);

            /* add size class */
            selectBoxContainer.addClass(select.prop('class'));
            selectBoxContainer.find('div.select-title').addClass(bClass);

            if (select.prop('disabled')) {
                selectBoxContainer.addClass('disabled');
            }
            var dropDown = $('<ul>', {
                /* class: 'dropDown'*/
            });
            dropDown.addClass('drop-down');

            var selectBox = selectBoxContainer.find('.select-box');
            var iconContainer = selectBoxContainer.find('.select-icon-container');

            if (options.className) {
                dropDown.addClass(options.className);
            }

            select.find('option').each(function(i) {
                var option = $(this);

                var li = options.render(option);

                li.click(function() {

                    selectBox.html(option.text());
                    dropDown.trigger('hide');

                    li.siblings('li').removeClass('selected');
                    li.addClass('selected');

                    // When a click occurs, we add selected option to select's data.
                    if (select.data('value') === option.val()) {
                        return;
                    }
                    select.data('value', option.val());
                    select.data('text', option.text());
                    defaultSelectItem = $(this);
                    select.click();
                    return false;
                });
                if (i == select.prop('selectedIndex')) {
                    selectBox.html(option.text());
                    li.click();
                }

                // Skip the element, if it has 'skip' data.
                if (option.data('skip')) {
                    return true;
                }

                dropDown.append(li);
            });
            selectBoxContainer.find('.tp-select').append(dropDown.hide());
            select.hide().after(selectBoxContainer);

            //ban backspace
            function banBackSpace(e) {
                var ev = e || window.event;
                var obj = ev.target || ev.srcElement;
                var t = obj.type || obj.getAttribute('type');
                var vReadOnly = obj.getAttribute('readonly');
                var vEnable = obj.getAttribute('enabled');
                vReadOnly = (vReadOnly === undefined) ? false : vReadOnly;
                vEnable = (vEnable === undefined) ? true : vEnable;
                var flag1 = (ev.keyCode == 8 && (t == 'password' || t == 'text' || t == 'textarea') && (vReadOnly == true || vEnable == true));
                var flag2 = (ev.keyCode == 8 && t != 'password' && t != 'text' || t != 'textarea');
                if (flag2 || flag1)
                    return false;
            }

            //smart select
            var selectStr = '';
            var searchBar;
            var defaultSelectItem = dropDown.children('.selected');
            var selectItem;
            var hasMatched = false;

            function smartSelect(event) {
                document.onkeypress = banBackSpace;
                document.onkeydown = banBackSpace;
                window.onkeydown = banBackSpace;
                window.onkeypress = banBackSpace;

                if (event === undefined) {
                    selectStr = '';
                    searchBar.text(selectStr);
                } else {
                    if ($.code2key(event) == 'back') {
                        selectStr = selectStr.substr(0, selectStr.length - 1);
                        searchBar.text(selectStr);
                    } else if ($.code2key(event) == 'enter') {
                        if (!hasMatched) {
                            selectItem = defaultSelectItem;
                        }
                        selectBox.html(selectItem.text());
                        defaultSelectItem = selectItem;
                        // When a click occurs, we add selected option to select's data.
                        if (select.data('value') === selectItem.attr('data-val')) {
                            return;
                        }
                        select.data('value', selectItem.attr('data-val'));
                        select.data('text', selectItem.text());
                        select.click();
                        dropDown.trigger('hide');
                        return;
                    } else {
                        selectStr += $.code2key(event);
                        searchBar.text(selectStr);
                    }
                }
                var drop_children = dropDown.children();
                var drop_children_show = [];
                for (var i = 0; i < drop_children.length; i++) {
                    var quote = /([^\w])/g;
                    var patternStr = selectStr.replace(quote, '\\$1');
                    var regex = new RegExp(patternStr, 'g');
                    var rs = regex.test(drop_children.eq(i).text().toUpperCase());
                    if (!rs) {
                        drop_children.eq(i).addClass('nd');
                    } else {
                        drop_children.eq(i).removeClass('nd');
                        drop_children_show.push(drop_children.eq(i));
                    }
                    drop_children.eq(i).removeClass('selected');
                }

                if (drop_children_show.length > 1) {
                    drop_children_show[1].addClass('selected');
                    selectItem = dropDown.children('.selected');
                    if (selectStr.length == 0) {
                        selectItem = dropDown.children('.selected');
                        selectItem.removeClass('selected');
                        defaultSelectItem.addClass('selected');
                    }
                    hasMatched = true;
                } else {
                    hasMatched = false;
                }

            }

            //select init

            (function selectInit() {
                searchBar = $('<li>', {
                    html: ''
                });
                searchBar.css({
                    'cursor': 'default',
                    'border-bottom': '1px solid #ccc'
                });
                dropDown.children().eq(0).before(searchBar);
                searchBar.mouseenter(function() {
                    $(this).css({
                        'background': '#fff',
                        'color': '#4d4d4d'
                    })
                });
                searchBar.click(function(e) {
                    e.preventDefault();
                    return false;
                });
            })();

            function selectReset() {
                searchBar.text('');
                selectStr = '';
                smartSelect();
                document.onkeypress = null;
                document.onkeydown = null;
                window.onkeydown = null;
                window.onkeypress = null;
            }

            //            var tips;
            //            var lastDrop = dropDown.children().last();
            //            dropDown.children().each(function () {
            //                $(this).hover(
            //                    function () {
            //                        tips = $('<div>', {
            //                            html: '<span class="widget-error-tips-delta"></span>' +
            //                                '<div class="widget-error-tips-wrap">' +
            //                                '<div class="content error-tips-content">' +
            //                                '<span >' + $(this).text() + '</span>' +
            //                                '</div>' +
            //                                '</div>',
            //                            'class': 'widget-error-tips'
            //                        })
            //                        $(this).append(tips);
            //                        if ($(this)[0] === lastDrop[0]) {
            //                            dropDown.append($('li', {html: '1'}))
            //                        }
            //                        $('.widget-error-tips').toggle("slow");
            //                    },
            //                    function () {
            //                        if ($(this) === lastDrop) {
            //                            dropDown.children().last().remove();
            //                        }
            //                        $('.widget-error-tips').remove();
            //                    }
            //                );
            //            });
            // Binding custom show and hide events on the dropDown:

            dropDown.on('show', function() {
                if (dropDown.is(':animated')) {
                    return false;
                }
                selectBox.addClass('expanded');
                dropDown.slideDown('fast');
                var rows = dropDown.children('li');
                rows.each(function() {
                    if ($(this).height() > 40) {
                        $(this).css('line-height', '20px');
                    }
                });
                $(document).bind("keyup", smartSelect);

            }).on('hide', function() {
                if (dropDown.is(':animated')) {
                    return false;
                }
                selectBox.removeClass('expanded');
                dropDown.slideUp('fast');
                $(document).unbind("keyup", smartSelect);
                selectReset();
            }).on('toggle', function() {
                if (selectBox.hasClass('expanded')) {
                    dropDown.trigger('hide');
                } else {
                    dropDown.trigger('show');
                }
            });

            // Do not return, cuz if there are more than one select, click one, another should slide up.
            selectBox.click(function() {
                if (select.prop('disabled')) {
                    return false;
                }
                dropDown.trigger('toggle');
                //return false; 
            });

            iconContainer.click(function() {
                if (select.prop('disabled')) {
                    return false;
                }
                dropDown.trigger('toggle');
                //return false;
            });

            $(document).click(function() {
                dropDown.trigger('hide');
                //unbind the keyboard event
            });
        });
    }

})(jQuery);
