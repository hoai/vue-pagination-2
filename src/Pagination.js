'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var template = require('./template.js');
var bus = require('./bus');


module.exports = {
  render: template.call(undefined),
  props: {
    for: {
      type: String,
      required: false
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
  created: function created() {

    if (!this.vuex) return;

    if (!this.for) {
      throw new Error('vue-pagination-2: The "for" prop is required when using vuex');
    }

    var name = this.for;

    if (this.$store.state[name]) return;

    this.$store.registerModule(this.for, {
      state: {
        page: 1
      },
      mutations: _defineProperty({}, name + '/PAGINATE', function undefined(state, page) {
        state.page = page;
      })
    });
  },
  data: function data() {
    return {
      Page: 1,
      firstPage: 1,
      showFirstDots: false,
      showLastDots: false,
      firstNumber: true,
      lastNumber: true,
      limit: 5
    };
  },
  computed: {
    opts: function opts() {
      return (0, _merge2.default)((0, _config2.default)(), this.options);
    },
    Theme: function Theme() {

      if (_typeof(this.opts.theme) === 'object') {
        return this.opts.theme;
      }

      var themes = {
        bootstrap3: require('./themes/bootstrap3'),
        bootstrap4: require('./themes/bootstrap4'),
        bulma: require('./themes/bulma')
      };

      if (_typeof(themes[this.opts.theme]) === undefined) {
        throw 'vue-pagination-2: the theme ' + this.opts.theme + ' does not exist';
      }

      return themes[this.opts.theme];
    },
    page: function page() {
      return this.vuex ? this.$store.state[this.for].page : this.Page;
    },

    pages: function pages() {
      this.showFirstDots = false;
      this.showLastDots = false;
      var numberOfLinks = this.limit;
      if (!this.records) return [];
      var startNumber = 1;
      var currentPage = this.page;
      var numberOfPages = this.totalPages;
      var ELLIPSIS_THRESHOLD = 3;

      if (numberOfPages <= this.limit) {
        numberOfLinks = this.totalPages;
      } else if (currentPage < this.limit - 1 && this.limit > ELLIPSIS_THRESHOLD) {
        if (this.lastNumber) {
          this.showLastDots = true;
          numberOfLinks = this.limit - (this.firstNumber ? 0 : 1);
        }
        numberOfLinks = Math.min(numberOfLinks, this.limit);
      } else if (numberOfPages - currentPage + 2 < this.limit && this.limit > ELLIPSIS_THRESHOLD) {
        if (this.firstNumber) {
          this.showFirstDots = true;
          numberOfLinks = this.limit - (this.lastNumber ? 0 : 1);
        }
        startNumber = numberOfPages - numberOfLinks + 1;
      } else {
        if (this.limit > ELLIPSIS_THRESHOLD) {
          numberOfLinks = this.limit - 2;
          this.showFirstDots = this.firstNumber;
          this.showLastDots = this.lastNumber;
        }
        startNumber = currentPage - Math.floor(numberOfLinks / 2);
      }

      if (startNumber < 1) {
        startNumber = 1;
        this.showFirstDots = false;
      } else if (startNumber > numberOfPages - numberOfLinks) {
        startNumber = numberOfPages - numberOfLinks + 1;
        this.showLastDots = false;
      }

      if (this.showFirstDots && this.firstNumber && startNumber < 4) {
        numberOfLinks = numberOfLinks + 2;
        startNumber = 1;
        this.showFirstDots = false;
      }
      var lastPageNumber = startNumber + numberOfLinks - 1;
      if (this.showLastDots && this.lastNumber && lastPageNumber > numberOfPages - 3) {
        numberOfLinks = numberOfLinks + (lastPageNumber === numberOfPages - 2 ? 2 : 3);
        this.showLastDots = false;
      }
      // Special handling for lower limits (where ellipsis are never shown)
      if (this.limit <= ELLIPSIS_THRESHOLD) {
        if (this.firstNumber && startNumber === 1) {
          numberOfLinks = Math.min(numberOfLinks + 1, numberOfPages, this.limit + 1);
        } else if (this.lastNumber && numberOfPages === startNumber + numberOfLinks - 1) {
          startNumber = Math.max(startNumber - 1, 1);
          numberOfLinks = Math.min(numberOfPages - startNumber + 1, numberOfPages, this.limit + 1);
        }
      }
      numberOfLinks = Math.min(numberOfLinks, numberOfPages - startNumber + 1);

      return range(startNumber, numberOfLinks);
    },
    totalPages: function totalPages() {
      return this.records ? Math.ceil(this.records / this.perPage) : 1;
    },
    totalChunks: function totalChunks() {
      return Math.ceil(this.totalPages / this.opts.chunk);
    },
    currentChunk: function currentChunk() {
      return Math.ceil(this.page / this.opts.chunk);
    },
    paginationStart: function paginationStart() {

      if (this.opts.chunksNavigation === 'scroll') {
        return this.firstPage;
      }

      return (this.currentChunk - 1) * this.opts.chunk + 1;
    },
    pagesInCurrentChunk: function pagesInCurrentChunk() {
      return this.paginationStart + this.opts.chunk <= this.totalPages ? this.opts.chunk : this.totalPages - this.paginationStart + 1;
    },
    count: function count() {

      if (/{page}/.test(this.opts.texts.count)) {

        if (this.totalPages <= 1) return '';

        return this.opts.texts.count.replace('{page}', this.page).replace('{pages}', this.totalPages);
      }

      var parts = this.opts.texts.count.split('|');
      var from = (this.page - 1) * this.perPage + 1;
      var to = this.page == this.totalPages ? this.records : from + this.perPage - 1;
      var i = Math.min(this.records == 1 ? 2 : this.totalPages == 1 ? 1 : 0, parts.length - 1);

      return parts[i].replace('{count}', this.formatNumber(this.records)).replace('{from}', this.formatNumber(from)).replace('{to}', this.formatNumber(to));
    }
  },
  methods: {
    setPage: function setPage(page) {
      if (this.allowedPage(page)) {
        this.paginate(page);
      }
    },
    paginate: function paginate(page) {
      if (this.vuex) {
        this.$store.commit(this.for + '/PAGINATE', page);
      } else {
        this.Page = page;
      }

      this.$emit('paginate', page);

      if (this.for) {
        bus.$emit('vue-pagination::' + this.for, page);
      }
    },

    next: function next() {
      var page = this.page + 1;
      if (this.opts.chunksNavigation === 'scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage++;
      }
      return this.setPage(page);
    },
    prev: function prev() {
      var page = this.page - 1;

      if (this.opts.chunksNavigation === 'scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage--;
      }

      return this.setPage(page);
    },
    inDisplay: function inDisplay(page) {

      var start = this.firstPage;
      var end = start + this.opts.chunk - 1;

      return page >= start && page <= end;
    },

    nextChunk: function nextChunk() {
      return this.setChunk(1);
    },
    prevChunk: function prevChunk() {
      return this.setChunk(-1);
    },
    setChunk: function setChunk(direction) {
      this.setPage((this.currentChunk - 1 + direction) * this.opts.chunk + 1);
    },
    allowedPage: function allowedPage(page) {
      return page >= 1 && page <= this.totalPages;
    },
    allowedChunk: function allowedChunk(direction) {
      return direction == 1 && this.currentChunk < this.totalChunks || direction == -1 && this.currentChunk > 1;
    },
    allowedPageClass: function allowedPageClass(direction) {
      return this.allowedPage(direction) ? '' : this.Theme.disabled;
    },
    allowedChunkClass: function allowedChunkClass(direction) {
      return this.allowedChunk(direction) ? '' : this.Theme.disabled;
    },
    activeClass: function activeClass(page) {
      return this.page == page ? this.Theme.active : '';
    },
    formatNumber: function formatNumber(num) {

      if (!this.opts.format) return num;

      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  beforeDestroy: function beforeDestroy() {
    bus.$off();
    bus.$destroy();
  }
};

function range(start, count) {
  return Array.apply(0, Array(count)).map(function (element, index) {
    return index + start;
  });
}