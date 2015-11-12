App.Record = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {

    console.log('=== app record ===')
    console.log(ctrl.names)

    if (ctrl.names) {
      return m("li.item", [
        m("h3", ctrl.names[0]),
        m("dl",
          _.reduce(ctrl.fields, function(memo, field) {
            if (field.uid != "fullrecord") {
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

    /*
    return m("h3.placeholder", "No" [
      m("dl", [
        m("dt.placeholder"),
        m("dd.placeholder"),
        m("dt.placeholder"),
        m("dd.placeholder"),
        m("dt.placeholder"),
        m("dd.placeholder")
      ])
    ])
    */

    return m('h3.placeholder', 'loading')
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