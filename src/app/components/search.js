var App = App || {};

App.searchInput = m.prop("")

App.Search = {

  controller: function() {
    return {
      submitSearch: function() {
        App.messages = []
        NProgress.start()
        var search_object = Pride.AllDatastores.newSearch(App.ActiveDatastore.uid).set(
          {
            count: 10,
            field_tree: new Pride.FieldNode('title', new Pride.LiteralNode(App.searchInput()))
          }
        ).run()

        search_object.addResultsObserver(function(records) {
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