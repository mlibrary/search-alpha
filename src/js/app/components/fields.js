// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Jon Earley (earleyj@umich.edu)

var app = app || {};

app.selected_field = m.prop()

app.Fields = {
  controller: function() {
    return {
      getMetadata: function() {
        var data = app.data()
        var uid

        if (app.search_switcher()) {
          uid = app.search_switcher().uid

          if (data[uid]) {
            return data[uid].metadata
          }
        }

        return undefined
      }
    }
  },
  view: function(ctrl) {
    var metadata = ctrl.getMetadata()

    if (app.isMultisearch()) {
      return m("select.fields", [
        m("option[value='title']", "Title")
      ])
    }

    if (metadata) {
      return m("select.fields", {
        onchange: function(e) {
          m.redraw.strategy("none")
          app.selected_field(e.target.value)
          m.route(app.getURL())
        }
      },
      [
        _.map(metadata.fields, function(field) {
          if (field.uid == app.selected_field()) {
            return m("option[selected][value='" + field.uid + "']", field.metadata.name)
          } else {
            return m("option[value='" + field.uid + "']", field.metadata.name)
          }
        })
      ])
    }

    return m('select.disabled')
  }
}

app.getFields = function() {
  var data = app.data()
  var uid = app.currentSearchable().uid

  if (data[uid].is_multisearch) {

    // TODO TEMP
    // What fields should be used to multisearches?
    return [
      {
        uid: 'title',
        metadata: {
          name: "Title"
        }
      }
    ]
  } else {
    return data[uid].metadata.fields
  }
}

app.changeToField = function(field_uid) {
  var available_fields = app.getFields()
  var field = _.findWhere(available_fields, {uid: field_uid})

  if (field) {
    app.selected_field(field.uid)
  }
}