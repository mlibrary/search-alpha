// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

Pride.Settings.datastores_url = "http://dev.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = true;

Pride.init({
  success: function() {
    app.state.initPride()
  },
  failure: function() {
    throw "Pride failed to load."
  }
})