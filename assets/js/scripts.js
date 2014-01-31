var UA = navigator.userAgent;
if (UA.indexOf("iPhone") != -1) {

  // hide url bar
  window.addEventListener("load",function() {
  	setTimeout(function(){
  		window.scrollTo(0, 1);
  	}, 0);
  });
  
  // disable scroll in everything but .scroll
  $('body').on('touchmove', function (e) {
//     if (!$('.scroll').has($(e.target)).length) e.preventDefault();
     if (!$('.scroll').has($(e.target)).length) e.preventDefault();
  });

} else {
  
  // iScroll
  var paginate;
  
  function loaded() {
  	paginate = new iScroll('paginate', {
  		snap: true,
  		checkDOMChanges: true,
  		momentum: false,
  //		lockDirection: true,
  		hScrollbar: false,
  		onScrollEnd: function () {
  			document.querySelector('.indicator > span.active').className = '';
  			document.querySelector('.indicator > span:nth-child(' + (this.currPageX+1) + ')').className = 'active';
  			document.querySelector('#position').className = 'loc' + (this.currPageX+1);
  		}
  	 });
  }
  
  document.addEventListener('DOMContentLoaded', loaded, false);

  // keyboard shortcuts
  $(document).keydown(function(e){
      
      if (e.keyCode == 37) { paginate.scrollToPage('prev', 0); return false; }
      if (e.keyCode == 39) { paginate.scrollToPage('next', 0); return false; } 
      if (e.keyCode == 32) { paginate.scrollToPage('next', 0); return false; }
      if (e.keyCode == 49) { paginate.scrollToPage(0); return false;  }
      if (e.keyCode == 50) { paginate.scrollToPage(1); return false; }
      if (e.keyCode == 51) { paginate.scrollToPage(2); return false; }
      if (e.keyCode == 52) { paginate.scrollToPage(3); return false; }
      if (e.keyCode == 53) { paginate.scrollToPage(4); return false; }
      if (e.keyCode == 54) { paginate.scrollToPage(5); return false; }
      if (e.keyCode == 55) { paginate.scrollToPage(6); return false; }
      if (e.keyCode == 56) { paginate.scrollToPage(7); return false; }
  });

}

// random portfolio image

$(".images figure").sort(function(){
    return Math.random()*10 > 5 ? 1 : -1;
}).each(function(){
    var $t = $(this),
        color = $t.attr("class");
    $t.css({backgroundColor: color}).appendTo( $t.parent() );
    
});

// import tumblr

/*Browser detection patch*/
$.browser = {};
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var TUMBLR_API_KEY = "zVE8cK76jOk1lCjv4pPnBNgYp38xIx00Q4xz9OFNfhhQVmulOr";
var TUMBLR_HOSTNAME = "blog.pinchzoom.com";

// On DOM Ready, perform these actions
$(function() {

	function cyclePhotosets() {
		// Cycle images in photosets
		$(".photoset:not(.processed)").each(function() {
			var me = $(this);
			me.cycle();
			me.imagesLoaded(function() {
				me.height(me.find("img").first().height());
			});
			me.addClass("processed");
		});
	}

	// Example Tumblr Kit usage

	$("#all").getTumblrPosts({
		limit: 5,
		done: cyclePhotosets
	});

	$("#audio").getTumblrPosts({
		type: "audio",
		limit: 1,
		done: function(data, textStatus, jqXHR, url) {
			if(typeof console !== "undefined") {
				console.log(data);
				console.log(textStatus);
				console.log(jqXHR);
				console.log(url);
			}
		}
	});

	$("#chats").getTumblrPosts({
		type: "chat",
		limit: 2
	});

	$("#links").getTumblrPosts({
		type: "link",
		limit: 3
	});

	$("#photos").getTumblrPosts({
		type: "photo",
		limit: 3,
		template: "#tmpl-photo",
		done: cyclePhotosets
	});

	$("#quotes").getTumblrPosts({
		type: "quote",
		limit: 1,
		offset: 20
	});

	$("#text").getTumblrPosts({
		type: "text",
		limit: 5
	});

	$("#videos").getTumblrPosts({
		type: "video",
		limit: 3
	});

});
