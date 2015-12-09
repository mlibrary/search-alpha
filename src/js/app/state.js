// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.datastores = m.prop()
app.search_switcher = m.prop()

app.state = {

  // Initialize Mithril
  init: function() {
    m.route(document, "/", {
      "/": app.Home,
    });
  },

  // Initialize Pride and related components.
  initPride: function() {
    var datastores = []
    var search_objects = []

    // Store all datastores and create a search object for each datastore.
    Pride.AllDatastores.each(function(datastore) {
      datastores.push(datastore)
      search_objects.push(datastore.baseSearch())
      m.redraw()
    })

    app.datastores(datastores)

    // Add results observers to each search object.
    _.each(search_objects, function(search_object) {
      search_object.resultsObservers.add(function(results) {

        console.log('=== results observer ===')
        console.log(search_object)

        app.Records.controller(results())
      })
    })

    // TODO
    // What datastore should be active on load? Defaults to first for now.
    // This should be replaced eventually with a default datastore.
    app.search_switcher(new Pride.Util.SearchSwitcher(
      search_objects[0],
      search_objects.slice(1)
    ))

    /*
    // TODO
    // Figure out way to handle messages.
    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
    })
    */
  }
}

app.state.init()