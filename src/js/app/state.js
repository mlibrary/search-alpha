// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.datastores = m.prop()
app.search_objects = m.prop()
app.search_switcher = m.prop()
app.results = m.prop()

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
        // Update results to selected datastore
        if (ds_uid == app.currentDatastore().get('uid')) {
          app.results(results()) // TODO, this will switch to 'results', not 'results()'
          m.redraw()
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