Page = Backbone.Model.extend({
    idAttribute: "page",
    getResource: function (j) {
        var m = this.get("issue"),
            s = m.get("prefixes"),
            s = s ? s[this.get("page")] + "/" : this.get("page") + "/";
        return m.get("path") + s + j
    }
});

var PageList = Backbone.Collection.extend({
    model: Page
});
PageView = Backbone.View.extend({
    tagName: "div",
    initialize: function () {
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.model, "change:regions", this.showRegions);
        this.render()
    },
    render: function () {
        this.$el.html('<div class="gradient"></div><div class="loader"><i></i></div>')
    },
    loadPage: function () {

        var j = this,
            m = $("<img />");
        m.load(function () {
            j.$el.find(".loader").remove();
            $(this).css({
                width: "100%",
                height: "100%"
            });
            $(this).appendTo(j.$el);
            "single" == $("#magazine").turn("display") && $("#magazine .p0").data("f").tPage == j.model.get("page") && ($("#magazine .p0").find("*").remove(),
                j.$el.clone(!1).css({
                    opacity: "0.2",
                    overflow: "hidden"
                }).transform("rotateY(180deg)", "50% 50%").appendTo($("#magazine .p0")))
        });
        m.attr("src", this.model.getResource("large.jpg"));

    },
    showRegions: function () {}
});
// 主体
Magazine = Backbone.View.extend({
    el: $("#magazine"),
    events: {
        turning: "turning",
        turned: "turned",
        tap: "tap",
        doubleTap: "doubleTap",
        pinching: "pinching",
        scrolling: "scrolling",
        zooming: "zooming",
        zoomed: "zoomed",
        missing: "missing",
        removePage: "removePage"
    },
    initialize: function (j) {
        this.pages = new PageList
    },
    render: function () {
        this.$el.turn({
            width: this.model.get("pageWidth"),
            height: this.model.get("pageHeight"),
            pages: this.model.get("pages"),
            duration: 500,
            responsive: !0,
            autoCenter: !0,
            smartFlip: !0,
            swipe: !0,
            cornerPosition: "50px 20px",
        })
    },
    turning: function () {
        $.isTouch ? this.$el.removeClass("animated") : this.$el.addClass("animated")
    },
    turned: function (j, m) {
        $.isTouch || this.$el.removeClass("animated");
        1 == m && this.$el.turn("peel", "br")
    },
    tap: function (j) {
        !$.isTouch && !$("html").hasClass("touch") && ($(j.target).hasClass("region") || (1 == this.$el.turn("zoom") ? this.$el.turn("zoomIn", j) : this.$el.turn("zoomOut")))
    },
    doubleTap: function (j) {
        var m = $(".magazine-viewport").data();
        m.navTimer && (clearInterval(m.navTimer),
            delete m.navTimer);
        if ($.isTouch || $("html").hasClass("touch"))
            1 == this.$el.turn("zoom") ? this.$el.turn("zoomIn", j) : this.$el.turn("zoomOut")
    },
    pinching: function (j) {
        this.$el.turn("zoom", 1, j)
    },
    scrolling: function () {},
    zooming: function () {
        this.$el.removeClass("animated")
    },
    zoomed: function () {
        $("html").removeClass("navigation")
    },
    missing: function (j, m) {

        for (var s = 0; s < m.length; s++)
            this.addPage(m[s])
    },
    addPage: function (j) {
        var m = this.pages.get(j);
        m || (m = new Page({
                page: j,
                issue: this.model
            }),
            this.pages.add(m));
        m = new PageView({
            model: m
        });
        this.$el.turn("addPage", m.$el, j, {
            view: m
        }) && m.loadPage()
    },
    removePage: function (j, m) {
        this.$el.turn("pageData", m).view.stopListening()
    }
});
// 这个控制翻页按钮
Flipfiy = Backbone.View.extend({
    el: $("#viewer"),
    events: {
        "tap .control-next-page": "nextPage",
        "tap .control-previous-page": "previousPage"
    },
    initialize: function () {
        var j = this;
        $(document).keydown(function (m) {
            switch (m.keyCode) {
                case 37:
                    j.magazine.$el.turn("previous");
                    m.preventDefault();
                    break;
                case 39:
                    j.magazine.$el.turn("next");
                    m.preventDefault();
                    break;
                case 27:
                    j.magazine.$el.zoom("zoomOut"),
                        m.preventDefault()
            }
        });
        $(".magazine-viewport").bind("tap", function () {
            if ($("html").hasClass("navigation"))
                $("html").removeClass("navigation");
            else {
                var j = $(this).data();
                j.navTimer || (j.navTimer = setTimeout(function () {
                    delete j.navTimer;
                    $(".magazine").turn("isFlipping") || $("html").addClass("navigation")
                }, 300))
            }
        })
    },
    nextPage: function () {
        this.magazine.$el.turn("next")
    },
    previousPage: function () {
        this.magazine.$el.turn("previous")
    },
});
