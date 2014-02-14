class Skylight.Views.Words extends Backbone.View

  tagName: "ul"

  add: (word) ->
#    console.log("adding word")
#    console.log(word)
    wordView = new Skylight.Views.Word(model: word)
    @$el.append(wordView.render().el)

  render: ->
#    console.log("rendering words")
#    console.log(@collection)
    @collection.each (word) => @add(word)
    @

