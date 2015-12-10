// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.Fields = {
  view: function() {
    var data = app.metadata()

    if (data) {
      return m("select.fields", [
        _.map(data.fields, function(field) {
          return m("option", field.metadata.name)
        })
      ])
    }

    return m('select.disabled')
  }
}