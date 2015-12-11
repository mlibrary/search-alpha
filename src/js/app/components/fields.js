// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.selected_field = m.prop()

app.Fields = {
  view: function() {
    var data = app.metadata()

    if (data) {
      return m("select.fields", {
        onchange: function(e) {
          m.redraw.strategy("none")
          app.selected_field(e.target.value)
        }
      },
      [
        _.map(data.fields, function(field) {
          return m("option[value='" + field.uid + "']", field.metadata.name)
        })
      ])
    }

    return m('select.disabled')
  }
}