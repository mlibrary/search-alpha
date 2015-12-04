var app = app || {};

app.datastores = {
  controller: function() {
    return {
      selectDatastore: function(e) {
        app.switchTo(e.dataset.uid)
      }
    }
  },
  view: function(ctrl) {
    return m("ul.datastores", [
      _.map(app.state.datastores(), function(ds) {

        if (app.state.currentDatastore().uid == ds.uid ) {
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