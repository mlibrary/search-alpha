// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.datastores = m.prop()
app.search_switcher = m.prop()
app.results = m.prop()
app.metadata = m.prop()

app.state = {

  // Initialize Mithril
  init: function() {
    m.route.mode = "hash";
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
    })

    // Add results observers to each search object.
    _.each(search_objects, function(search_object) {
      search_object.setMute(true)
      search_object.resultsObservers.add(function(results) {
        app.results(results)
        m.redraw()
      })

      search_object.setDataObservers.add(function(data) {
        app.metadata(data)
        m.redraw()
      })

      search_object.runDataObservers.add(function(data) {
        app.metadata(data)
        m.redraw()
      })
    })

    app.search_switcher(new Pride.Util.SearchSwitcher(
      search_objects[0],
      search_objects.slice(1)
    ))

    app.selected_field(app.metadata().fields[0].uid)

    app.datastores(datastores)
    m.redraw()

    // TODO
    // Figure out way to handle messages.
    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
    })
  }
}

window.onload = function() {
  app.state.init()
}