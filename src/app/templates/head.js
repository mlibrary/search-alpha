App.Head = {
  view: function() {
    return m("head", [
      m("title", "Search [Alpha]"),
      m("meta[name='viewport'][content='width=device-width, initial-scale=1']"),
      m("link[href='https://fonts.googleapis.com/css?family=Open+Sans:400,700'][rel='stylesheet']"),
      m("link[href='src/css/styles.css'][rel='stylesheet']"),
      m("link[href='src/nprogress/nprogress.css'][rel='stylesheet']")
    ])
  }
}