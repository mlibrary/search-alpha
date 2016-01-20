// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.status = m.prop('loading')

app.Home = {
  view: function() {

    switch(app.status()) {
      case 'loading':
        return m('p.loading', 'Loading ...')
      case 'success':
        return m("div", [
          m("header", [
            m.component(app.Messages),
            m(".site-title-container", [
              m(".container", [
                m("h1.site-title", "Search Alpha [Technical Prototype]"),
                m.component(app.Feedback)
              ])
            ]),
            m(".container", [
              m.component(app.Search)
            ])
          ]),
          m(".container", [
            m("aside", [
              m.component(app.Searchables),
              m.component(app.Facets)
            ]),
            m("main", [
              m.component(app.Pagination),
              m(".search-results-container", [
                m.component(app.Records)
              ])
            ])
          ])
        ])
      case 'failure':
        return m('p.loading', 'Failed to load page.')
    }
  }
}