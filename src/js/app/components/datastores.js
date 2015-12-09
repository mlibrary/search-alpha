// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.Datastores = {
  view: function() {
    return m("ul.datastores", [
      _.map(app.datastores(), function(ds) {
        var selected_class = ''
        if (ds.get('uid') == app.search_switcher().uid) {
          selected_class = '.selected'
        }

        return m("li" + selected_class + "[data-uid='" + ds.get('uid') + "']", {
          onclick: function(e) {
            app.search_switcher().switchTo(e.target.dataset.uid)
          }
        }, ds.get('metadata').name)
      })
    ])
  }
}

app.currentDatastore = function() {
  return app.getDatastore(app.search_switcher().uid)
}

app.getDatastore = function(uid) {
  return _.find(app.datastores(), function(datastore) {
    return datastore.get('uid') == uid
  })
}
