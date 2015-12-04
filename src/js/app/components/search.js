var app = app || {};

app.Search = {
  controller: function() {
    return {
      submit: function() {

        var config = {
          count: 10,
          field_tree: new Pride.FieldTree.Field('title', new Pride.FieldTree.Literal(app.searchInput()))
        }

        var searchObject = app.state.currentDatastore().searchObject
        var records = []
        searchObject.set(config).run()

        searchObject.addResultsObserver(function(records) {
          _.each(records, function(record) {
            record.renderPart(function(render) {
              records.push(render)
            })
          })

          app.state.currentDatastore().records = records
        })

      } // end of submit func
    }
  },
  view: function(ctrl) {
    return m(".search", [
      m("form", [
        m("div", [
          m("input[type='text']#search[placeholder='Search']", {
            oninput: m.withAttr('value', function(value) {
              app.searchInput(value)
            })
          }),
          m.component(app.Fields),
          m("input[type='submit'][value='Search']", {
            onclick: function(e) {
              e.preventDefault()
              ctrl.submit()
            }
          })
        ])
      ])
    ])
  }
}

app.SearchInfo = {
  view: function() {
    if (app.state.records.length > 0) {
      return m(".search-info", "PLACEHOLDER Results")
    }
    return m('.search-info', "")
  }
}