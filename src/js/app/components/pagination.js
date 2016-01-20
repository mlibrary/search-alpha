// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Pagination = {
  controller: function() {
    return {
      getMetadata: function() {
        var data = app.data()
        var uid

        // If the search switcher object is not undefined
        if (app.search_switcher()) {
          uid = app.search_switcher().uid

          if (data[uid]) {
            return data[uid].metadata
          }
        }

        return undefined
      }
    }
  },
  view: function(ctrl) {
    var metadata = ctrl.getMetadata()
    var search = app.search_switcher()

    // Only show pagionation if metadata (# of results, etc) exists,
    // the page limit is set to a number, and the page limit is greater than 1.
    if (metadata && Number.isInteger(metadata.page_limit) && metadata.page_limit > 1) {

      return m('ul.pagination', [
        m("li", [
          m("button.btn", {
            onclick: search.prevPage
          }, "Prev")
        ]),
        m("li", [
          m("span", "Page " + metadata.page + " of " + metadata.page_limit)
        ]),
        m("li", [
          m("button.btn", {
            onclick: search.nextPage
          }, "Next")
        ])
      ])
    }

    return m('ul.hide')
  }
}