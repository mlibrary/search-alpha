var App = App || {};

App.FullRecord = {
  view: function () {
    return m("html", [
      m.component(Head),
      m("body", [
        m("header", [
          m(".container", [
            m.component(Messages),
            m.component(Search)
            ])
          ]),
        m(".container", [
          m("main")
        ])
      ])
    ])
  }
}