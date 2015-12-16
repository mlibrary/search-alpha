// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.searchables = m.prop()
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
    var searchables = []
    var search_objects = []

    var quicksearch

    // Store all datastores as searchables and create a search object for each datastore.
    Pride.AllDatastores.each(function(datastore) {
      searchables.push({
        uid: datastore.get('uid'),
        name: datastore.get('metadata').name
      })
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

    // Create quick search and add it to search objects
    var quicksearch = app.createMultiSearch(
      'quicksearch',
      ['mirlyn', 'journals', 'databases', 'website'],
      searchables,
      search_objects
    )

    //search_objects.push(quicksearch)

    app.search_switcher(new Pride.Util.SearchSwitcher(
      search_objects[0],
      search_objects.slice(1)
    ))

    app.selected_field(app.metadata().fields[0].uid)

    app.searchables(searchables)
    m.redraw()

    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
        m.redraw()
    })
  }
}

window.onload = function() {
  app.state.init()
}

app.createMultiSearch = function(uid, multisearch_datastores, searchables, search_objects) {
  var multisearch_array = []
  var multisearch

  _.each(searchables, function(searchable) {
    var ds_uid = searchable.uid

    if (multisearch_datastores.includes(ds_uid)) {
      //multisearch_array.push(datastore.baseSearch())
    }
  })

  if (multisearch_array.length) {
    multisearch = new Pride.Util.MultiSearch(uid, true, multisearch_array)
  }

  return multisearch
}