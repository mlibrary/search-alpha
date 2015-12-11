// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Home = {
  view: function() {
    return m("html", [
      m("head", [
        m("title", "Search [Alpha]"),
        m("meta[name='viewport'][content='width=device-width, initial-scale=1']"),
        m("link[href='https://fonts.googleapis.com/css?family=Open+Sans:400,700'][rel='stylesheet']"),
        m("link[href='src/css/styles.css'][rel='stylesheet']"),
        m("link[href='src/lib/nprogress/nprogress.css'][rel='stylesheet']")
      ]),
      m("body", [
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
            m.component(app.Datastores)
          ]),
          m("main", [
            m.component(app.Pagination),
            m(".search-results-container", [
              m.component(app.SearchInfo),
              m.component(app.Records)
            ])
          ])
        ]),
      ])
    ])
  }
}