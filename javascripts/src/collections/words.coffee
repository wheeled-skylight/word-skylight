class Skylight.Collections.Words extends Backbone.Collection

  model: Skylight.Models.Word

  initialize: (@endpoint) ->

  payload:
    sources: [
      6017542,
      14677919,
      17471979,
      15248067,
      87818409,
      14511951,
      2467791,
      807095,
      11856892,
      42958829,
      8839632,
      2836421,
      11348282,
      11855772,
      86141342,
      14173315,
      30313925,
      51241574,
      2097571,
      1652541,
      428333,
      12133382,
      14293310,
      5988062,
      5402612,
      759251,
      3108351,
      34713362,
      742143,
      15012486,
      5392522
    ]
    n: 1000

  url: ->
    Skylight.References.Constants.root_url + @endpoint

  parse: (response) ->
    response.words

  set_payload: (sources, n) ->
    @payload =
      sources: sources
      n: n