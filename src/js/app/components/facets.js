// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.selected_facets = m.prop()

app.Facets = {
  controller: function() {
    this.facets = function() {
      var uid = app.getSelectedDatastore()

      if (uid) { 
        var data = app.data()
        return data[uid].facets
      } else {
        return undefined
      }
    }
    this.select = function(facet_uid, value) {
      var selected_facets = app.selected_facets()
      var datastore_uid = app.getSelectedDatastore()

      if (!selected_facets) {
        selected_facets = {}
      }

      setValue(selected_facets, datastore_uid + "." + facet_uid, value)
      app.selected_facets(selected_facets)

      app.submitSearch()
    }
    this.deselect = function(facet_uid) {
      var selected_facets = app.selected_facets()
      var datastore_uid = app.getSelectedDatastore()

      delete selected_facets[datastore_uid][facet_uid]

      app.submitSearch()
    }
    this.isSelected = function(facet_uid, value) {
      var selected_facets = app.selected_facets() 
      var datastore_uid = app.getSelectedDatastore()

      // if there are selected facets & does the facet option match a selected facet
      if (selected_facets && facet_uid && value == selected_facets[datastore_uid][facet_uid]) {
        return true
      }

      return false
    }
    this.isFacetSelected = function(facet_uid) {
      var selected_facets = app.selected_facets()
      var datastore_uid = app.getSelectedDatastore()

      if (selected_facets && facet_uid && selected_facets[datastore_uid][facet_uid]) {
        return true
      }

      return false
    }
  },
  view: function(ctrl) {
    return m('div', [
      m('ul.facet-list', [
         _.map(ctrl.facets(), function(facet) {
          if (facet.results.length > 0) {
            return m('li.facet', [
              m('h4', facet.metadata.metadata.name),
              m('ul', [
                _.map(facet.results, function(result) {
                  if (ctrl.isFacetSelected(facet.metadata.uid)) {
                    if (ctrl.isSelected(facet.metadata.uid, result.value)) {
                      return m('li.facet-item', [
                        m('div.facet-details[data-facet_uid="' + facet.metadata.uid + '"][data-facet_value="' + result.value + '"].selected', {
                          onclick: function(e) {
                            ctrl.select(facet.metadata.uid, e.target.dataset.facet_value)
                          }
                        }, result.name + " (" + result.count + ")"),
                        m("div.deselect-facet", {
                          onclick: function(e) {
                            ctrl.deselect(facet.metadata.uid, e.target.dataset.facet_value)
                          },
                        }, m.trust("&#10005;"))
                      ])
                    }
                  } else {
                    return m('li.facet-item', [
                      m('div.facet-details[data-facet_uid="' + facet.metadata.uid + '"][data-facet_value="' + result.value + '"]', {
                        onclick: function(e) {
                          ctrl.select(facet.metadata.uid, e.target.dataset.facet_value)
                        }
                      }, result.name + " (" + result.count + ")")
                    ])
                  }
                })
              ])
            ])
          }
        })
      ])
    ])
  }
}