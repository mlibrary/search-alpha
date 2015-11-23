var App = App || {};

//routes to start with the `#` symbol
m.route.mode = "hash";
Pride.settings.datastores_url = 'http://dev.www.lib.umich.edu/testapp/spectrum/';

Pride.init({
  success: function() {
    // Setup Routes
    m.route(document, "/", {
      "/": App.Home,
      "/record": App.FullRecord
    });

    App.Datastores.init()

    Pride.settings.connection_attempts = 2;
  }
})

// Add Pride messages to App Messages.
/*
Pride.Messenger.addObserver(function(message) {
    App.Messages.add(message);
})
*/
