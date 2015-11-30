var App = App || {};

App.datastores = m.prop()

App.Datastores = {
  init: function() {
    var array = []
    var datastores = []
    Pride.AllDatastores.each(function(ds) {
      array.push({
        uid: ds.get('uid'),
        name: ds.get('metadata').name,
      })
      datastores.push({
        uid: ds.get('uid'),
        name: ds.get('metadata').name,
        datastore: ds
      })
    })
    App.datastores(array)
    App.State.searchCache(datastores)
    App.State.switch('mirlyn')
  },
  controller: function() {
    return {
      selectDatastore: function(e) {
        App.State.switch(e.dataset.uid)
      }
    }
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(App.datastores(), function(ds) {

        if (App.State.search() && ds.uid == App.State.search().uid) {
          return m("li.selected[data-uid='" + ds.uid + "']", {
            onclick: function(e) { ctrl.selectDatastore(e.target) }
          }, ds.name)
        } else {
          return m("li[data-uid='" + ds.uid + "']", {
            onclick: function(e) { ctrl.selectDatastore(e.target) }
          }, ds.name)
        }
      })
    ])
  }
}