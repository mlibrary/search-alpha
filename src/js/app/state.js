var app = app || {};

// state contains all Pride observers
app.state = {
  currentDatastore: m.prop({}),
  datastores: m.prop([]),

  init: function() {
    m.route(document, "/", {
      "/": app.Home,
    });
    NProgress.start() // Pride start
  },
  initPride: function(success) {
    if (success) {

      // Datastores
      var array = []
      Pride.AllDatastores.each(function(ds) {
        array.push({
          uid: ds.get('uid'),
          name: ds.get('metadata').name,

          // Search object
          searchObject: Pride.AllDatastores.newSearch(ds.get('uid')),
          records: []
        })
      })
      this.datastores(array)

      app.switchTo('databases')
      m.redraw()

    } else {
      console.log('Pride failed to load.')
      // TODO set an error message
    }

    // Messages
    Pride.Messenger.addObserver(function(message) {
        app.Messages.add(message);
    })

    NProgress.done() // Pride done
  }
}

// Utilties
// TODO: switchTo

app.switchTo = function(uid) {
  if (typeof uid === "string") {
    var ds = _.findWhere(app.state.datastores(), {uid: uid})

    if (ds === undefined) {
      throw "datastore \"" + uid + "\" doesn't exist"
    } else {
      app.state.currentDatastore(ds)

      return ds
    }
  } else {
    throw "datastore unique uid is not a string"
  }

  return undefined
}

app.state.init()