'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _RenderlessPagination = require('./RenderlessPagination');

var _RenderlessPagination2 = _interopRequireDefault(_RenderlessPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { RenderlessPagination: _RenderlessPagination2.default },
    render: function render() {

        return _c('RenderlessPagination', {
            on: {
                "paginate": this.paginate
            },
            scopedSlots: this._u([{
                key: "default",
                fn: function fn(_ref) {
                    var pages = _ref.pages,
                        pageEvents = _ref.pageEvents,
                        setFirstPage = _ref.setFirstPage,
                        setLastPage = _ref.setLastPage,
                        setPrevChunk = _ref.setPrevChunk,
                        setNextChunk = _ref.setNextChunk,
                        prevChunkProps = _ref.prevChunkProps,
                        nextChunkProps = _ref.nextChunkProps,
                        firstPageProps = _ref.firstPageProps,
                        lastPageProps = _ref.lastPageProps,
                        pageClasses = _ref.pageClasses,
                        showPagination = _ref.showPagination,
                        setPrevPage = _ref.setPrevPage,
                        setNextPage = _ref.setNextPage,
                        prevProps = _ref.prevProps,
                        nextProps = _ref.nextProps,
                        hasRecords = _ref.hasRecords,
                        theme = _ref.theme,
                        texts = _ref.texts,
                        count = _ref.count;

                    return this._c('div', {
                        staticClass: "VuePagination",
                        class: theme.wrapper
                    }, [this._c('nav', {
                        class: theme.nav
                    }, [this._c('ul', {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: showPagination,
                            expression: "showPagination"
                        }],
                        class: theme.list
                    }, [this._c('li', {
                        class: theme.firstPage,
                        on: {
                            "click": setFirstPage
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, firstPageProps), false), [this._v(this._s(texts.first))])]), this._c('li', {
                        class: theme.prevChunk,
                        on: {
                            "click": setPrevChunk
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, prevChunkProps), false), [this._v(this._s(texts.prevChunk))])]), this._c('li', {
                        class: theme.prev,
                        on: {
                            "click": setPrevPage
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, prevProps), false), [this._v(this._s(texts.prevPage))])]), this._l(pages, function (page) {
                        return this._c('li', this._g({
                            key: page,
                            class: pageClasses(page)
                        }, pageEvents(page)), [this._c('a', this._b({
                            class: theme.link
                        }, 'a', this.aProps, false), [this._v(this._s(page))])]);
                    }), this._c('li', {
                        class: theme.next,
                        on: {
                            "click": setNextPage
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, nextProps), false), [this._v(this._s(texts.nextPage))])]), this._c('li', {
                        class: theme.nextChunk,
                        on: {
                            "click": setNextChunk
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, nextChunkProps), false), [this._v(this._s(texts.nextChunk))])]), this._c('li', {
                        class: theme.lastPage,
                        on: {
                            "click": setLastPage
                        }
                    }, [this._c('a', this._b({}, 'a', _extends({}, this.aProps, lastPageProps), false), [this._v(this._s(texts.last))])])], 2), this._c('p', {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: hasRecords,
                            expression: "hasRecords"
                        }],
                        class: theme.count
                    }, [this._v(this._s(count))])])]);
                }
            }])
        });
    },

    props: {
        for: {
            type: String,
            required: false
        },
        page: {
            type: Number,
            default: 1
        },
        records: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            default: 25
        },
        vuex: {
            type: Boolean
        },
        options: {
            type: Object
        }
    },
    data: function data() {
        return {
            aProps: {
                href: "javascript:void(0);",
                role: "button"
            }
        };
    },
    methods: {
        paginate: function paginate(page) {
            this.$emit('paginate', page);
        }
    }
};
module.exports = exports['default'];