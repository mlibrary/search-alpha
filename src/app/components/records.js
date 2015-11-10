App.Record = {
  controller: function(args) {
    return args
  },
  view: function(ctrl) {
    return m("li.item", [
      m("h3", ctrl.names[0]),
      m("dl",
        _.reduce(ctrl.fields, function(memo, field_value, field_name) {
          memo.push(
            m("dt", field_name),
            m("dd", field_value)
            )
          return memo
        }, [])
      )
    ])
  }
}

App.Records = {
  controller: function() {
    return [
    {
      names: [
      'Prussia'
      ],
      fields: {
        "By": "United States. Department of State.",
        "Published": "1799, Washington : [s.n.], 1799.",
        "Format": "Book, Available Online"
      }
    },
    {
      names: [
      'Prussia : the history of a lost state / Rudolf von Thadden ; translated by Angi Rutter.'
      ],
      fields: {
        "Main Author": "Thadden, Rudolf von.",
        "Format": "Book",
        "Language": "English, German",
        "Published": "1987, Cambridge [Cambridgeshire] ; New York, NY, USA : Cambridge University Press ; Paris : Editions de la Maison des sciences de l'homme, 1987."
      }
    },
    {
      names: [
      "Prussia : the history of a lost state",
      "Prussia"
      ],
      fields: {
        "Author": "Thadden, Rudolf von.",
        "Published": "1987",
        "Format": "Book"
      }
    }
    ]
  },
  view: function(ctrl) {
    return m("ul.search-items", [
      _.map(ctrl, function(record) {
        return m.component(App.Record, record)
      })
    ])
  }
}