// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.searchables = m.prop()
app.search_switcher = m.prop()

/*

app.data = {
  mirlyn: {
    records: {},
    data: {}
  }, // regular datastore
  databases: {
    records: {},
    data: {}
  },
  staff: {
    records: {},
    data: {}
  },
  quicksearch: { // multisearch example
    mirlyn: {
      records: {},
      data: {}
    },
    databases: {
      records: {},
      data: {}
    }
  }
}
 
*/

app.data = m.prop()

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

    _.each(app.settings.datastores, function(ds) {
      var datastore = app.getDatastore(ds)

      if (datastore) {
        searchables.push({
          uid: datastore.get('uid'),
          name: datastore.get('metadata').name
        })

        search_objects.push(datastore.baseSearch())
      }
    })

    // Add results observers to each search object.
    _.each(search_objects, function(search_object) {
      search_object.setMute(true)
      search_object.resultsObservers.add(function(records) {
        var data = app.data()

        if (!data) {
          data = {}
        }

        if (data[search_object.uid]) {
          data[search_object.uid]['records'] = records
        } else {
          data[search_object.uid] = {}
          data[search_object.uid]['records'] = records
        }

        app.data(data)

        m.redraw()
      })

      search_object.setDataObservers.add(function(metadata) {
        var data = app.data()

        if (!data) {
          data = {}
        }

        if (data[search_object.uid]) {
          data[search_object.uid]['metadata'] = metadata
        } else {
          data[search_object.uid] = {}
          data[search_object.uid]['metadata'] = metadata
        }

        app.data(data)

        m.redraw()
      })

      search_object.runDataObservers.add(function(metadata) {
        var data = app.data()

        if (!data) {
          data = {}
        }

        if (data[search_object.uid]) {
          data[search_object.uid]['metadata'] = metadata
        } else {
          data[search_object.uid] = {}
          data[search_object.uid]['metadata'] = metadata
        }

        app.data(data)

        m.redraw()
      })
    })

    _.each(app.settings.multisearches, function(ms) {
      var multisearch = app.createMultiSearch(ms)

      if (multisearch) {
        search_objects.push(multisearch)

        searchables.push({
          uid: ms.uid,
          name: ms.name
        })
      }
    })

    app.search_switcher(new Pride.Util.SearchSwitcher(
      search_objects[0],
      search_objects.slice(1)
    ))

    app.selected_field('mirlyn') // temp

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

app.createMultiSearch = function(ms) {
  var is_valid = false
  var ms_search_array = []

  _.each(ms.datastores, function(ds_uid) {
    var ds = app.getDatastore(ds_uid)
    if (ds) {
      var search_object = ds.baseSearch()

      ms_search_array.push(search_object)
      is_valid = true
    }
  })

  _.each(ms_search_array, function(search_object) {

    search_object.resultsObservers.add(function(results) {
      /*
      console.log('=== results observer ===')
      console.log(ms.uid)
      console.log(search_object.uid)
      console.log(results)
      console.log('===')
      */
    })
  })

  if (is_valid) {
    return new Pride.Util.MultiSearch(ms.uid, true, ms_search_array)
  } else {
    return false
  }

}

app.getDatastore = function(uid) {
  var is_datastore = false

  Pride.AllDatastores.each(function(ds) {
    if (uid == ds.get('uid')) {
      is_datastore = ds
    }
  })

  return is_datastore
}