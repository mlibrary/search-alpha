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
            m("p.helper", "Please note only mirlyn is searchable and fields are not working."),
            m.component(App.Datastores)
          ]),
          m("main", [
            m(".search-results-container", [
              m(".search-info", [
                App.Search.resultsInfo()
              ]),
              m.component(App.Records),
            ])
          ])
        ])
      ])
    ])
  }
}