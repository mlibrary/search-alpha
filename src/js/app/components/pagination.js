// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Pagination = {
  view: function() {
    var data = app.metadata()
    var search = app.search_switcher()

    if (data && Number.isInteger(data.page_limit) && data.page_limit != 0) {

      return m('ul.pagination', [
        m("li", [
          m("a[href='#'].btn", {
            onclick: search.prevPage
          }, "Prev")
        ]),
        m("li", [
          m("a[href='#']", "Page " + data.page + " of " + data.page_limit)
        ]),
        m("li", [
          m("a[href='#'].btn", {
            onclick: search.nextPage
          }, "Next")
        ])
      ])
    }

    return m('ul.hide')
  }
}