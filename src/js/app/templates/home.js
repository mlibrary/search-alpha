// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Home = {
  view: function() {
    return m("div", [
      m("header", [
        m.component(app.Messages),
        m(".site-title-container", [
          m(".container", [
            m("h1.site-title", "Search [Alpha]")
          ])
        ]),
        m(".container", [
          m.component(app.Search)
        ])
      ]),
      m(".container", [
        m("aside", [
          m.component(app.Searchables)
        ]),
        m("main", [
          m.component(app.Pagination),
          m(".search-results-container", [
            m.component(app.Records)
          ])
        ])
      ])
    ])
  }
}