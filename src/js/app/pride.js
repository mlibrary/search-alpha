// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

Pride.Settings.datastores_url = "https://dev.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

function initPride() {
  Pride.init({
    success: function() {
      app.status('success')
      app.state.initPride()
    },
    failure: function() {
      app.status('failure')
      m.redraw()
    }
  })
}