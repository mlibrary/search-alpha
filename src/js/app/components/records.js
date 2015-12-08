// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Record = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m("li.item", [
      m("h3", ctrl.names),
      m("dl",
        _.reduce(ctrl.fields, function(memo, field) {
          if ((field.uid != "fullrecord") && (field.uid != "title")) {
            memo.push(
              m("dt", field.name),
              m("dd", field.value)
            )
          }
          return memo
        }, [])
      )
    ])
  }
}

app.Records = {
  view: function() {
    return m("ul.search-items", [
      _.map(app.results(), function(record) {
        if (record) {
          var render

          var render = record.renderFull(function(r) {
            console.log('=== render ===')
            console.log(r.names[0])
            return r
          })

          console.log(render)

          return m.component(app.Record, render)
        } else {
          return m("li")
        }
      })
    ])
  }
}
