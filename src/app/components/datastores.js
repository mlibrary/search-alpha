var App = App || {};

App.datastores = []
App.activeDatastore = {}

App.Datastores = {
  init: function() {
    Pride.AllDatastores.each(function(ds) {
      App.datastores.push({
        uid: ds.get('uid'),
        name: ds.get('metadata').name,
      })
    })

    App.activeDatastore = App.datastores[0]
    m.redraw()
  },
  controller: function() {
    return {
      selectDatastore: function(element) {
        App.RecordsArray = []
        App.searchInput("")
        document.getElementById('search').value = ""
        m.redraw()
        var datastore = _.where(App.datastores, {uid: element.dataset.uid})
        App.activeDatastore = datastore[0]
      }
    }
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(App.datastores, function(ds) {
        if (ds == App.activeDatastore) {
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