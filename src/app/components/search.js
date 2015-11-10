var App = App || {};

App.Search = {
  model: function() {
    value = m.prop("")

    return {
      value: value
    }
  },
  controller: function() {

  },
  view: function() {
    return m(".search", [
      m("form", [
        m("div", [
          m("input[type='text'][placeholder='Search']", {onchange: m.withAttr("value", App.Search.model().value), value: App.Search.model().value()}),
          m.component(App.Fields),
          m("input[type='submit'][value='Search']")
        ])
      ])
    ])
  }
}