// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.searchables = m.prop()
app.search_switcher = m.prop()
app.data = m.prop()

app.state = {

  // Initialize Mithril
  init: function() {
    var mount_element = document.getElementById('mount-container')

    m.route(mount_element, "/", {
      "/": app.Home,
      "/search/:searchable_uid": app.Home,
      "/search/:searchable_uid/field/:field_uid": app.Home,
      "/search/:searchable_uid/field/:field_uid/query/:query": app.Home,
      "/search/:searchable_uid/field/:field_uid/query/:query/page/:page": app.Home
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

      // results records observer
      search_object.resultsObservers.add(function(data) {
        app.setSearchableObservers(search_object.uid, data, 'records')
      })

      // Set records observer
      search_object.setDataObservers.add(function(data) {
        app.setSearchableObservers(search_object.uid, data, 'metadata')
      })

      // run records observer
      search_object.runDataObservers.add(function(data) {
        app.setSearchableObservers(search_object.uid, data, 'metadata')
      })

      // search object facets observer
      search_object.facetsObservers.add(function(facets_data) {
        _.each(facets_data, function(facet) {

          facet.resultsObservers.add(function(results) {
            app.setFacetObservers(search_object.uid, facet, 'results', results) // searchable_uid, facet_object, type, data
          })

          facet.setDataObservers.add(function(data) {
            app.setFacetObservers(search_object.uid, facet, 'data', data)
          })
        })
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

    app.selected_field('title') // TODO temp, replace with first field

    app.searchables(searchables)
    m.redraw()

    app.updateRoute()

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
    search_object.resultsObservers.add(function(records) {
      app.setSearchableObservers(search_object.uid, records, 'records', ms)
    })

    search_object.setDataObservers.add(function(data) {
      app.setSearchableObservers(search_object.uid, data, 'metadata', ms)
    })

    search_object.runDataObservers.add(function(data) {
      app.setSearchableObservers(search_object.uid, data, 'metadata', ms)
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

app.getSelectedDatastore = function() {
  var uid = undefined

  if (app.search_switcher()) {
    uid = app.search_switcher().uid
  }

  return uid
}

/*
  uid:           datastore uid
  observer_data: observer results/data
  type:          "records" or "metadata"
  multisearch:   true or false
*/
app.setSearchableObservers = function(searchable_uid, observer_data, type, multisearch) {
  var data = app.data()
  var path = searchable_uid + "." + type

  if (!data) {
    data = {}
  }

  if (multisearch) {
    path = multisearch.uid + ".datastores." + searchable_uid + "." + type
    setValue(data, multisearch.uid + ".is_multisearch", true)
  } else {
    setValue(data, searchable_uid + ".is_multisearch", false)
  }

  setValue(data, path, observer_data)
  app.data(data)

  m.redraw()
}

/*
  searchable_uid: 
  facet_object
  type:            facet name or "results"
  data:            facet data
*/
app.setFacetObservers = function(searchable_uid, facet_object, type, observer_data) {

  /*

    // example of data/model structure for facets

   databases = {
     facets: [
       author: {
         facet_object: {}
         results: [
           /... facets results
         ]
         data: {}
       },
       new: {
         // facet_object
         results: [
           /... facets results
         ],
         data {}
       }
     ]
   }
  */

  var path = searchable_uid + ".facets"
  var data = app.data()

  if (!data[searchable_uid].facets) {
    // if the datastore doesn't have facets as a key, create an empty
    // array and initialize
    setValue(data, path, {})
  }

  if (type == 'results') {
    path = path + "." + facet_object.uid + ".results"
    setValue(data, path, observer_data)
  } else {
    path = path + "." + facet_object.uid + ".metadata"
    setValue(data, path, observer_data)
  }

  app.data(data)
  m.redraw()
}

app.isMultisearch = function(uid) {
  if (!uid) {
    if (app.search_switcher()) {
      uid = app.search_switcher().uid
    } else {
      return undefined
    }
  }

  if (app.data() && app.data()[uid] && app.data()[uid].is_multisearch) {
    return true
  }

  return false
}