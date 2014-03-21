window.Skylight =
  Collections: {}
  Models: {}
  Views: {}
  Router: {}
  References: {
    Constants: {
      root_url: 'http://localhost:8081'
    }
  }
  initialize: ->
    console.log('starting...')
    new Skylight.Router.MainRouter
    Backbone.history.start()
    console.log('done starting')



