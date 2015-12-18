// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.settings = {
  datastores: [
    'mirlyn',
    'databases',
    'journals',
    'website',
    'mivideo',
    'mirlyn-videos',
    'guides',
    'mirlyn-disserations',
    'database-videos',
    'dlps',
    'ask-librarian',
    'staff',
    'events'
  ],
  multisearches: [
    {
      name: 'Quick Search',
      uid: 'quicksearch',
      datastores: ['mirlyn', 'journals', 'databases', 'website', 'guides']
    }
  ]
}