var App = App || {};

App.Datastores = {
  controller: function() {
    return {
      selectDatastore: function(e) {
        console.log(_.where(App.State.datastores(), {uid: e.dataset.uid}))
        App.State.currentDatastore(_.where(App.State.datastores(), {uid: e.dataset.uid})[0])
      }
    }
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(App.State.datastores(), function(ds) {
        if (ds == App.State.currentDatastore()) {
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