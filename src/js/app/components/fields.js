// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.Fields = {
  view: function() {

    /*
    return m("select.fields", [
      _.map(app.state.searchData().fields, function(field) {
        return m("option", field.metadata.name)
      })
    ])
    */

    return m("select")

  }
}