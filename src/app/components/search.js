var App = App || {};

(function() {

  'use strict'

  App.Search = {

    controller: function() {
      this.text = m.prop('')
      this.submitSearch = function() {
        // If there is some text
        if (this.text()) {
          App.MessageList = []; // Clear error messages
          // A Search object should be created when datastores are fetched.
          var search_object = Pride.AllDatastores.newSearch('mirlyn').set(
            {
              count: 10,
              field_tree: new Pride.FieldNode('title', new Pride.LiteralNode(this.text()))
            }
          ).run()

          search_object.addResultsObserver(function(e) {
            App.Records.update(e)
          })
        }
      }
    },

    view: function(ctrl) {
      return m(".search", [
        m("form", [
          m("div", [
            m("input[type='text'][placeholder='Search']", {
              oninput: m.withAttr('value', function(value) {
                ctrl.text(value)
              })
            }),
            m.component(App.Fields),
            m("input[type='submit'][value='Search']", {
              onclick: function() {
                ctrl.submitSearch()
              }
            })
          ])
        ])
      ])
    }

  }

})();