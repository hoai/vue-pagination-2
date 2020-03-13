module.exports = function() {
  
  return function(h) {
    
    var theme = this.Theme;
    var prevChunk = '';
    var nextChunk = '';
    var firstPage = '';
    var lastPage = '';
    const pageNumbers = this.pages
    
    // Page button factory
    const makePageButton = (page) => {
      return h(
        'li',
        {
          class: ['VuePagination__pagination-item', theme.item, this.activeClass(page)],
          on: {
            'click': this.setPage.bind(this, page)
          }
        },
        [
          h(
            'a',
            { 
              class: [theme.link, this.activeClass(page)],
              attrs: { 
                href: 'javascript:void(0)',
                role: 'button' 
              }
            },
            [page]
          )
        ]
      );
    }
    
    // Ellipsis factory
    const makeEllipsis = isLast => {
      return h(
        'li',
        {
          class: ['VuePagination__pagination-item', theme.item, theme.disabled, 'page-separator', 'ellipsis-'+(isLast ? 'last' : 'first')],
          attrs: { role: 'separator' }
        },
        [
          h('span', {
            class: [theme.link],
            domProps: { innerHTML: '&hellip;' }
          })
        ]
      )
    }
    
    // Factory function for prev/next/first/last buttons
    const makeEndBtn = (linkTo, ariaLabel, pageTest, btnClass, disabledLink) => {
      return h(
        'li',
        {
          class: ['VuePagination__pagination-item', theme.item, disabledClass, 'VuePagination__pagination-item-'+ariaLabel+'-chunk', btnClass],
          on: {
            'click': this.setPage.bind(this, linkTo)
          }
        },
        [
          h(
            'a',
            { 
              class: theme.link,
              attrs: { 
                href: 'javascript:void(0);',
                disabled: disabledLink 
              }
            },
            [pageTest]
          )
        ]
      )
    }
    
    if (this.opts.edgeNavigation && this.totalChunks > 1) {
      if (!this.firstNumber) {
        firstPage = makeEndBtn(1, 'prev', this.opts.texts.first, (this.page === 1 ? theme.disabled : ''), (this.page === 1));
      }
      if (!this.lastNumber) {
        lastPage = makeEndBtn(this.totalPages, 'next', this.opts.texts.last, (this.page === this.totalPages ? theme.disabled : ''), (this.page === this.totalPages));
      }
    }

    if (this.opts.chunksNavigation === 'fixed') {
      if (!this.firstNumber) {
        prevChunk = h(
          'li',
          { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.prev + ' VuePagination__pagination-item-prev-chunk ' + this.allowedChunkClass(-1) },
          [h(
            'a',
            { 'class': theme.link,
              attrs: { href: 'javascript:void(0);',
                disabled: !!this.allowedChunkClass(-1)
              },
              on: {
                'click': this.setChunk.bind(this, -1)
              }
            },
            ['<<']
          )]
        );
      }
      if (!this.lastNumber) {
        nextChunk = h(
          'li',
          { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.next + ' VuePagination__pagination-item-next-chunk ' + this.allowedChunkClass(1) },
          [h(
            'a',
            { 'class': theme.link,
              attrs: { href: 'javascript:void(0);',
                disabled: !!this.allowedChunkClass(1)
              },
              on: {
                'click': this.setChunk.bind(this, 1)
              }
            },
            ['>>']
          )]
        );  
      }        
    }

    var items = this.pages.map(function (page) {
      return makePageButton(page);
    }.bind(this));

    var PagingLimit = h(
      'div',
      { 'class': theme.pagingLimit.classes.field + ' ' + theme.pagingLimit.classes.inline + ' ' + theme.pagingLimit.classes.right + ' VueTables__limit' },
      [theme.pagingLimit.slots.beforeLimit, theme.pagingLimit.perpage, theme.pagingLimit.slots.afterLimit]
    );
    
    var firstItemPage = (this.firstNumber && pageNumbers[0] !== 1) ? makePageButton(1) : h()
    
    var lastItemPage = (this.lastNumber && pageNumbers[pageNumbers.length - 1] !== this.totalPages) ? makePageButton(this.totalPages) : h()
    
    var firstEllipsis = (this.showFirstDots ? makeEllipsis(false) : h());
    
    var lastEllipsis = (this.showLastDots ? makeEllipsis(true) : h());
    
    var prevLink = h(
      'li',
      { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.prev + ' VuePagination__pagination-item-prev-page ' + this.allowedPageClass(this.page - 1),
        on: {
          'click': this.prev.bind(this)
        }
      },
      [h(
        'a',
        { 'class': theme.link,
          attrs: { href: 'javascript:void(0);',
            disabled: !!this.allowedPageClass(this.page - 1)
          }
        },
        ['<']
      )]
    )
    
    var nextLink = h(
      'li',
      { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.next + ' VuePagination__pagination-item-next-page ' + this.allowedPageClass(this.page + 1),
        on: {
          'click': this.next.bind(this)
        }
      },
      [h(
        'a',
        { 'class': theme.link,
          attrs: { href: 'javascript:void(0);',
            disabled: !!this.allowedPageClass(this.page + 1)
          }
        },
        ['>']
      )]
    )
    
    return h(
      'div',
      { 'class': 'VuePagination ' + theme.wrapper },
      [h(
        'nav',
        { 'class': '' + theme.nav },
        [h(
          'div',
          { 'class': 'VuePagination__left' },
          [h(
            'div',
            { 'class': 'VuePagination__pagination_list' },
            [h(
              'ul',
              {
                directives: [{
                  name: 'show',
                  value: this.totalPages > 0
                }],

                'class': theme.list + ' VuePagination__pagination' },
              [firstPage, prevChunk, prevLink, firstItemPage, firstEllipsis, items, lastEllipsis, lastItemPage, nextLink, nextChunk, lastPage]
            )]
          ), h(
            'div',
            {
              directives: [{
                name: 'show',
                value: this.totalPages > 0
              }],
              'class': 'VuePagination__dropdownPagination' },
            [PagingLimit]
          )]
        ), h(
          'p',
          {
            directives: [{
              name: 'show',
              value: parseInt(this.records)
            }],

            'class': 'VuePagination__count ' + theme.count },
          [this.count]
        )]
      )]
    );
  }
}
