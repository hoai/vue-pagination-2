import RenderlessPagination from './RenderlessPagination';

export default {
    components:{RenderlessPagination:RenderlessPagination},
    render() {

        return _c('RenderlessPagination', {
            on: {
                "paginate": this.paginate
            },
            scopedSlots: this._u([{
                key: "default",
                fn: function({
                    pages,
                    pageEvents,
                    setFirstPage,
                    setLastPage,
                    setPrevChunk,
                    setNextChunk,
                    prevChunkProps,
                    nextChunkProps,
                    firstPageProps,
                    lastPageProps,
                    pageClasses,
                    showPagination,
                    setPrevPage,
                    setNextPage,
                    prevProps,
                    nextProps,
                    hasRecords,
                    theme,
                    texts,
                    count
                }) {
                    return this._c('div', {
                        staticClass: "VuePagination",
                        class: theme.wrapper
                    }, [this._c('nav', {
                        class: theme
                        .nav
                    }, [this._c('ul', {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value:
                            (
                                showPagination
                            ),
                            expression: "showPagination"
                        }],
                        class: theme
                        .list
                    }, [this._c(
                        'li', {
                            class: theme
                            .firstPage,
                            on: {
                                "click": setFirstPage
                            }
                        }, [
                            this._c(
                                'a',
                                this._b({},
                                    'a', {
                                        ...
                                            this.aProps,
                                        ...
                                        firstPageProps
                                    },
                                    false
                                ), [
                                    this._v(
                                        this._s(
                                            texts
                                            .first
                                        )
                                    )
                                ]
                            )
                        ]
                    ),
                        this._c(
                        'li', {
                            class: theme
                            .prevChunk,
                            on: {
                                "click": setPrevChunk
                            }
                        }, [
                                this._c(
                                'a',
                                    this._b({},
                                    'a', {
                                        ...
                                            this.aProps,
                                        ...
                                        prevChunkProps
                                    },
                                    false
                                ), [
                                        this._v(
                                            this._s(
                                            texts
                                            .prevChunk
                                        )
                                    )
                                ]
                            )
                        ]
                    ),
                        this._c(
                        'li', {
                            class: theme
                            .prev,
                            on: {
                                "click": setPrevPage
                            }
                        }, [
                                this._c(
                                'a',
                                    this._b({},
                                    'a', {
                                        ...
                                            this.aProps,
                                        ...
                                        prevProps
                                    },
                                    false
                                ), [
                                        this._v(
                                            this._s(
                                            texts
                                            .prevPage
                                        )
                                    )
                                ]
                            )
                        ]
                    ),
                        this._l(
                        (
                            pages
                        ),
                        function(
                            page
                        ) {
                            return this._c(
                                'li',
                                this._g({
                                    key: page,
                                    class: pageClasses(
                                        page
                                    )
                                },
                                pageEvents(
                                    page
                                )
                            ), [
                                    this._c(
                                    'a',
                                        this._b({
                                        class: theme
                                        .link
                                    },
                                    'a',
                                            this.aProps,
                                    false
                                ), [
                                            this._v(
                                                this._s(
                                            page
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                }
            ),
                        this._c(
                'li', {
                    class: theme
                    .next,
                    on: {
                        "click": setNextPage
                    }
                }, [
                                this._c(
                        'a',
                                    this._b({},
                            'a', {
                                ...
                                    this.aProps,
                                ...
                                nextProps
                            },
                            false
                        ), [
                                        this._v(
                                            this._s(
                                    texts
                                    .nextPage
                                )
                            )
                        ]
                    )
                ]
            ),
                        this._c(
                'li', {
                    class: theme
                    .nextChunk,
                    on: {
                        "click": setNextChunk
                    }
                }, [
                                this._c(
                        'a',
                                    this._b({},
                            'a', {
                                ...
                                    this.aProps,
                                ...
                                nextChunkProps
                            },
                            false
                        ), [
                                        this._v(
                                            this._s(
                                    texts
                                    .nextChunk
                                )
                            )
                        ]
                    )
                ]
            ),
                        this._c(
                'li', {
                    class: theme
                    .lastPage,
                    on: {
                        "click": setLastPage
                    }
                }, [
                                this._c(
                        'a',
                                    this._b({},
                            'a', {
                                ...
                                    this.aProps,
                                ...
                                lastPageProps
                            },
                            false
                        ), [
                                        this._v(
                                            this._s(
                                    texts
                                    .last
                                )
                            )
                        ]
                    )
                ]
            )
        ], 2), this._c(
            'p', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value:
                    (
                        hasRecords
                    ),
                    expression: "hasRecords"
                }],
                class: theme
                .count
            }, [this._v(
                            this._s(
                    count
                )
            )])])])
        }
    }])
})

},
props:{
    for: {
        type: String,
        required: false
    },
    page:{
        type:Number,
        default:1
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
    options:{
        type: Object
    }
},
data: function() {
    return {
        aProps:{
            href:"javascript:void(0);",
            role:"button"
        }
    }
},
methods:{
    paginate(page) {
        this.$emit('paginate', page)
    }
}
}
