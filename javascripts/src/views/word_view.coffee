class Skylight.Views.Word extends Backbone.View

  tagName : "li"

  template : JST['javascripts/src/templates/word.jst']

  events:
    'click' : 'showAlert'

  showAlert: ->
    console.log("click on " + @model.get('word'))

  render: ->
    console.log("redering word")
    console.log(@model.toJSON())
    console.log("template")
    template = @template(@model.toJSON())
    @$el.html(template)
    @


