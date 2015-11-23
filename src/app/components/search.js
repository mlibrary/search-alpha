var App = App || {};

App.searchInput = m.prop()
App.searchData = m.prop()
App.searchObject = m.prop()

App.previousUid = m.prop()

App.Search = {
  set: function(set_config) {
    App.searchObject().set(set_config)
  },

  controller: function() {
    return {
      submitSearch: function() {
        App.messages = []
        NProgress.start()

        var config = {
          count: 10,
          field_tree: new Pride.FieldNode('title', new Pride.LiteralNode(App.searchInput()))
        }

        if (!App.searchObject()) {
          App.searchObject(Pride.AllDatastores.newSearch(App.ActiveDatastore.uid))
          App.previousUid(App.ActiveDatastore.uid)
        } else {
          // Check if uid has changed.
          // If yes, create new search object.

          if (App.ActiveDatastore.uid != App.previousUid()) {
            App.searchObject(Pride.AllDatastores.newSearch(App.ActiveDatastore.uid))
            App.previousUid(App.ActiveDatastore.uid)
          }
        }

        App.Search.set(config)
        App.searchObject().run()

        App.searchObject().addResultsObserver(function(records) {
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

        App.searchObject().addRunDataObserver(function(data) {
          App.messages = []
          App.searchData(data)
        })

      }
    }
  },

  view: function(ctrl) {
    return m(".search", [
      m("form", [
        m("div", [
          m("input[type='text']#search[placeholder='Search']", {
            oninput: m.withAttr('value', function(value) {
              App.searchInput(value)
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