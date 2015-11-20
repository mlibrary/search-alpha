var App = App || {};

App.Datastores = []
App.ActiveDatastore = {}

App.DatastoresComponent = {
  init: function() {
    Pride.AllDatastores.each(function(ds) {
      App.Datastores.push({
        uid: ds.get('uid'),
        name: ds.get('metadata').name,
      })
    })

    App.ActiveDatastore = App.Datastores[0]

    m.redraw()
  },
  controller: function() {
    return {
      selectDatastore: function(datastore_element) {
        App.RecordsArray = []
        App.searchInput("")
        document.getElementById('search').value = ""
        m.redraw()
        var selected_datastore = _.where(App.Datastores, {uid: datastore_element.dataset.uid})
        App.ActiveDatastore = selected_datastore[0]
      }
    }
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(App.Datastores, function(ds) {
        if (ds == App.ActiveDatastore) {
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