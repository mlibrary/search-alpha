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
              m.component(app.Records)
            ])
          ])
        ]),
        m('script[src="src/lib/pride/initial_setup.js"]'),
        m('script[src="src/lib/pride/settings.js"]'),
        m('script[src="src/js/app/pride_settings.js"]'),
        m('script[src="src/lib/pride/constructors/request_buffer.js"]'),
        m('script[src="src/lib/pride/functions/safe_call.js"]'),
        m('script[src="src/lib/pride/libraries/reqwest.js"]'),
        m('script[src="src/lib/pride/constructors/datastore.js"]'),
        m('script[src="src/lib/pride/constructors/field_tree_nodes.js"]'),
        m('script[src="src/lib/pride/constructors/observable.js"]'),
        m('script[src="src/lib/pride/constructors/search_core.js"]'),
        m('script[src="src/lib/pride/constructors/search.js"]'),
        m('script[src="src/lib/pride/constructors/section.js"]'),
        m('script[src="src/lib/pride/constructors/query.js"]'),
        m('script[src="src/lib/pride/constructors/paginater.js"]'),
        m('script[src="src/lib/pride/constructors/multisearch.js"]'),
        m('script[src="src/lib/pride/constructors/record.js"]'),
        m('script[src="src/lib/pride/singletons/messenger.js"]'),
        m('script[src="src/lib/pride/singletons/all_datastores.js"]'),
        m('script[src="src/lib/pride/functions/slice.js"]'),
        m('script[src="src/lib/pride/functions/init.js"]'),
        m('script[src="src/lib/pride/functions/request.js"]'),
        m('script[src="src/lib/pride/functions/deep_clone.js"]'),
        m('script[src="src/lib/pride/functions/escape.js"]'),
        m('script[src="src/lib/pride/constructors/search_switcher.js"]'),
        m('script[src="src/js/app/pride.js"]')
      ])
    ])
  }
}