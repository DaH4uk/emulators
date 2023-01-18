(function($) {
    'use strict';

    function TPTable() {}

    TPTable.prototype = {
        constructor: TPTable,
        instances: [],
        init: function(id, callback) {
            var tag;
            var self = this;
            self.id = id;
            if ($.isFunction(callback)) {
                self.initFunc = callback;
                self.initFunc();
            }
            self.$table = $("#" + id);
            self.$table.addClass("pure-table pure-table-bordered");
            self.$table.attr("width", "100%");
            self.$op = self.$table.prev("div.table-op");
            self.$op.find("div.table-btn span").addClass("table-icon");

            self.$refreshIcon = self.$op.find(".refresh-icon");
            tag = self.$refreshIcon.next("label").first().html();
            self.$refreshIcon.wrap("<div class='refresh-icon-wrap inline'></div>");
            self.$refresh = self.$refreshIcon.parent("div.refresh-icon-wrap");
            self.$refresh.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$refreshLabel = self.$refresh.find("label.table-icon-text");
            self.$refresh.next("label").first().remove();

            self.$addIcon = self.$op.find(".add-icon");
            tag = self.$addIcon.next("label").first().html();
            self.$addIcon.wrap("<div class='add-icon-wrap inline'></div>");
            self.$add = self.$addIcon.parent("div.add-icon-wrap");
            self.$add.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$addLabel = self.$add.find("label.table-icon-text");
            self.$add.next("label").first().remove();

            self.$deleteIcon = self.$op.find(".delete-icon");
            tag = self.$deleteIcon.next("label").first().html();
            self.$deleteIcon.wrap("<div class='del-icon-wrap inline'></div>");
            self.$del = self.$deleteIcon.parent("div.del-icon-wrap");
            self.$del.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$delLabel = self.$del.find("label.table-icon-text");
            self.$deleteIcon.next("label").first().css("color", "#f00");
            self.$del.next("label").first().remove();

            self.$deleteAllIcon = self.$op.find(".delete-all-icon");
            tag = self.$deleteAllIcon.next("label").first().html();
            self.$deleteAllIcon.wrap("<div class='del-all-icon-wrap inline'></div>");
            self.$delAll = self.$deleteAllIcon.parent("div.del-all-icon-wrap");
            self.$delAll.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$delAllLabel = self.$delAll.find("label.table-icon-text");
            self.$deleteAllIcon.next("label").first().css("color", "#f00");
            self.$delAll.next("label").first().remove();

            self.$resetIcon = self.$op.find(".reset-icon");
            tag = self.$resetIcon.next("label").first().html();
            self.$resetIcon.wrap("<div class='reset-icon-wrap inline'></div>");
            self.$reset = self.$resetIcon.parent("div.reset-icon-wrap");
            self.$reset.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$resetLabel = self.$reset.find("label.table-icon-text");
            self.$reset.next("label").first().remove();

            self.$blockIcon = self.$op.find(".block-icon");
            tag = self.$blockIcon.next("label").first().html();
            self.$blockIcon.wrap("<div class='block-icon-wrap inline'></div>");
            self.$block = self.$blockIcon.parent("div.block-icon-wrap");
            self.$block.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$blockLabel = self.$block.find("label.table-icon-text");
            self.$block.next("label").first().remove();

            self.$tableIcon = self.$op.find("span.table-icon");

            self.registerHandlers();
        },
        registerHandlers: function() {
            var self = this;
            self.unregisterHandlers();

            self.$refreshIcon.on('click.tpTable', function() {
                self.refreshIconClick();
            });
            self.$addIcon.on('click.tpTable', function() {
                self.addIconClick();
            });
            self.$deleteIcon.on('click.tpTable', function() {
                /*self.deleteIconClick();*/
            });
            self.$deleteAllIcon.on('click.tpTable', function() {
                /*self.deleteAllIconClick();*/
            });
            self.$blockIcon.on('click.tpTable', function() {
            
            });
            self.$refreshLabel.on('click.tpTable', function() {
                self.$refreshIcon.click();
            });
            self.$addLabel.on('click.tpTable', function() {
                self.$addIcon.click();
            });
            self.$delLabel.on('click.tpTable', function() {
                self.$deleteIcon.click();
            });
            self.$delAllLabel.on('click.tpTable', function() {
                self.$deleteAllIcon.click();
            });
            self.$resetLabel.on('click.tpTable', function() {
                self.$resetIcon.click();
            });
            self.$blockLabel.on('click.tpTable', function() {
                self.$blockIcon.click();
            });
            self.$tableIcon.hover(
                function() {
                    $(this).addClass('span-hover');
                },
                function() {
                    $(this).removeClass('span-hover');
                });
        },
        refreshIconClick: function() {
            var self = this;
            var tr = self.$table.find("tbody tr:not(.nd)");
            tr.remove();
            if (self.initFunc != undefined) {
                self.initFunc();
            }
        },
        addIconClick: function() { 
            var self = this;
            self.$table.find("tbody tr.space-tr").remove();
            var tr = self.$table.find("tr.nd");
            if (tr.length == 0) {
                return;
            }
            tr.removeClass("nd");
            tr.addClass("editor-container");
            tr.children("td").css({
                textAlign: "left",
                border: "1px solid rgb(150, 204, 86)",
                paddingLeft: "40px"
            });
            tr.find("div.button-container").addClass("table-btn");
            self.disableClick();
            tr.find("button").click(function() {
                $(this).parents("tr.editor-container").addClass("nd");
            });
            $.lock();
            var grid = 0;
            self.$table.find("thead tr th").each(function() {
                grid++;
            });
            $.addEmptyBody(self.$table, grid);

            var turnpage = 0;
            if (self.$table.next('.table-bottom-pages').length != 0) {
                turnpage = 31;
            }

            self.$table.after('<div class = "mask"></div><div class = "mask"></div>');

            self.$table.next().show().css('top', '0').height(83 + self.$table.position().top);

            tr.show().height();

            self.$table.next().next().show().css('bottom', '0').css('top', 'auto').height(self.$table.height() - 83 - tr.height() + turnpage);

        },
        disableClick: function() { 
            var self = this;
            self.$refreshIcon.off();
            self.$refreshLabel.off();
            self.$addIcon.off();
            self.$addLabel.off();
            self.$deleteIcon.off();
            self.$delLabel.off();
            self.$deleteAllIcon.off();
            self.$delAllLabel.off();
            self.$resetIcon.off();
            self.$resetLabel.off();
        },
        unregisterHandlers: function() {
            var self = this;
            self.$table.off('.tpTable');
        },
        destroy: function() {
            var self = this;
            self.unregisterHandlers();
            delete Object.getPrototypeOf(self).instances[self.id];
            $(self).removeData('tpTable');
        }
    };

    $.fn.tpTable = function(options) {
        this.each(function() {
            var tptable = $(this).data('tpTable');
            if (!tptable) {
                var instance = new TPTable();
                $(this).data('tpTable', instance);
                instance.instances[this.id] = instance;
                instance.init(this.id, options);
            } else if (options === 'destroy' && tptable) {
                tptable.destroy();
            } else {
                tptable.refreshIconClick();
            }
        });
    };

    $(function() {
        if (typeof Object.getPrototypeOf !== 'function') {
            if (typeof 'test'.__proto__ === 'object') {
                Object.getPrototypeOf = function(object) {
                    return object.__proto__;
                };
            } else {
                Object.getPrototypeOf = function(object) {
                    return object.constructor.prototype;
                };
            }
        }
    });
})(jQuery);

jQuery.extend({
    tablePages: function(id, size) {
        var $table = $(id);
        var pagerLength;
        if (arguments[2] == null)
            pagerLength = 7;
        else
            pagerLength = arguments[2];

        var currentPage = 0;
        var pageSize = size;

        $table.next(".table-bottom-pages").remove();
        
        if (($table.find("tbody tr:not(.nd)").length) <= size || $table.find('tr').hasClass('space-tr') || pageSize == 0) {
            return;
        }
        $table.bind("repaginate", function() {
            $table.find("tbody tr:not(.nd)").hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
            var leftLength = Math.floor((pagerLength - 1) / 2);
            var rightLength = Math.round((pagerLength - 1) / 2);
            $("span[id$=" + prevIconId + "]").show();
            leftDot.remove();
            rightDot.remove();
            var page;
            if (numPages > pagerLength + 2) {
                if (currentPage > leftLength + 1) {
                    leftDot.insertAfter($('#1-' + prevIconId));
                    for (page = 2; page < Math.min(currentPage - leftLength + 1, numPages - pagerLength); page++) {
                        $("#" + page + "-" + prevIconId).hide();
                    }

                }
                if (currentPage < numPages - rightLength - 2) {
                    rightDot.insertBefore($('#' + numPages +'-' + prevIconId));
                    for (page = Math.max(currentPage + rightLength + 2, pagerLength + 2); page < numPages; page++) {
                        $("#" + page + "-" + prevIconId).hide();
                    }
                }
            }
        });
        var numRows = $table.find("tbody tr:not(.nd)").length;
        var numPages = Math.ceil(numRows / pageSize);
        var prevIconId = $.randomId('prev');
        var nextIconId = $.randomId('next');
        var leftDot = $('<span id="' + ("left-" + prevIconId) + '">...</span>');
        var rightDot = $('<span id="' + ("right-" + prevIconId) + '">...</span>');
        var $pager = $("<div class='table-bottom-pages'><span id='" + prevIconId + "' class='page'></span></div>");
        for (var page = 1; page <= numPages; page++) {
            $("<span id='" + (page + "-" + prevIconId) + "'>" + page + "</span>")
                .on("click", {
                    "newPage": page - 1
                }, function(event) {
                    currentPage = event.data["newPage"];
                    if ($(this).hasClass("click-page")) {
                        return;
                    }
                    $(this).siblings("span").removeClass("click-page");
                    $(this).addClass("click-page");
                    $table.trigger("repaginate");
                    if ((currentPage - 1) < 0) {
                        $("#" + prevIconId).addClass('gray');
                        $("#" + nextIconId).removeClass('gray');
                    } else if ((currentPage + 1) >= numPages) {
                        $("#" + nextIconId).addClass('gray');
                        $("#" + prevIconId).removeClass('gray');
                    } else {
                        $("#" + prevIconId).removeClass('gray');
                        $("#" + nextIconId).removeClass('gray');
                    }


                })
                .appendTo($pager);
        }
        var next = $("<span id='" + nextIconId + "' class='page right'></span>");
        $pager.append(next);
        $pager.insertAfter($table);

        $("#" + prevIconId).on("click", function() {
            var $spanBro = $(this).siblings("span");
            var prev = Number($(this).siblings("span.click-page").text()) - 1;
            currentPage = prev - 1;
            if (currentPage < 0) {
                return;
            }
            $spanBro.removeClass("click-page");
            $("#" + prev + "-" + prevIconId).addClass("click-page");
            $table.trigger("repaginate");
            if ((currentPage - 1) < 0) {
                $(this).addClass('gray');
            }
            $("#" + nextIconId).removeClass('gray');
        });

        $("#" + nextIconId).on("click", function() {
            var $spanBro = $(this).siblings("span");
            var next = Number($(this).siblings("span.click-page").text()) + 1;
            currentPage = next - 1;
            if (currentPage >= numPages) {
                return;
            }
            $spanBro.removeClass("click-page");
            $("#" + next + "-" + prevIconId).addClass("click-page");
            $table.trigger("repaginate");
            if ((currentPage + 1) >= numPages) {
                $(this).addClass('gray');
            }
            $("#" + prevIconId).removeClass('gray');
        });

        $("span#1-" + prevIconId).click();
        $table.trigger("repaginate");
    },

    initTableHead: function(table, array) {
        var header = table.children("thead");
        header.append("<tr class='head'></tr>");

        for (var i = 0; i < array.length; i++) {
            var th;
            if (array[i] && array[i].text) {
                th = $("<th class='table-head' ><span>" + array[i].text + "</span></th>");
            }
            if (array[i] && array[i].width) {
                th.css('width', array[i].width);
            }
            header.children("tr").append(th);
        }
    },

    initTableBody: function(table, array) {
        if (array.length == 0) {
            var grid = 0;
            table.find("thead tr th").each(function() {
                grid++;
            });
            if (table.find("tbody tr.space-tr").length == 0) {
                $.addEmptyBody(table, grid);
            }
            return;
        }
        var body = table.children("tbody");
        for (var i = 0; i < array.length; i++) {
            var tr = $("<tr></tr>");

            for (var j = 0; j < array[i].length; j++) {
                if (array[i][j] && array[i][j].text) {
                    var td = "<td class='table-content'>" + array[i][j].text + "</td>";
                }
                if (array[i][j] && array[i][j].width) {
                    $(td).width(array[i][j].width);
                }
                tr.append(td);
            }
            body.append(tr);
        }
        $.bodyStyleUpdate(table);
        body.children("tr:not(.nd)").find("input[type='checkbox']:not(.checkbox-checkbox)").tpCheckbox();
    },

    addEmptyBody: function(table, grid) {
        var body = table.children("tbody");
        var trFirst = body.find("tr.first");
        var tr = $("<tr class='space-tr'></tr>");
        for (var i = 0; i < grid; i++) {
            var td = "<td>--</td>";
            tr.append(td);
        }
        if (trFirst.length == 0) {
            body.prepend(tr);
        } else {
            trFirst.before(tr);
        }
    },

    appendTableRow: function(table, data) {
        var body = table.children("tbody");
        var tr = $("<tr></tr>");
        for (var j = 0; j < data.length; j++) {
            var td = "<td class='table-content' width='" + data[j].width + "'>" + data[j].text + "</td>";
            tr.append(td);
        }
        body.append(tr);
    },

    bodyStyleUpdate: function(table) {
        table.find("span.enable-icon").click(function() {
            $(this).removeClass("enable-icon");
            $(this).addClass("disable-icon");
        });

        table.find("span.disable-icon").click(function() {
            $(this).removeClass("disable-icon");
            $(this).addClass("enable-icon");
        });

        table.find("span.edit-modify-icon").click(function() {
            var body = $(this).parents("tbody");
            var editTr = body.find("tr.nd");
            var tr = $(this).parent("td").parent("tr");
            tr.addClass("edit-tr");
            tr.prev("tr:not(.nd)").children("td").addClass("edit-td-top");
            tr.children("td").first().css({
                "border-left-color": "rgb(150, 204, 86)"
            });
            tr.after(editTr);
            editTr.removeClass("nd");
            editTr.addClass("editor-container");
            editTr.children("td").addClass("editor-container-text");
            editTr.find("div.button-container").addClass("table-btn");

            $.lock();

            var turnpage = 0;
            if (table.next('.table-bottom-pages').length != 0) {
                turnpage = 31;
            }

            table.after('<div class = "mask"></div><div class = "mask"></div>');

            table.next().show().css('top', '0').height(editTr.position().top + table.position().top);
            table.next().next().show().css('bottom', '0').css('top', 'auto').height(table.height() - editTr.position().top - editTr.height() + turnpage);

            editTr.find("button").click(function() {
                $(this).parents("tr.editor-container").addClass("nd");
            });
        });

        if (table.find('td.table-content').find(".edit-modify-icon") || table.find('td.table-content').find(".disable-icon")) {
            table.find("span.edit-modify-icon").parent('td.table-content').css({
                width: "60px"
            });
        }
    }
});
