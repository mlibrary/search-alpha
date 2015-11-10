var App = App || {};

App.Message = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m(".message-" + ctrl.class, ctrl.details, [
      m("div.message-close", m.trust("&#10005;"))
    ])
  }
}

App.Messages = {
  update: function(message) {
    console.log(message.details);
  },
  model: function() {
    this.class
  },
  controller: function(args) {
    return [
      {
        class: "info",
        summary: "Information!",
        details: "You've been given a sample of an informational message."
      },
      {
        class: "success",
        summary: "Success",
        details: "A long-winded explanation for your success."
      },
      {
        class: "warning",
        summary: "Warning",
        details: "The thing might be broken, use caution."
      },
      {
        class: "error",
        summary: "Error",
        details: "Something went wrong with the doohickey."
      }
    ]

    Pride.Messe
  },
  view: function(ctrl) {
    return m("ul.messages", [
      _.map(ctrl, function(message) {
        return m.component(App.Message, message)
      })
    ])
  }
}
