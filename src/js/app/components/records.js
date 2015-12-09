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
      m("p", ctrl.type),
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

app.RecordPlaceholder = {
  view: function() {
    return m("li.item", [
      m("div.placeholder.tall"),
      m("div.placeholder"),
      m("div.placeholder")
    ])
  }
}

app.Records = {
  view: function() {
    return m("ul.search-items", [
      _.map(app.records(), function(record) {
        if (record) {
          return m.component(app.Record, record)
        } else {
          // TODO placholder record for undefined
          return m.component(app.RecordPlaceholder)
        }
      })
    ])
  }
}
