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

      search_object.resultsObservers.add(function(results) {

        if (ds.get('uid') === app.currentDatastore().uid) {

        }

        app.results(results())
        console.log(results)
        m.redraw()
      })
    })

    app.datastores(datastores)
    app.search_objects(search_objects)

    // Default to first datastore on load
    app.search_switcher(new Pride.Util.SearchSwitcher(
      app.search_objects()[0],
      app.search_objects()
    ))

    m.redraw()

    /*
    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
    })
    */
  }
}

app.state.init()