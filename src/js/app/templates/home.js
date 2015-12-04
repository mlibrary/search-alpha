var app = app || {};

app.Home = {
  view: function() {
    return m("html", [
      m.component(app.Head),
      m("body", [
        m("header", [
          m.component(app.Messages),
          m.component(app.Header),
          m(".container", [
            m.component(app.Search)
          ])
        ]),
        m(".container", [
          m("aside", [
            m.component(app.datastores)
          ]),
          m("main", [
            m.component(app.Results)
          ])
        ]),
        m.component(app.Scripts)
      ])
    ])
  }
}