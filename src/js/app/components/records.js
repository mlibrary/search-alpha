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
            if (data[uid].records) {
              return data[uid].records
            } else { // Multisearch
              return data[uid]
            }
          }
        }

        return undefined
      },
      getUid: function() {
        if (app.search_switcher()) {
          return app.search_switcher().uid
        }

        return undefined
      }
    }
  },
  view: function(ctrl) {
    var uid = ctrl.getUid()

    if (app.isMultisearch(uid)) {
      var data = app.data()
      var datastores = data[uid].datastores

      return m('.multisearch', [
        _.map(datastores, function(datastore, ds_uid) {
          if (datastore.records.length > 0) {
            var datastore_name = app.getDatastore(ds_uid).get('metadata').name

            return m("div.datastore", [
              m("h2", datastore_name),
              m.component(app.SearchInfo),
                m("ul.search-items", [
                _.map(datastore.records, function(record) {
                  return m.component(app.Record, {record: record})
                })
              ])
            ])
          }
        })
      ])

      return m("ul.hide")
    } else {
      var records = ctrl.getRecords()

      if (records) {
        return m("ul.search-items", [
          m.component(app.SearchInfo),
          _.map(records, function(record) {
            return m.component(app.Record, {record: record})
          })
        ])
      }

      return m("ul.hide")
    }
  }
}

app.Record = {
  view: function(ctrl, args) {
    var record = args.record

    if (record) {
      var data

      NProgress.done()

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
            } else if ((field.uid != "fullrecord") && (field.uid != "title")) {
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
  }
}