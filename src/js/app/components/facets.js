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
    this.select = function(facet_value) {
      var data = app.data()

      // notes

      /*

        app.selected_facets strucutre:

        {
          datastore_uid: {
            facet_uid: undefined,
            facet_uid: "selected_value",
            //...
          },
          datastore_uid: {
            facet_uid: undefined,
            facet_uid: "selected_value"
            /...
          },
          /...
        }

        On search submit, pass along the datastore facet object.

        {
          facet_uid: value,
          //...
        }

      */


      app.selected_facets
    }
    this.isSelected = function(facet_uid, result_value) {

      // notes

      // check if selected datastore is the chosen one.

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
                  var selected_class = ""

                  if (ctrl.isSelected(facet.metadata.uid, result.value)) {
                    selected_class = '.selected'
                  }

                  return m('li[data-facet_uid="' + facet.metadata.uid + '"][data-value="' + result.value + '"]' + selected_class + '', {
                    onclick: function(e) {
                      ctrl.select(e.target.dataset.value)
                    }
                  }, result.name + " (" + result.count + ")")
                })
              ])
            ])
          }
        })
      ])
    ])
  }
}

app.Facets.getSelected = function() {

}

/*
<h3>Filter</h3>
<ul>
  <li>
    <h4>Academic Discipline</h4>
    <dl>
      <dt>General Information Sources<ht>
      <dl>422</dl>

      <dt>Social Siences<ht>
      <dl>396</dl>
      //...
    </dl>
  </li>
  <li>
    //...
  </li>
</ul>
*/