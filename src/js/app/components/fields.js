var App = App || {};

App.Fields = {
  controller: function(args) {
    return [
      {name: 'Title'},
      {name: 'Author'},
      {name: 'Subject'}
    ]
  },
  view: function(ctrl) {
    return m("select.fields[disabled]", [
      _.map(ctrl, function(field) {
        return m("option", field.name)
      })
    ])
  }
}