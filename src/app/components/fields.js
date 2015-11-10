var App = App || {};

App.Field = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m("option", ctrl.name)
  }
}

App.Fields = {
  controller: function(args) {
    return [
      {name: 'All Fields'},
      {name: 'Title'},
      {name: 'Author'},
      {name: 'Subject'}
    ]
  },
  view: function(ctrl) {
    return m("select.fields", [
      _.map(ctrl, function(field) {
        return m.component(App.Field, field)
      })
    ])
  }
}