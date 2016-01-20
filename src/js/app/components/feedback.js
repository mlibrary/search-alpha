// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {}

app.Feedback = {
  controller: function() {
    this.linkToSurvey = function() {
      window.location = 'https://docs.google.com/a/umich.edu/forms/d/1dQaS01jL9v5v9Bd85q980KyjbMzcgFsD4cLbHbNjapE/viewform?entry.644151462=' + app.getURL()
    }
  },
  view: function(ctrl) {
    return m('button.feedback-survey', {
      onclick: ctrl.linkToSurvey
    }, 'Give Feedback')
  }
}