App.Pagination = {
  view: function() {
    var data = App.searchData()

    if (data && Number.isInteger(data.page_limit)) {
      return m('ul.pagination', [
        m("li", [
          m("a[href='#'].btn", {
            onclick: App.searchObject().prevPage
          }, "Prev")
        ]),
        m("li", [
          m("a[href='#']", "Page " + data.page + " of " + data.page_limit)
        ]),
        m("li", [
          m("a[href='#'].btn", {
            onclick: App.searchObject().nextPage
          }, "Next")
        ])
      ])
    } else {
      return m('ul.hide')
    }
  }
}