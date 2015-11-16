App.Record = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m("li.item", [
      m("h3", ctrl.names[0]),
      m("dl",
        _.reduce(ctrl.fields, function(memo, field) {
          if ((field.uid != "fullrecord") && (field.uid != "title")) {
            memo.push(
              m("dt", field.name),
              m("dd", field.value)
            )
          }
          return memo
        }, [])
      )
    ])
  }
}

App.RecordsArray = []

App.Records = {
  view: function() {
    return m("ul.search-items", [
      _.map(App.RecordsArray, function(record) {
        return m.component(App.Record, record)
      })
    ])
  }
}