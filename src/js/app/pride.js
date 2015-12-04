var app = app || {};

Pride.init({
  success: function() {
    app.state.initPride(true)
  },
  failure: function() {
    app.state.initPride(false)
  }
})

// Add Pride messages to app Messages.
/*
Pride.Messenger.addObserver(function(message) {
    app.Messages.add(message);
})

app.searchObject().addFacetsObserver(function() {
  console.log('===')
  console.log(app.RecordsArray)
  console.log('facets')
  console.log('===')
})

app.searchObject().addResultsObserver(function() {
  console.log('===')
  console.log(app.RecordsArray)
  console.log('results')
  console.log('===')
})

app.searchObject().addRunDataObserver(function() {
  console.log('===')
  console.log(app.RecordsArray)
  console.log('run data')
  console.log('===')
})

app.searchObject().addSetDataObserver(function() {
  console.log('===')
  console.log(app.RecordsArray)
  console.log('set data')
  console.log('===')
})

*/