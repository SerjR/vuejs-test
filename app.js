// var testData = [
//   {"id":"17d5653e-ab63-44cb-b1f6-403d9d7c48a0","name":"Twitterlist","location":"Namur","currency":62675},
//   {"id":"9eee0e4e-d3a7-4a4c-aca8-00077164abf2","name":"Mydo","location":"Bojong","currency":18917},
//   {"id":"6d3a7fd5-da98-4fc8-9818-c59ac9b15d36","name":"Gigazoom","location":"Marshintsy","currency":89681},
//   {"id":"0146f5e8-226b-468b-82b2-66669dec26b2","name":"BlogXS","location":"Snegiri","currency":37538},
//   {"id":"f9f903e5-4877-4147-bca2-988b1a838dcd","name":"Edgeify","location":"Pingyang","currency":25537},
//   {"id":"d31a647e-5aca-4442-9ffc-638cccce00d2","name":"Innotype","location":"Shentong","currency":4115},
//   {"id":"d31a647e-5aca-4442-9ffc-638cccce00d2","name":"Innotype","location":"Shentong","currency":4115},
//   {"id":"28256d73-8c9c-4005-bdda-186dbf3b0ea4","name":"Yacero","location":"Couva","currency":26663}
// ];

Vue.component('demo-grid', {
  template: '#table-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },
    count: function () {
      return this.filteredData.reduce((sum, i) => {
        return sum + i.currency
      }, 0);
    }

  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})


var application = new Vue({
  el: '#app',
  data: {
    searchInput: '',
    gridColumns: ['id', 'name', 'location', 'currency'],
    gridData: [],
  },
  created: function () {
        var _this = this;
        $.getJSON('http://vuejs-test.ua/test.json', function (json) {
            _this.gridData = json;
        });
    }
})
