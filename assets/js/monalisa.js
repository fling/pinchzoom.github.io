// Finds the first class in the array "styles" defined in "el"
function whichStyle(el, styles) {
  for (var i = 0; i < styles.length; i++) {
    if (el.hasClass(styles[i])) return i
  }
  return -1
}

// Increments the class in "el" from those in the array "styles"
function nextStyle(el, styles) {
  currentStyleIndex = whichStyle(el, styles)
  nextStyleIndex = currentStyleIndex + 1
  if (nextStyleIndex == styles.length) nextStyleIndex = 0
  el.addClass(styles[nextStyleIndex])
  if (currentStyleIndex > -1) el.removeClass(styles[currentStyleIndex])
}

function isVisible(el) {
  return ($(el).is(':visible') && (parseInt($(el).css('opacity')) > 0))
}

jQuery(function() {
  $(document).on('click', '*[data-styles]', function() {
    var styles = $(this).data('styles').split(' ')
    var target = $(this).data('styles-target')
    var el = $(this)
    if (typeof target === 'string') {
      el = $(target)
    }
    nextStyle(el, styles)
    return false
  })
})

// Functions to trigger and dismiss modals
jQuery(function() {
  $(document).on('click', function() {
    $('*[data-autodismiss]:visible').each(function() {
      if ($(this).data('styles').length>0) {
        var styles = $(this).data('styles').split(' ')
        var target = $(this).data('styles-target')
        var el = $(this)
        if (typeof target === 'string') {
          el = $(target)
        }
        if (isVisible(el)) { nextStyle(el, styles) }
      } else if ($(this).data('modalize').length>0) {
        var target = '#' + $(this).data('modalize')
        $(target).show()
      }
    })
  })
  $('*[data-modalize]').each(function() {
    var target = '#' + $(this).data('modalize')
    $(target).hide()
  })
  $('*[data-modalize]').on('click', function() {
    var target = '#' + $(this).data('modalize')
    $(target).show()
    return false;
  })
  $('*[data-unmodalize]').on('click', function() {
    var target = '#' + $(this).data('unmodalize')
    $(target).hide()
    return false;
  })
})

// Functions to find then show and hide tabs
jQuery(function() {
  $('*[data-tabset]').each(function() {
    var defaultTab = '#' + $(this).data('tabset')
    $(this).children('li').each(function() {
      var currentSheet = $(this).children('a').attr('href')
      if (currentSheet != defaultTab) {
        $(currentSheet).hide()
      } else {
        $(this).addClass('selected')
      }
      $(this).on('click', function() {
        $(this).siblings().each(function(){
          $(this).removeClass('selected')
          $($(this).children('a').attr('href')).hide()
        })
        $(this).addClass('selected')
        $($(this).children('a').attr('href')).show()
        return false
      })
    })
  })
})

// Functions to trigger and dismiss modals
jQuery(function() {
  $('*[data-push]').on('click', function() {
    var target = '#' + $(this).data('push')
    $(target).addClass("push");
    return false;
  })
  $('*[data-unpush]').on('click', function() {
    var target = '#' + $(this).data('unpush')
    if ($(this).data("unpush-destroy")) {
      $(target).remove();
    } else {
      $(target).removeClass("push");      
    }
    return false;
  })
})

// Functions to trigger and dismiss modals
jQuery(function() {
  $('*[data-show]').on('click', function() {
    var target = '#' + $(this).data('show')
    $(target).addClass("show");
    return false;
  })
  $('*[data-hide]').on('click', function() {
    var target = '#' + $(this).data('hide')
    $(target).removeClass("show");
    return false;
  })
})

// Functions for ajax replace
var loading = "<img src='images/loading.gif' alt='loading...' />";
jQuery(function(){
  $('*[data-json]').on('click', function() {
    var target = $(this).data('json')
    var attribs = $(this).data()
    var url
    var optionsHash = {}
    for (data in attribs) {
      if (data.match('jsonOption')) {
        key = data.substr(10).toLowerCase()
        value = $(this).data(data)
        optionsHash[key] = value
      } else if (data == 'jsonUrl') { url = $(this).data(data) }
    }
    $(target).html(loading)
    $.getJSON(url, optionsHash,
      function(data) {
        $(target).html('')
        $.each(data.items, function(i,item){
          $("<img/>").attr("src", item.media.m).appendTo(target);
          if ( i == 3 ) return false;
        })
      })
    return false;
  })
})

// Functions for agent styles
function get_device() {
	var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kindle']
	for(i in agents) {
	  result = navigator.userAgent.toLowerCase().match(agents[i])
		if(result) {
			return result.toString()
		}
	}
	return 'desktop'
}

function get_orientation() {
  if ($(window).height() < $(window).width()) {
    return 'landscape'
  }
  return 'portrait'
}

function other_orientation(orientation) {
  if (orientation == 'portrait') {
    return 'landscape'
  }
  return 'portrait'
}

function set_orientation() {
  orientation = get_orientation()
  if (!$('body').hasClass(orientation)) {
    $('body').removeClass(other_orientation(orientation))
    $('body').addClass(orientation)
  }
}

jQuery(function(){
  $('body').addClass(get_device())
  set_orientation()
  $(window).resize(function() {
    set_orientation()
  })
  window.addEventListener("orientationchange", function() {
    set_orientation()
  })
})
