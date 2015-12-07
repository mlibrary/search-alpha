var app = app || {};

app.searchInput = m.prop()

app.Search = {
  controller: function() {
    return {
      submit: function() {
        var config = {
          count: 10,
          field_tree: new Pride.FieldTree.Field('title', new Pride.FieldTree.Literal(app.searchInput()))
        }
        var searchObject = app.state.currentDatastore().searchObject
        var array = []

        searchObject.set(config).run()

        searchObject.addResultsObserver(function(records) {
          _.each(records, function(record) {
            if (record) {
              record.renderPart(function(render) {
                array.push(render)
              })
            }
          })

          app.state.currentDatastore().records = array

          app.messages = [] // clear messages

          m.redraw()
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