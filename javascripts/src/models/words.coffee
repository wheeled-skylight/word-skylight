class Skylight.Models.Word extends Backbone.Model


class Skylight.Collections.Words extends Backbone.Collection

  model: Skylight.Models.Word

  initialize: (@endpoint) ->

  payload:
    sources: [807095,14511951,14293310,51241574]
    n: 500

  url: ->
    Skylight.references.constants.root_url + @endpoint

  parse: (response) -> response.words

  set_payload: (sources,n) ->
    @payload =
      sources: sources
      n: n