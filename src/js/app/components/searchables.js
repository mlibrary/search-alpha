// Copyright (c) 2015, Regents of the University of Michigan.
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
            app.search_switcher().switchTo(e.target.dataset.uid)
          }
        }, searchable.name)
      })
    ])
  }
}

app.currentSearchable = function() {
  return app.getSearchable(app.search_switcher().uid)
}

app.getSearchable = function(uid) {
  return _.find(app.searchables(), function(searchable) {
    return searchable.uid == uid
  })
}
