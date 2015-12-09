// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Record = {
  controller: function(args) {
    var record = args.record_object

    return {
      getRecordData: function(record) {
        var data

        record.renderPartThenCache(function(raw_data) {
          data = raw_data
        })

        return data
      } 
    }
  },
  view: function(ctrl) {
    var record_data = ctrl.getRecordData(args.record_object)

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
  view: function() {
    return m("ul.search-items", [
      _.each(app.results(), function(record) {

        console.log(record)

        if (record) {
          return m.component(app.Record, {record_object: record})
        } else {
          return m.component(app.RecordPlaceholder)
        }
      })
    ])
  }
}