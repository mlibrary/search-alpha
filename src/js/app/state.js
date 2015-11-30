var App = App || {};

// State contains all Pride observers
App.State = {
  init: function() {
    m.route(document, "/", {
      "/": App.Home,
    });
  },
  prideIsReady: function() {
    var array = []
    Pride.AllDatastores.each(function(ds) {
      array.push({
        uid: ds.get('uid'),
        name: ds.get('metadata').name,
      })
    })
    App.State.datastores(array)
    App.State.currentDatastore(App.State.datastores()[0])
    m.redraw()
  },
  query: m.prop(),
  datastores: m.prop(),
  currentDatastore: m.prop()
}

App.State.init()