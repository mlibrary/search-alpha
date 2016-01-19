// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.messages = [];

app.Message = {
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

app.Messages = {
  clear: function() {
    app.messages = []
    m.redraw()
  },
  add: function(message) {
    app.messages.push(message)
    m.redraw()
  },
  controller: function() {
    return app.messages
  },
  view: function(ctrl) {
    return m("ul.messages", [
      _.map(ctrl, function(message) {
        return m.component(app.Message, message)
      })
    ])
  }
}
