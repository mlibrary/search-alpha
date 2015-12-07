var app = app || {}

app.Results = {
  view: function() {
    var records = app.state.currentDatastore().records

    if (records && records.length === 0) {
      return m.component(app.Pagination)
    } else {
      return m.component(app.Pagination),
        m(".search-results-container", [
          m.component(app.Records)
        ])
    }
  }
}