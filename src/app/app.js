var App = App || {};

// Mithril settings
m.route.mode = "hash";

// Intialize Pride
Pride.init({
  success: function() {
    m.route(document, "/", {
      "/": App.Home,
      "/record": App.FullRecord
    });

    App.Datastores.init()
  }
})

// Add Pride messages to App Messages.
/*
Pride.Messenger.addObserver(function(message) {
    App.Messages.add(message);
})

App.searchObject().addFacetsObserver(function() {
  console.log('===')
  console.log(App.RecordsArray)
  console.log('facets')
  console.log('===')
})

App.searchObject().addResultsObserver(function() {
  console.log('===')
  console.log(App.RecordsArray)
  console.log('results')
  console.log('===')
})

App.searchObject().addRunDataObserver(function() {
  console.log('===')
  console.log(App.RecordsArray)
  console.log('run data')
  console.log('===')
})

App.searchObject().addSetDataObserver(function() {
  console.log('===')
  console.log(App.RecordsArray)
  console.log('set data')
  console.log('===')
})

*/