var App = App || {};

App.Home = {
  view: function() {
    return m("html", [
      m.component(App.Head),
      m("body", [
        m("header", [
          m.component(App.Messages),
          m(".container", [
            m.component(App.Search)
            ])
          ]),
        m(".container", [
          m("aside", [
            m.component(App.Datastores)
            ]),
          m("main", [
            m(".search-results-container", [
              m(".search-info", [
                "About 3 results"
              ]),
              m.component(App.Records)
            ])
          ])
        ])
      ])
    ])
  }
}