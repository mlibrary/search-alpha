// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

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
  controller: function() {
    return {
      getRecords: function() {
        var data = app.data()
        var uid

        if (app.search_switcher()) {
          uid = app.search_switcher().uid

          if (data[uid]) {
            return data[uid].records
          }
        }

        return undefined
      }
    }
  },
  view: function(ctrl) {

    var records = ctrl.getRecords()

    if (records) {
      return m("ul.search-items", [
        _.map(records, function(record) {
          if (record) {
            var data

            record.renderPart(function(raw_data) {
              data = raw_data
            })

            return m("li.item", [
              m("h3", m.trust(data.names[0])),
              m("dl",
                _.reduce(data.fields, function(memo, field) {
                  if (field.uid == "href") {
                    memo.push(
                      m("dt", m.trust(field.name)),
                      m("dd", [
                        m('a[href="' + field.value + '"]', m.trust(field.value))
                      ])
                    )
                  }
                  else if ((field.uid != "fullrecord") && (field.uid != "title")) {
                    memo.push(
                      m("dt", m.trust(field.name)),
                      m("dd", m.trust(field.value))
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
    } else {
      return m("ul.hide")
    }
  }
}