(function($) {
    'use strict';
    $.fn.tpGridSelect = function(options) {
        var defaultOptions = {
            colHeads: [s_str.sun, s_str.mon, s_str.tues, s_str.wed, s_str.thur, s_str.fri, s_str.sat],
            rowHeads: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00',
                '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
                '22:00', '23:00', '24:00'
            ],
            cellsInTd: 1,
            tableRowHeadWidth: 40,
            tableBodyWidth: 600,
            borderColor: "#e5e6e6",
            textInExample: n_str.parentCtrl.t_time
        }
        if (!options) {
            options = defaultOptions;
        } else {
            options = $.extend(defaultOptions, options);
        }

        $(this).css({
            position: 'relative'
        });

        var gridContainer = this;
        var tableRowHead = $('<table>', {
            cellpadding: '0',
            cellspacing: '0'
        });
        tableRowHead.css({
            float: 'left',
            width: options.tableRowHeadWidth,
            padding: '1px 0 0 1px',
            'border-collapse': 'collapse',
            'margin-top:': '1em'
        });
        tableRowHead.addClass('sche');
        var tmpHtml = '';
        for (var i = 0, l = options.rowHeads.length; i < l; i++) {
            tmpHtml += '<tr><th>' + options.rowHeads[i] + '</th></tr>';
        }
        tableRowHead.append(tmpHtml);
        $(this).append(tableRowHead);

        var tableBody = $('<table>', {
            cellspacing: 0,
            cellpadding: 0
        });
        tableBody.css({
            float: 'left',
            padding: '1px 0 0 1px',
            'border-collapse': 'collapse',
            width: options.tableBodyWidth,
            'table-layout': 'fixed'
        });
        tableBody.addClass('cale');

        $(this).append(tableBody);

        tmpHtml = '';
        tmpHtml += '<tr>';
        for (var i = 0, l = options.colHeads.length; i < l; i++) {
            tmpHtml += '<th id=\"col-head' + i + '\">' + options.colHeads[i] + '</th>';
        }
        tmpHtml += '</tr>';
        tableBody.append(tmpHtml);

        for (var i = 0, l = options.rowHeads.length - 1; i < l; i++) {
            tableBody.append('<tr></tr>');
            for (var j = 0, m = options.colHeads.length; j < m; j++) {
                var tdTmp = $('<td>');
                tableBody.find('tr:eq(' + (i + 1) + ')').append(tdTmp);
                for (var k = 0; k < options.cellsInTd; k++) {
                    var spanTmp = $('<span>');
                    spanTmp.attr('id', i * m + j);
                    tdTmp.append(spanTmp);
                    spanTmp.data('selected', false);
                }
            }
        }
        $(tableBody).find('th,td').css('border', '1px solid' + options.borderColor);
        $(gridContainer).find('td span').css({
            width: tableBody.width() / options.colHeads.length - 3,
            padding: 0
        });

        $(tableRowHead).find('tr').css({
            height: $(tableBody.find('tr:eq(1)')).height() + 'px'
        });
        $(tableRowHead).css({
            'margin-top': $(tableBody.find('tr:eq(0)')[0]).height() - $(tableRowHead.find('tr')[0]).height() / 2 + 2 + 'px'
        });
        $(gridContainer).css('overflow', 'hidden');

        $(gridContainer).after('<span class="timeExam"></span><label class="timeText">' + options.textInExample + '</label>');
        $('.timeExam').css({
            float: 'left',
            height: '20px',
            width: '20px',
            margin: '3px',
            'margin-left': $(tableRowHead).width(),
            background: '#96cc56'
        });
        $('.timeText').css({
            'position': 'relative',
            'line-height': 26 + 'px'
        });

        var chooseSpan = function(evt) {
            clearEventBubble(evt);
            if ($(this).hasClass('sel')) {
                $(this).removeClass('sel');
                $(this).data('selected', false);
            } else {
                $(this).addClass('sel');
                $(this).data('selected', true);
            }
        };

        var selectSpan = function(span, mode) {
            if (mode === true) {
                span.addClass('sel');
            } else if (span.hasClass('sel')) {
                span.removeClass('sel');
            }
        };

        var unselectSpan = function(span) {
            if (span.data('selected') === true) {
                if (!span.hasClass('sel')) {
                    span.addClass('sel');
                }
            } else if (span.data('selected') === false) {

                if (span.hasClass('sel')) {
                    span.removeClass('sel');
                }
            }
        };

        var setSpansData = function() {
            $(gridContainer).find('table.cale span').each(function() {
                if ($(this).hasClass('sel')) {
                    $(this).data('selected', true);
                } else {
                    $(this).data('selected', false);
                }
            });
        };

        $(gridContainer).find('table.cale span').css('cursor', 'not-allowed').parent().css('cursor', 'not-allowed');
        var colHeadsEnable = false;
        return {
            startGridSelect: function() {
                $(gridContainer).find('table.cale span').css('cursor', 'pointer').parent().css('cursor', 'pointer');
                $(gridContainer).find('table.cale span').each(function() {
                    $(this).on('click.grid', chooseSpan);
                });

                var eventBind = false;
                $(gridContainer).on('mouseenter.grid', function() {
                        if (eventBind === true) {
                            return;
                        }
                        eventBind = true;
                        $(gridContainer).on('mousedown.grid', function() {
                            var isSelect = true;
                            var evt = window.event || arguments[0];
                            var startX;
                            var startY;
                            if ((!!window.ActiveXObject || 'ActiveXObject' in window)) {
                                startX = (evt.clientX) - $(gridContainer).offset().left;
                                startY = (evt.clientY) - $(gridContainer).offset().top;
                            } else {
                                startX = (evt.x || evt.clientX) - $(gridContainer).offset().left;
                                startY = (evt.y || evt.clientY) - $(gridContainer).offset().top;
                            }

                            var startSpan = null;
                            var spanGroup = $(gridContainer).find('table.cale span');
                            for (var i = 0; i < spanGroup.length; i++) {
                                var span = $(spanGroup[i]);
                                var spanStartX = span.position().left;
                                var spanStartY = span.position().top;
                                var spanEndX = spanStartX + span.width();
                                var spanEndY = spanStartY + span.height();
                                if (startX > spanStartX && startY > spanStartY && startX < spanEndX && startY < spanEndY) {
                                    startSpan = span;
                                    break;
                                }
                            }

                            var selectMode = startSpan ? (startSpan.data('selected') ? false : true) : true;
                            var selDiv = $('<div></div>');
                            selDiv.css({
                                'position': 'absolute',
                                'width': '0px',
                                'height': '0px',
                                'font-size': '0px',
                                'margin': '0px',
                                'padding': '0px',
                                'border': '1px dashed #0099FF',
                                'background-color': '#C3D5ED',
                                'z-index': '1000',
                                'filter': 'alpha(opacity:60)',
                                'opacity': '0.6',
                                'display': 'none'
                            });

                            $(gridContainer).append(selDiv);

                            selDiv.css({
                                'left': startX + 'px',
                                'top': startY + 'px'
                            });

                            var _x = null;
                            var _y = null;
                            clearEventBubble(evt);

                            var spansTmp = $(gridContainer).find('table.cale span');
                            var eventObject = 'html';
                            $(eventObject).on('mousemove.grid', function() {
                                var evt = window.event || arguments[0];
                                if (isSelect) {
                                    selDiv.show();
                                    if ((!!window.ActiveXObject || 'ActiveXObject' in window)) {
                                        _x = (evt.clientX) - $(gridContainer).offset().left;
                                        _y = (evt.clientY) - $(gridContainer).offset().top;

                                    } else {
                                        _x = (evt.x || evt.clientX) - $(gridContainer).offset().left;
                                        _y = (evt.y || evt.clientY) - $(gridContainer).offset().top;
                                    }

                                    selDiv.css({
                                        'left': Math.min(_x, startX) + 'px',
                                        'top': Math.min(_y, startY) + 'px',
                                        'width': Math.abs(_x - startX) + 'px',
                                        'height': Math.abs(_y - startY) + 'px'
                                    });

                                    var _l = selDiv.offset().left,
                                        _t = selDiv.offset().top;
                                    var _w = selDiv.width(),
                                        _h = selDiv.height();
                                    spansTmp.each(function() {
                                        var sl = $(this).width() + $(this).offset().left;
                                        var st = $(this).height() + $(this).offset().top;
                                        if (sl > _l && st > _t && $(this).offset().left < _l + _w && $(this).offset().top < _t + _h) {
                                            selectSpan($(this), selectMode);
                                        } else {
                                            unselectSpan($(this));
                                        }
                                    });


                                }
                                clearEventBubble(evt);
                            });
                            $(eventObject).on('mouseup.grid', function() {
                                $(gridContainer).off('mousedown.grid');
                                $(eventObject).off('mousemove.grid');
                                $(eventObject).off('mouseup.grid');
                                eventBind = false;
                                $(gridContainer).trigger('mouseover');
                                isSelect = false;
                                if (selDiv) {
                                    selDiv.remove();

                                }
                                setSpansData();
                                _x = null;
                                _y = null;
                                selDiv = null;
                                startX = null;
                                startY = null;
                                evt = null;
                            })
                        });
                    })
                    .mouseleave(function() {});

            },
            stopGridSelect: function() {
                $(gridContainer).find('table.cale span').css('cursor', 'not-allowed').parent().css('cursor', 'not-allowed');
                $(gridContainer).find('table.cale span').off('click.grid');
                $(gridContainer).off('.grid');
                $('html').off('.grid');
            },
            initGridSelectVal: function(array) {
                if (array === undefined) {
                    return;
                }
                var reverse = true;
                if (reverse === true) {
                    if (array.length != options.colHeads.length) {
                        return;
                    }
                    var spanGroup = $(gridContainer).find('table.cale td span');
                    for (var i = 0; i < spanGroup.length; i++) {
                        var row = i % options.colHeads.length;
                        var col = Math.floor(i / (options.colHeads.length));
                        if (array[row].charAt(col) == 1) {
                            $(spanGroup[i]).addClass('sel').data('selected', true);
                        } else {
                            $(spanGroup[i]).removeClass('sel').data('selected', false);
                        }
                    }
                }
            },

            getGridSelectVal: function() {
                var reverse = true;
                var result = [];
                for (var i = 0; i < options.colHeads.length; i++) {
                    result[i] = '';
                }
                if (reverse === true) {
                    var spanGroup = $(gridContainer).find('table.cale td span');
                    for (var i = 0; i < spanGroup.length; i++) {
                        var row = i % (options.colHeads.length);
                        if ($(spanGroup[i]).hasClass('sel')) {
                            result[row] += '1';

                        } else {
                            result[row] += '0';
                        }
                    }
                }

                return result;
            },

            setColHeadEnable: function(mode) {
                if (mode === undefined) return;
                var thGroup = $(gridContainer).find('table.cale tr:eq(0) th');
                thGroup.addClass('sel');
                if (mode == true) {
                    colHeadsEnable = true;
                    thGroup.addClass('sel');
                    thGroup.each(function() {
                        $(this).on('click.grid', function() {
                            if (!$(this).hasClass('sel')) {
                                $(this).addClass('sel');
                            } else {
                                $(this).removeClass('sel');
                            }
                        });
                    });
                } else {
                    colHeadsEnable = false;
                    thGroup.removeClass('sel');
                    thGroup.each(function() {
                        $(this).off('.grid');
                    });
                }
            },

            addValueWithStartEnd: function(start, end) {
                if (end < start) {
                    return;
                }
                var spanTmp = $(gridContainer).find('table.cale tr td span');
                var addInCol = function(colIndex, start, end) {
                    for (var i = start; i < end; i++) {
                        $(spanTmp[i * options.colHeads.length + colIndex]).addClass('sel');
                        $(spanTmp[i * options.colHeads.length + colIndex]).data('selected', true);
                    }
                };
                var clearInCol = function(colIndex) {
                    for (var i = 0; i < options.rowHeads.length - 1; i++) {
                        $(spanTmp[i * options.colHeads.length + colIndex]).removeClass('sel');
                        $(spanTmp[i * options.colHeads.length + colIndex]).data('selected', false);
                    }
                };
                if (colHeadsEnable === true) {
                    var thTmp = $(gridContainer).find('table.cale tr:eq(0) th');
                    for (var i = 0; i < thTmp.length; i++) {
                        if ($(thTmp[i]).hasClass('sel')) {
                            addInCol(i, start, end);
                        } else {
                            clearInCol(i);
                        }
                    }
                } else {
                    for (var i = 0; i < options.colHeads.length; i++) {
                        addInCol(i, start, end);
                    }
                }

            },

            resetGridValue: function() {
                var spanTmp = $(gridContainer).find('table.cale tr td span');
                spanTmp.each(function() {
                    $(this).data('selected', false);
                    $(this).removeClass('sel');
                });
            }
        }

    };

    function clearEventBubble(evt) {
        if (evt.stopPropagation) evt.stopPropagation();
        else evt.cancelBubble = true;
        if (evt.preventDefault) evt.preventDefault();
        else evt.returnValue = false;
    }
})(jQuery);
