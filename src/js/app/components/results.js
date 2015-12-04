var app = app || {}

app.Results = {
  view: function() {
    if (app.RecordsArray.length === 0) {
      return m.component(app.Pagination)
    } else {
      return m.component(app.Pagination),
        m(".search-results-container", [
          m.component(app.SearchInfo),
          m.component(app.Records)
        ])
    }
  }
}