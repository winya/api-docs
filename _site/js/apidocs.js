// sidenav
(function($){
	if (!$.ustreamDevelopers) { $.ustreamDevelopers = {}; };
    
	$.extend( $.easing, {
	   easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	   }
    });
	
	if (!String.prototype.toSlug) {
	  String.prototype.toSlug = function () {
		return this.toLowerCase()
		  .replace(/\s/g, '-')
		  .replace(/&/g, 'and')
		  .replace(/[^\w-]+/g,'')
		  .replace(/[-*]+/g,'-')          
		  .trim();
	  };
	}
	
	$.ustreamDevelopers.egalizeHeights = function(el,settings) {
		var base = this;
        base.$el = $(el);
        base.el = el;
		base.elemClass = settings.split(" ")[0];
		base.elemInnerClass = settings.split(" ")[1];
		
		base.init = function () {
			$(window).resize(base.onResize);
			base.onResize();
		}
		
		base.onResize = function() {
			var h = 0;
    		base.$el.find(base.elemClass).each(function() {
				var metaHeight = 0;
				
      			$(this).find(base.elemInnerClass).children().each(function() {
        			metaHeight += $(this).height() + parseInt($(this).css('margin-top'))+ parseInt($(this).css('margin-bottom'));
				});
      			h = Math.max(h, metaHeight);
    		});
    		if ($(window).width() < 560) h = 'auto';
    		base.$el.find(base.elemClass + " " + base.elemInnerClass).css('height',h);
		}
		base.init();
	};
	$.fn.egalizeHeights = function() {
        return this.each(function () {
            (new $.ustreamDevelopers.egalizeHeights(this,$(this).attr('data-egalize-heights')));
        });
    };
	
	
	$.ustreamDevelopers.stickyContent = function(el) {
		var base = this;
        base.$el = $(el);
        base.el = el;
		base.$parent = base.$el.parent();
		
		base.init = function () {
			$(window).scroll(base.onScroll);
			base.onScroll();
			$(window).resize(base.onResize);
			base.onResize();
		}
		
		base.onScroll = function() {
			var windowTop = $(window).scrollTop();
			
			var sidebarOverflow = base.$parent.height() < windowTop-base.$parent.offset().top+base.$el.height()+40;
			
			if (base.$parent.offset().top <= windowTop && !sidebarOverflow) {
                base.$el.removeClass('bottom').addClass('fixed');
            } else {
				base.$el.removeClass('fixed');
				if (sidebarOverflow) base.$el.addClass('bottom');
				else base.$el.removeClass('bottom');
			}
		}
		base.onResize = function() {
			base.$parent.css({height: $('article').height()+40});
			base.onScroll();
		}
		base.init();
	};
	$.fn.stickyContent = function() {
        return this.each(function () {
            (new $.ustreamDevelopers.stickyContent(this));
        });
    };
	
	$.ustreamDevelopers.sideNav = function (el) {
		var base = this;
        base.$el = $(el);
        base.el = el;
		
		base.init = function () {
			
			var sidenav = $('<ul class="sidenav"></ul>');
			var i = 0;
			var last_h2;
			
			$('article').find('h2,h3').each(function(el) {
				var id = $(this).text().toSlug() + "_" + i;
				$(this).attr('id',id);
				if ($(this)[0].nodeName.toLowerCase() == "h2") {
					var el = sidenav.append('<li><a href="#'+id+'">'+$(this).text()+'</a></li>');
					last_h2 = el;
				} else {
					var last = last_h2.children().last();
					if (last.find('ul').length == 0) last.append('<ul class="nav"></ul>');
					var el = last.find('ul').append('<li><a href="#'+id+'">'+$(this).text()+'</a></li>')
				}
				el.find('a').click(function(e) {
					e.preventDefault();
					var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top+1;
					$('html, body').stop().animate({ scrollTop: offsetTop }, 600, 'easeInOutExpo');
					e.preventDefault();
				});
				i++;
			});
			base.$el.prepend(sidenav);
			base.sideNavItems = sidenav.find("a");
			base.lastId = "";
			base.scrollItems = base.sideNavItems.map(function(){
              var item = $($(this).attr("href"));
              if (item.length) { return item; }
            });
            
			//bind events
			base.onScroll();
			base.onResize();
			$(window).scroll(base.onScroll);
			$(window).resize(base.onResize);
			$(window).load(base.onResize);
        };
		base.onScroll = function() {			
			var windowTop = $(window).scrollTop();

			// Get id of current scroll item
			var cur = base.scrollItems.map(function(){
			 if ($(this).offset().top < windowTop+20)
			   return this;
			});

			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";

			if (base.lastId !== id) {
			   base.lastId = id;
			   base.sideNavItems
				 .parent().removeClass("active")
				 .end().filter("[href=#"+id+"]").parents("li").addClass("active");
			}
		}
		base.onResize = function() {			
			base.$el.width(base.$el.parent().width()-20);
		}
		base.init();
	}
	$.fn.sideNav = function() {
        return this.each(function () {
            (new $.ustreamDevelopers.sideNav(this));
        });
    };
})(jQuery);	
        

$(document).ready(function() {
        
    //init code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
	
	//init responsive tables
	$('table.responsive').each(function() {
		var el = $(this);
		var wrapper = $('<div class="table-container"></div>').insertBefore(el);
		el.appendTo(wrapper);
	});
	
	
	//init equalize elements height
	$('*[data-egalize-heights]').egalizeHeights();
	
	
	//init stickycontent
	if ($('.stickyContent').length > 0) {
    	$('.stickyContent').stickyContent();
	}
	
	//init sidenav
	if ($('article[data-sidenav]').length > 0) {
    	$('.sidebar .stickyContent').sideNav();
	}
    
    //init nav toggle button
    $('a, nav .nav-toggle').bind('touchstart', function() {
       return true;
    });
    $('nav .nav-toggle').on('click',function() {
        $('#Nav').toggleClass('show');
        if ($('#Nav').hasClass('show')) {
            $('#Nav').css('height', $('#Nav').height() + $('#Nav .nav').outerHeight());
        } else {
            $('#Nav').removeAttr('style');
        }
    });
	
	$(window).on('resize', function() {
		$('#Nav').removeClass('show').removeAttr('style');
	})
    
});