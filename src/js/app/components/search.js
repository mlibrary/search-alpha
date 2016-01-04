// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.search_input = m.prop()

app.Search = {
  controller: function() {
    return {
      submit: function() {
        NProgress.start()

        var config = {
          page: 1,
          count: 10,
          field_tree: Pride.FieldTree.parseField(app.selected_field(), app.search_input())
        }

        app.search_switcher().set(config).run()
      }
    }
  },
  view: function(ctrl) {
    return m(".search", [
      m("form", [
        m("div", [
          m("input[type='text']#search[placeholder='Search']", {
            oninput: m.withAttr('value', function(value) {
              m.redraw.strategy("none")
              app.search_input(value)
            })
          }),
          m.component(app.Fields),
          m("input[type='submit'][value='Search']", {
            onclick: function(e) {
              e.preventDefault()
              ctrl.submit()
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