var App = App || {};

// State contains all Pride observers
App.State = {
  query: m.prop(),
  searchCache: m.prop(),
  search: m.prop(),
  init: function() {
    m.route(document, "/", {
      "/": App.Home,
    });
  },
  prideIsReady: function() {
    App.Datastores.init()
  },
  switch: function(uid) {

    var search = this.getSearch(this.searchCache(), uid)

    // TO DO
    // 1. destroy observers
    // 2. add old search back to search cache

    // 3. remove new search item by uid
    //this.removeSearch(uid)
    // 4. re add oberservers to selected search
    this.search(search)

    console.log('hello ' + this.search())

    // 5. run() current_search: run(), search_cache: run(0)

    m.redraw()
  },
  addSearch: function(uid) {

  },
  getSearch: function(uid) {
    return _.findWhere(this.searchCache(), {uid: uid})
  },
  removeSearch: function(uid) {
    return _.without(this.searchCache(), this.getSearch(this.searchCache(), uid))
  }
}

App.State.init()