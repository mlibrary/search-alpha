var App = App || {};

App.Message = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m(".message-" + ctrl.class, ctrl.details || ctrl.summary, [
      m("div.message-close", {
        onclick: function(e) {
          var element = e.target.parentElement 
          element.parentNode.removeChild(element)
        },
      }, m.trust("&#10005;"))
    ])
  }
}

App.messages = [];

App.Messages = {
  add: function(message) {
    App.messages.push(message)
    m.redraw();
  },
  controller: function() {
    return App.messages
  },
  view: function(ctrl) {
    return m("ul.messages", [
      _.map(ctrl, function(message) {
        return m.component(App.Message, message)
      })
    ])
  }
}
