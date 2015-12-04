app.Pagination = {
  view: function() {

    /*
    var data = app.searchData()

    if (data && Number.isInteger(data.page_limit)) {

      console.log('Hello World')
      console.log(data)
      console.log(data.page_limit)

      return m('ul.pagination', [
        m("li", [
          m("a[href='#'].btn", {
            onclick: app.searchObject().prevPage
          }, "Prev")
        ]),
        m("li", [
          m("a[href='#']", "Page " + data.page + " of " + data.page_limit)
        ]),
        m("li", [
          m("a[href='#'].btn", {
            onclick: app.searchObject().nextPage
          }, "Next")
        ])
      ])
    } else {
      return m('ul.hide')
    }

    */

    return m('div', 'pagination placeholder')

  }
}