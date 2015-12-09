// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Record = {
  controller: function(record) {
    var data

    record.renderPartThenCache(function(raw_data) {
      data = raw_data
    })

    // TODO
    // Render full data
    // If data is incomplete, then recall itself to 
    // fill in data

    console.log('=== record ===')
    console.log(data)
    alert(data)

    return data
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

app.RecordPlaceholder = {
  view: function() {
    return m("li.item", [
      m("div.placeholder.tall"),
      m("div.placeholder"),
      m("div.placeholder"),
      m("div.placeholder")
    ])
  }
}

app.Records = {
  controller: function(records) {

    console.log('=== app.Records controller ===')
    console.log(records)

    return records
  },
  view: function(ctrl) {
    return m("ul.search-items", [
      _.each(ctrl.records, function(record) {
        if (record) {
          return m.component(app.Record, record)
        } else {
          return m.component(app.RecordPlaceholder)
        }
      })
    ])
  }
}
