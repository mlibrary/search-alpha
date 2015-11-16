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

App.MessageList = [];

App.Messages = {
  add: function(message) {
    App.MessageList.push(message)
    m.redraw();
  },
  controller: function() {
    return App.MessageList
  },
  view: function(ctrl) {
    return m("ul.messages", [
      _.map(ctrl, function(message) {
        return m.component(App.Message, message)
      })
    ])
  }
}
