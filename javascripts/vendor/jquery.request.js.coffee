(($) ->
  $.extend
    getRequest: (url, params) ->
      path = location.protocol + "//" + location.host + url + "?" + $.param(params)
      Turbolinks.visit(path)

    postRequest: (domain, url, params) ->
      $tempForm = $("<form>").attr("method", "post").attr("action", location.protocol + "//" + location.host + url)
      $.each params, (key, value) ->
        $tempForm.append($("<input type='hidden'>").attr("name", key).attr("value", value))
      $tempForm.appendTo "body"
      $tempForm.submit()
) jQuery
