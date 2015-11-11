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
    var ds_array = []
    Pride.AllDatastores.each(function(datastore) {
      ds_array.push({name: datastore.get('metadata').name})
    })

    return ds_array
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(ctrl, function(datastore) {
        return m.component(App.Datastore, datastore)
      })
    ])
  }
}