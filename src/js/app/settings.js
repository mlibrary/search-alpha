// Copyright (c) 2016, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.settings = {
  multisearches: [
    {
      name: 'Quick Search',
      uid: 'quicksearch-bento',
      datastores: ['mirlyn', 'journals', 'databases', 'website', 'guides']
    },
    {
      name: 'Movies &amp; Media Bento',
      uid: 'movies-and-media-bento',
      datastores: ['mirlyn-videos', 'mivideo', 'database-videos']
    },
    {
      name: 'Website',
      uid: 'website-bento',
      datastores: ['website', 'staff', 'events']
    }
  ],
  datastores: [
    'mirlyn',
    'articlesplus',
    'databases',
    'journals',
    'guides',
    'mirlyn-disserations',
    'database-videos',
    'dlps',
  ]
}