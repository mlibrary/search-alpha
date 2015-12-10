// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.search_input = m.prop()

app.Search = {
  controller: function() {
    return {
      submit: function() {
        var config = {
          count: 10,
          field_tree: new Pride.FieldTree.Field(
            app.selected_field(),
            new Pride.FieldTree.Literal(app.search_input()))
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