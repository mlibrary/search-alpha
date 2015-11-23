App.Pagination = {
  controller: function() {
    return {
      next: function() {
        App.searchObject().nextPage()
      },
      prev: function() {
        App.searchObject().prevPage()
      },
      page: function() {

        if (App.searchData()) {
          return App.searchData().page
        }
      }
    }
  },
  view: function(ctrl) {

    if (App.searchData()) {
      return m('ul.pagination', [
        m("li", [
          m("a[href='#'].btn", {
            onclick: ctrl.prev
          }, "Prev")
        ]),
        m("li", [
          m("a[href='#']", "Page " + ctrl.page())
        ]),
        m("li", [
          m("a[href='#'].btn", {
            onclick: ctrl.next
          }, "Next")
        ])
      ])
    } else {
      return m('ul.hide')
    }
  }
}