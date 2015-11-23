var App = App || {};

App.Home = {
  view: function() {
    return m("html", [
      m.component(App.Head),
      m("body", [
        m("header", [
          m.component(App.Messages),
          m.component(App.Header),
          m(".container", [
            m.component(App.Search)
          ])
        ]),
        m(".container", [
          m("aside", [
            m.component(App.DatastoresComponent)
          ]),
          m("main", [
            m.component(App.Pagination),
            m(".search-results-container", [
              m.component(App.SearchInfoComponent),
              m.component(App.Records)
            ])
          ])
        ])
      ])
    ])
  }
}