window.Skylight =
  Collections: {}
  Models: {}
  Views: {}
  Router: {}
  references: {
    constants: {
      root_url: 'http://localhost:3000'
    }
  }
  initialize: ->
    console.log('starting...')
    new Skylight.Router.MainRouter
    Backbone.history.start()
    console.log('done starting')



