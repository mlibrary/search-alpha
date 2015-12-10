// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Record = {
  controller: function(args) {
    return {
      getRecordData: function(record) {
        var data
        
        data.renderPartThenCache(function(raw_data) {
          data = raw_data
        })

        return data
      } 
    }
  },
  view: function(ctrl, args) {
    var record = ctrl.getRecordData(args.record_object)

    console.log('record view')
    console.log(args)

    return m("li.item", [
      m("h3", record.names[0]),
      m("dl",
        _.reduce(record.fields, function(memo, field) {
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
      _.map(app.results(), function(record) {
        if (record) {

          console.log(record)

          var data

          record.renderPart(function(raw_data) {
            data = raw_data
          })

          console.log(data)

          return m("li.item", [
            m("h3", data.names[0]),
            m("dl",
              _.reduce(data.fields, function(memo, field) {
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
        } else {
          return m.component(app.RecordPlaceholder)
        }
      })
    ])
  }
}