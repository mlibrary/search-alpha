var App = App || {};

App.Datastore = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m("li", ctrl.name)
  }
}

App.Datastores = {
  controller: function() {
    return [
      {name: 'Quicksearch'},
      {name: 'Catalog'},
      {name: 'Articles'},
      {name: 'Databases'},
      {name: 'Online Fournals'},
      {name: 'Library Website'}
    ]
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(ctrl, function(datastore) {
        return m.component(App.Datastore, datastore)
      })
    ])
  }
}