(function(e){e.scrollUp=function(t){var n={scrollName:"scrollUp",topDistance:50,topSpeed:300,animation:"fade",animationInSpeed:200,animationOutSpeed:200,scrollText:"",scrollImg:false,activeOverlay:false};var r=e.extend({},n,t),i="#"+r.scrollName;e("<a/>",{id:r.scrollName,href:"#top",title:r.scrollText}).appendTo("body");if(!r.scrollImg){e(i).text(r.scrollText)}e(i).css({display:"none",position:"fixed","z-index":"2147483647"});if(r.activeOverlay){e("body").append("<div id='"+r.scrollName+"-active'></div>");e(i+"-active").css({position:"absolute",top:r.topDistance+"px",width:"100%","border-top":"1px dotted "+r.activeOverlay,"z-index":"2147483647"})}e(window).scroll(function(){switch(r.animation){case"fade":e(e(window).scrollTop()>r.topDistance?e(i).fadeIn(r.animationInSpeed):e(i).fadeOut(r.animationOutSpeed));break;case"slide":e(e(window).scrollTop()>r.topDistance?e(i).slideDown(r.animationInSpeed):e(i).slideUp(r.animationOutSpeed));break;default:e(e(window).scrollTop()>r.topDistance?e(i).show(0):e(i).hide(0))}});e(i).click(function(t){e("html, body").animate({scrollTop:0},r.topSpeed);t.preventDefault()})}})(jQuery);
!function($){function ScrollSpy(element,options){var process=$.proxy(this.process,this),$element=$(element).is("body")?$(window):$(element),href;this.options=$.extend({},$.fn.scrollspy.defaults,options);this.$scrollElement=$element.on("scroll.scroll.data-api",process);this.selector=(this.options.target||((href=$(element).attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""))||"")+" ul li > a";this.$body=$("body").on("click.scroll.data-api",this.selector,process);this.refresh();this.process()}ScrollSpy.prototype={constructor:ScrollSpy,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var href=$(this).attr("href");return/^#\w/.test(href)&&$(href).length?href:null});this.offsets=$.map(this.targets,function(id){return $(id).position().top})},process:function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset,offsets=this.offsets,targets=this.targets,activeTarget=this.activeTarget,i;for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}},activate:function(target){var active;this.activeTarget=target;this.$body.find(this.selector).parent(".active").removeClass("active");active=this.$body.find(this.selector+'[href="'+target+'"]').parent("li").addClass("active");if(active.parent(".dropdown-menu")){active.closest("li.dropdown").addClass("active")}}};$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this),data=$this.data("scrollspy"),options=typeof option=="object"&&option;if(!data){$this.data("scrollspy",(data=new ScrollSpy(this,options)))}if(typeof option=="string"){data[option]()}})};$.fn.scrollspy.Constructor=ScrollSpy;$.fn.scrollspy.defaults={offset:10};$(function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this);$spy.scrollspy($spy.data())})})}(window.jQuery);
$(function(){
	$('#nav-plane ul li a,.r_nav a,.nav a').on('click', function(e){
		var aim = $(e.target).attr('href').slice(1),dom = $('#'+aim),top = dom.offset().top;
		$('html, body').animate({scrollTop: top-49}, 200,function(){ dom.stop();});
		e.preventDefault();
	})
});
$(function(){
	$(".web_list>li>div").css("background-color","#F33").hide();
	$(".web_list>li").mouseover(function(){
		$(this).children("div").stop().fadeIn(100);
	});
	$(".web_list>li").mouseout(function(){
		$(this).children("div").stop().fadeOut(200);
	});
	$(".b_close a").click(function(){
		$(this).parent().parent("div").hide()	
	})
	$(".bottom_fixed div").click(function(){
		$(this).parent("div").hide()	
	})	
	$("#show_ad").click(function(){
		$(".ad").toggleClass("adbg");
		$(this).toggleClass("show_adbg");
	});
	    $(".open").click(function(){
		$(".tanchu").fadeIn(200)
	})
	$(".tanchu-close p").click(function(){
		$(".tanchu").fadeOut(200)
	})
});

