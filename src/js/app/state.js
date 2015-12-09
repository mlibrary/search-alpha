// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.datastores = m.prop()
app.search_objects = m.prop()
app.search_switcher = m.prop()
app.records = m.prop()

app.state = {
  init: function() {
    m.route(document, "/", {
      "/": app.Home,
    });
  },
  initPride: function() {
    var datastores = []
    var search_objects = []

    Pride.AllDatastores.each(function(ds) {
      var search_object = Pride.AllDatastores.newSearch(ds.get('uid'))

      datastores.push(ds)
      search_objects.push(search_object)
    })

    app.datastores(datastores)
    app.search_objects(search_objects)

    // Default to first datastore on load
    app.search_switcher(new Pride.Util.SearchSwitcher(
      app.search_objects()[0],
      app.search_objects()
    ))

    _.each(app.datastores(), function(ds) {
      var ds_uid = ds.get('uid')

      app.getSearchObject(ds_uid).resultsObservers.add(function(results) {
        app.records([]) // reset records

        if (ds_uid == app.currentDatastore().get('uid')) {
          var rendered_records = []
          _.map(results(), function(record_object) {
            if (record_object) {
              record_object.renderFull(function(record) {
                console.log('=== record ===')
                console.log(record)
                console.log(record.type)

                rendered_records.push(record)
                app.records(rendered_records)
                m.redraw()
              })
            } else {
              rendered_records.push(undefined)
              app.records(rendered_records)
            }
          })

        }
      })
    })

    m.redraw()

    /*
    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
    })
    */
  }
}

app.state.init()