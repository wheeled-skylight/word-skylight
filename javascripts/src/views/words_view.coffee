class Skylight.Views.Words extends Backbone.View

  tagName: "ul"


  add: (word) ->
    wordView = new Skylight.Views.Word(model: word)
    @$el.append(wordView.render().el)

  render: ->
    console.log("redering words")
    console.log(@collection)
    @collection.each (word) =>
      @add(word)
    @

