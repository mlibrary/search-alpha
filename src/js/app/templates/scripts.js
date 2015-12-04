var app = app || {}

app.Scripts = {
  view: function() {
    return m('div', [
      m('script[src="src/lib/pride/initial_setup.js"]'),
      m('script[src="src/lib/pride/settings.js"]'),
      m('script[src="src/js/app/pride_settings.js"]'),
      m('script[src="src/lib/pride/constructors/request_buffer.js"]'),
      m('script[src="src/lib/pride/functions/safe_call.js"]'),
      m('script[src="src/lib/pride/libraries/reqwest.js"]'),
      m('script[src="src/lib/pride/constructors/datastore.js"]'),
      m('script[src="src/lib/pride/constructors/field_tree_nodes.js"]'),
      m('script[src="src/lib/pride/constructors/observable.js"]'),
      m('script[src="src/lib/pride/constructors/search_core.js"]'),
      m('script[src="src/lib/pride/constructors/search.js"]'),
      m('script[src="src/lib/pride/constructors/section.js"]'),
      m('script[src="src/lib/pride/constructors/query.js"]'),
      m('script[src="src/lib/pride/constructors/paginater.js"]'),
      m('script[src="src/lib/pride/constructors/multisearch.js"]'),
      m('script[src="src/lib/pride/constructors/record.js"]'),
      m('script[src="src/lib/pride/singletons/messenger.js"]'),
      m('script[src="src/lib/pride/singletons/all_datastores.js"]'),
      m('script[src="src/lib/pride/functions/init.js"]'),
      m('script[src="src/lib/pride/functions/request.js"]'),
      m('script[src="src/lib/pride/functions/deep_clone.js"]'),
      m('script[src="src/lib/pride/functions/escape.js"]'),
      m('script[src="src/js/app/pride.js"]'),
    ])
  }
}