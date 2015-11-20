var App = App || {};

App.Search = {

  controller: function() {
    this.text = m.prop('')




    this.submitSearch = function(){

      NProgress.start();

      App.MessageList = []; // Clear error messages
      // A Search object should be created when datastores are fetched.

      var active_datastore_uid = App.ActiveDatastore.uid
      var searchObject = Pride.AllDatastores.newSearch(active_datastore_uid).set(
        {
          count: 10,
          field_tree: new Pride.FieldNode('title', new Pride.LiteralNode(this.text()))
        }
      ).run()

      searchObject.addResultsObserver(function(records) {
        App.RecordsArray = [] // reset records array
        _.each(records, function(record) {

          if (record) {
            record.renderPart(function(render) {
              App.RecordsArray.push(render)
              m.redraw()
            })
          }
        })

        // No results or waiting to hear back from Pride
        if ((records.length == 0) || (records[0] != undefined)) {
          NProgress.done()
        }
      })
    }

    this.reset = function() {
      this.text("")
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

App.SearchInfoComponent = {
  view: function() {
    if (App.RecordsArray.length > 0) {
      return m(".search-info", App.RecordsArray.length + " Results")
    }

    return m('.search-info', "")
  }
}