var App = App || {}

App.Results = {
  view: function() {
    if (App.RecordsArray.length === 0) {
      return m.component(App.Pagination)
    } else {
      return m.component(App.Pagination),
        m(".search-results-container", [
          m.component(App.SearchInfo),
          m.component(App.Records)
        ])
    }
  }
}