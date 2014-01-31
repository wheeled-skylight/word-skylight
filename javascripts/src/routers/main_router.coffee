class Skylight.Router.MainRouter extends Backbone.Router

  routes:
    '': 'index'
    'home': 'index'

  initialize: ->
    console.log('starting router')


  index: ->
    words = new Skylight.Collections.Words('/words/intersect')
    words.fetch
      data: JSON.stringify(words.payload)
      type: 'POST'
      contentType: 'application/json'
      success: (sample) ->
        wordsView = new Skylight.Views.Words(collection: sample)
        $('#words-container').html(wordsView.render().el)





  appendWords: (view) ->
    console.log("appening words...")
    $('#words-container').html(view.render().el)




