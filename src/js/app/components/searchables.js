// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.Searchables = {
  view: function() {
    return m("ul.searchables", [
      _.map(app.searchables(), function(searchable) {
        var selected_class = ''

        if (searchable.uid == app.search_switcher().uid) {
          selected_class = '.selected'
        }

        return m("li" + selected_class + "[data-uid='" + searchable.uid + "']", {
          onclick: function(e) {
            app.switchToSearchable(e.target.dataset.uid)

            // TODO
            // When switching to a Multisearch (e.g. Quick Search),
            // the config count should be set to 3.

            m.route(app.getURL())
          }
        }, m.trust(searchable.name))
      })
    ])
  }
}

app.switchToSearchable = function(uid) {
  if (app.isSearchable(uid)) {
    app.search_switcher().switchTo(uid)
    return true
  }

  return false
}

app.currentSearchable = function() {
  return app.getSearchable(app.search_switcher().uid)
}

app.getSearchable = function(uid) {
  return _.find(app.searchables(), function(searchable) {
    return searchable.uid == uid
  })
}

app.isSearchable = function(uid) {
  var is_searchable = false

  _.find(app.searchables(), function(searchable) {
    if (searchable.uid == uid) {
      is_searchable = true
    }
  })

  return is_searchable
}