app.updateRoute = function(force_update) {
  var searchable_uid = m.route.param('searchable_uid')
  var field_uid = m.route.param('field_uid')
  var query = m.route.param('query')

  if (m.route() != '/') {
    if (app.switchToSearchable(searchable_uid) && field_uid) {
      app.changeToField(field_uid)
    }

    if (query) {
      app.search_input(query)
      app.submitSearch()
    }
  }
}

app.getURL = function() {
  var url = "/search/"
    + app.currentSearchable().uid + "/field/"
    + app.selected_field()
  var query = app.search_input()

  if (query) {
    url = url + "/query/" + query
  }

  return url
}