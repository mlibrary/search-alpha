// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.search_input = m.prop()

app.Search = {
  controller: function() {
    return {
      submit: function() {
        var data = app.metadata()
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

app.getSearchObject = function(uid) {
  return _.find(app.search_objects(), function(search_object) {
    return search_object.uid == uid
  })
}

app.SearchInfo = {
  view: function() {
    var data = app.metadata()

    if (data) {
      if (data.total_available > 0) {
        return m("p.search-details", app.metadata().total_available + " results")
      } else if (data.total_available !== undefined) {
        var message = "No results found matching <b>" + app.search_input() + "</b>."
        return m("p.search-details", m.trust(message))
      }
    }

    return m("p.hide")
  }
}