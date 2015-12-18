// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.selected_field = m.prop()

app.Fields = {
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

    if (app.isMultisearch()) {
      return m("select.fields", [
        m("option[value='title']", "Title")
      ])
    }

    if (metadata) {
      return m("select.fields", {
        onchange: function(e) {
          m.redraw.strategy("none")
          app.selected_field(e.target.value)
        }
      },
      [
        _.map(metadata.fields, function(field) {
          return m("option[value='" + field.uid + "']", field.metadata.name)
        })
      ])
    }

    return m('select.disabled')
  }
}