var App = App || {};

//routes to start with the `#` symbol
m.route.mode = "hash";

Pride.settings.datastores_url = 'http://dev.www.lib.umich.edu/testapp/spectrum/';

// TODO
// call who cares about messages
// clear messages on event (like a new search event)

// Pride.AllDatastores.newSearch('mirlyn').set({count: 10}).run()

Pride.init(function() {

  // Add Pride messages to App Messages.
  Pride.Messenger.addObserver(function(message) {
    App.Messages.add(message); 
  })

  // Setup Routes
  m.route(document, "/", {
    "/": App.Home,
    "/record": App.FullRecord
  });

})