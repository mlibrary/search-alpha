// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.search_input = m.prop("")

app.Search = {
  controller: function() {
    this.submitSearch = function() {
      app.submitSearch()
    }
  },
  view: function(ctrl) {
    return m(".search", [
      m("form", [
        m("div", [
          m("input[type='text'][value='" + app.search_input() + "']#search"),
          m.component(app.Fields),
          m("input[type='submit']", {
            onclick: function(e) {
              e.preventDefault()
              ctrl.submitSearch()
            }
          })
        ])
      ])
    ])
  }
}

app.SearchInfo = {
  controller: function() {
    return {
      getMetadata: function() {
        var data = app.data()
        var uid

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

    if (metadata) {
      if (metadata.total_available > 0) {
        return m("p.search-details", metadata.total_available + " results")
      } else if (metadata.total_available !== undefined) {
        var message = "No results found matching <b>" + app.search_input() + "</b>."
        return m("p.search-details", m.trust(message))
      }
    }

    return m("p.hide")
  }
}

app.submitSearch = function() {
  NProgress.start()
  
  var count = 10;
  var selected_facets = app.selected_facets()
  var datastore_uid = app.getSelectedDatastore()

  if (app.isMultisearch()) {
    count = 3;
  }

  document.getElementById('search').value = app.search_input()

  var config = {
    page: 1,
    count: count,
    field_tree: Pride.FieldTree.parseField(app.selected_field(), app.search_input())
  }

  if (selected_facets && selected_facets[datastore_uid]) {
    config.facets = selected_facets[datastore_uid]
  }

  app.search_switcher().set(config).run()

  m.route(app.getURL())
}