var app = app || {};

Pride.init({
  success: function() {
    app.state.initPride(true)
  },
  failure: function() {
    app.state.initPride(false)
  }
})