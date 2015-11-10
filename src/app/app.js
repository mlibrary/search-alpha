var App = App || {};

//routes to start with the `#` symbol
m.route.mode = "hash";

Pride.settings.datastores_url = 'http://dev.www.lib.umich.edu/testapp/spectrum/';

function HelloWorld(x) {

  // TODO
  // call who cares about messages
  // clear messages on event (like a new search event)

  console.log(x)
}

//Pride.Messenger.addObserver(App.Messages.update(message))

// Pride.AllDatastores.newSearch('mirlyn').set({count: 10}).run()

Pride.init(function() {
  m.route(document, "/", {
    "/": App.Home,
    "/record": App.FullRecord
  });

  Pride.Messenger.addObserver(function(message) {
    App.Messages.update(message); 
  })
})