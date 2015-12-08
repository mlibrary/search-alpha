// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

Pride.init({
  success: function() {
    app.state.initPride()
  },
  failure: function() {
    //TODO
    //Add a failure message

    throw "Pride failed to load."
  }
})