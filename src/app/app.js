var App = App || {};

//routes to start with the `#` symbol
m.route.mode = "hash";

Pride.settings.datastores_url = 'http://dev.www.lib.umich.edu/testapp/spectrum/';

Pride.init(function() {
  // Setup Routes
  m.route(document, "/", {
    "/": App.Home,
    "/record": App.FullRecord
  });

})

// Add Pride messages to App Messages.
Pride.Messenger.addObserver(function(message) {
    App.Messages.add(message);
    m.redraw()
})