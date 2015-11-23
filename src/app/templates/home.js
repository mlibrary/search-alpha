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
            m.component(App.Datastores)
          ]),
          m("main", [
            m.component(App.Results)
          ])
        ])
      ])
    ])
  }
}