

$(document).ready(function(){

	
	var gotoTop = false;

	var debugi = 0;
	
	// CONSTANTS
	var top = 0,
		scroll_direction = "down", // 0=DOWN, 1=UP
		init_scale = 0,
		lastScrollTop = 0,
		section_height = 2000,
		wait_for_section=0,
		counter = 0,
		body_height = $('body').height(),
		section_selector = ".nsection",
		number_of_sections = 0,
		current_section_obj =  $(section_selector).get(0),
		current_section_obj_id =  $(current_section_obj).attr('id'),
		prev_section_obj = null,
		next_section_obj = null,
		scrolling = true,
		par_init_scale = 1,
		split_start = 0.5,


		current_section = 1,
		container = $("#poster_middle"),
		poster_top = $("#poster_top"),
		poster_bottom = $("#poster_bottom"),
		front_section = $("#front_section"),
		second_section = $("#second_section"),
		chapters_section = $("#chapters_section"),
		ensemble_section = $("#ensemble_section"),
		sections = [front_section, second_section, chapters_section, ensemble_section];


	
	function init() {
		
		number_of_sections = $(section_selector).length;
	
		// SET BODY HEIGHT
		$('body').height((number_of_sections*(section_height+wait_for_section)));
		

		window_height = $(window).height();
		window_width = $(window).width();
		body_height = $('body').height();

		
		
		$('.nsection').each(function(index){
			if (index>0){
				zindex = 10 -index;
				$('.nsection').eq(index).css('z-index',zindex);
			
			}
		$('.nsection').eq(1).css('z-index','11');
			
		});
		
			

		
		// JQ ALIGN
		jq_vaca();
		
		
	
	}
	
	
	$(window).load(function(){
		init();
	});
	// INIT ALL VALUES
	init();
	
	function goToSection(i){

		var window2 = $('html,body');

		var temp = ((i/number_of_sections)*(body_height-window_height));
		if (i>0){
			temp += (section_height/3);
		}
		
		
		var scroll_pos = (section_height*i);
		TweenLite.to(window2, 1, {scrollTop:temp});
	}


	function afterChangeSection(){

		id = $(current_section_obj).attr('id');
		
		
		//debug('show'+current_section_obj_id);

		if (current_section==1){
			//alert('1');
			$("#front_section").fadeIn();
			front();
		}
		if(current_section >1){
			$("#front_section").hide();
//			if($(prev_section_obj).css("opacity")>0){}
				//debug(scroll_direction);
				
				
				if (scroll_direction=='down'){
					goaway_scale = 3;
					curtain_dir = "-100%"
				} else {
					goaway_scale = 0.9;
					curtain_dir = "0%"
				}
					
					prev_section_obj_id = "#"+$(prev_section_obj).attr('id');
					
					
			
			
			TweenLite.to($("#menu"),0.3,{top:"-258px"});
		} else {
			//TweenLite.to($("#second_section"), 0.5, {opacity: 0});
			TweenLite.to($("#menu"),0.3,{top:"-358px"});
		}
		/*
		if($(current_section_obj).css("opacity")<1){
			//TweenLite.to(current_section_obj,1.5, {opacity:1});
		}*/
		
		//showLabel();
		

	}
	

	function scrollCalculations(){
		
		// SET DIRECTION
		var st = $(this).scrollTop();
		
		if (st > lastScrollTop){
		      scroll_direction = "down";
		      init_scale = 0;
		   } else {
		      scroll_direction = "up";
		      init_scale = 2;
		}
		lastScrollTop = st;
	
		
		top=$(window).scrollTop();
		html_height = body_height-window_height;
		scroll_percent =top/html_height;
			
		// SECTION
		
		
		current_section = Math.ceil(scroll_percent*number_of_sections);

		// NO ZERO SECTION
		if (current_section==0){
			current_section = 1;
		}
		
	
		
		
		// IF CURRENT != PREV - THEN SECTION CHANGED
		if(current_section_obj != $(section_selector).get(current_section-1)){
			beforChangeSection();
			prev_section_obj = current_section_obj;
			current_section_obj =  $(section_selector).get(current_section-1);
			current_section_obj_id = $(current_section_obj).attr('id');
			afterChangeSection();
		} 
		
		
				
		// SECTION PERCENTAGE
		section_percentage = (((scroll_percent*number_of_sections)-current_section)+1);
		section_percentagex2 = section_percentage*2;
	
		
		// SELECT NEXT SECTION FROM SCROLL DIRECTION
		next_index = -1;
		
		if(scroll_direction=="down"){
			next_index = current_section;
		} else{
			next_index = current_section-1;
		}
		
		next_section_obj =  $(section_selector).get(next_index);
		
		if ($(next_section_obj).length<1) {
			next_section_obj = null;
		}
		 

		
		
		
		if (current_section > 1){
			TweenLite.set(next_section_obj,{opacity:1});
			TweenLite.set(current_section_obj,{opacity:1});
		}
		
		//$("#"+current_section_obj_id).show();
		//$(current_section_obj_id).show();
		
		if (debugi==true){
		debug ("Current_section:"+current_section+"<br>current_section_obj_id:"+current_section_obj_id+"<br> Top: "+top+"<br> Scroll: "+scroll_percent+ "<br> Scroll Percentage: " + section_percentage+ "<br> Scroll Percentagex2: " + section_percentagex2+"<br> next_section: "+$(next_section_obj).attr('id')+"<br> prev_section: "+$(prev_section_obj).attr('id')+"<br> window height: "+window_height+"<br> body height: "+body_height);
		}
		
	}
	
	

	
	$(window).resize(function (e) { 
		init();

	});
	
	
		

	
	function front(){

		TweenLite.to($(".notfront"),0.1,{opacity:0});
		current_section = 1;

	
	}
	
	
	$(window).scroll(function (e) { 
		
		scrollCalculations();
		
		if (scrolling){

		if (current_section ==1){

	
			rev_scroll_percent =(((1/section_percentagex2)-1)/100)+0;
			opacity_percent=section_percentagex2;
			

			
			
			
			if($("#front_section").css("opacity")<5){
				TweenLite.to("#front_section", 1.5, {opacity: 1});
			
			}
	
			if (top>15){
				TweenLite.to(poster_top, 1.5, {opacity: rev_scroll_percent});
				TweenLite.to(poster_bottom, 1.5, {opacity: rev_scroll_percent});
				
				par_size =  (((section_percentagex2 +1)*(section_percentage+1))*2);
				TweenLite.to(container, 0.5, {scale:par_size});
				
				
				
				if(($(container).height()*par_size)>=($(window).height()+400)){
					TweenLite.to($("#second_section"), 0.5, {opacity: 1});
				} else {

				}
			
			} else {
				// RESET TWEENs IF SCROLLING
				TweenLite.to(container, 1.5, {scale:par_init_scale});
				TweenLite.to(poster_top, 1.5, {opacity: 1});
				TweenLite.to(poster_bottom, 1.5, {opacity: 1});
				TweenLite.to($("#second_section"), 0.5, {opacity: 0});
			}

		} 
		

		
		if (current_section ==2 || current_section ==3 || current_section ==4){
	
			rev_scroll_percent =(((1/section_percentagex2)-1)/100)+0;
			opacity_percent=section_percentagex2;
			

			
			
			
			if($("#front_section").css("opacity")<5){
				TweenLite.to("#front_section", 1.5, {opacity: 1});
			
			}
	
			if (top>15){
				TweenLite.to(poster_top, 1.5, {opacity: rev_scroll_percent});
				TweenLite.to(front_section, 1.5, {opacity: rev_scroll_percent});
				
				par_size =  (((section_percentagex2 +1)*(section_percentage+1))*2);
				TweenLite.to(container, 0.5, {scale:par_size});
				
				
				
				if(($(container).height()*par_size)>=($(window).height()+400)){
					TweenLite.to($("#second_section"), 0.5, {opacity: 1});
				} else {

				}
			
			} else {
				// RESET TWEENs IF SCROLLING
				TweenLite.to(container, 1.5, {scale:par_init_scale});
				TweenLite.to(poster_top, 1.5, {opacity: 1});
				TweenLite.to(poster_bottom, 1.5, {opacity: 1});
				TweenLite.to($("#second_section"), 0.5, {opacity: 0});
			}
			
		}}		


		// if (current_section ==2 || current_section ==3 || current_section ==4){
	
		// 	rev_scroll_percent =(((1/section_percentagex2)-1)/100)+0;
		// 	opacity_percent=section_percentagex2;
			

			
			
			
		// 	if(sections[current_section-1].css("opacity")<5){
		// 		TweenLite.to(sections[current_section-1], 1.5, {opacity: 1});
			
		// 	}
	
		// 	if (top>15){
		// 		TweenLite.to(sections[current_section-1], 1.5, {opacity: rev_scroll_percent});
		// 		TweenLite.to(sections[current_section], 1.5, {opacity: rev_scroll_percent});
				
		// 		par_size =  (((section_percentagex2 +1)*(section_percentage+1))*2);
		// 		TweenLite.to(sections[current_section-1], 0.5, {scale:par_size});
				
				
				
		// 		if((sections[current_section-1].height()*par_size)>=($(window).height()+400)){
		// 			TweenLite.to(sections[current_section], 0.5, {opacity: 1});
		// 		} else {

		// 		}
			
		// 	} else {
		// 		// RESET TWEENs IF SCROLLING
		// 		TweenLite.to(sections[current_section-1], 1.5, {opacity: 1});
		// 		TweenLite.to(sections[current_section], 0.5, {opacity: 0});
		// 	}
		
		// }

	});

	
	// MENU
	$("#poster_middle").click(function () {
		goToSection(1);
		return false;
	});
	
	$("#menu_button").click(function () {
		if(parseInt($("#menu").css("top"))<-1){
			TweenLite.to($("#menu"),0.3,{top:"0px"});
		} else {
			TweenLite.to($("#menu"),0.3,{top:"-258px"});
		}
		//TweenLite.to($("#menu"),0.5,{top:"0px"});
		//debug();
		
	
	});
	
	function toggleMenu(){
		if(parseInt($("#menu").css("top"))<-1){
			TweenLite.to($("#menu"),0.3,{top:"0px"});
		} else {
			TweenLite.to($("#menu"),0.3,{top:"-258px"});
		}
	
	}
	
	
	$(".noverlay").click(function (e) {
		$(".noverlay").fadeOut();
		disableOverlay();
		
	});
	$(".overlay_menu").click(function (e) {
		$(".noverlay").fadeOut();
		disableOverlay();
		initOverlay();
		TweenLite.to($("#menu"),0.3,{top:"-258px"});
		show_this = $(this).attr('href');
		$("#"+show_this).fadeIn();
		
		return false;
		
	
	});
	
	$("#menu_content a").click(function (e) {
		temp_href = $(this).attr('href');
		if(temp_href.indexOf("#")>=0){
			toggleMenu();
			temp_index= $(temp_href).index();
			if (temp_index >0){
				goToSection(temp_index-1);
			}
		
		}
		return false;
	});
	

	$("#menu").mouseleave(function(e){
	    var $this = $(this);
	
	    var bottom = $this.offset().top + $this.outerHeight();
	
	   if(e.pageY >= bottom){
	   		TweenLite.to($("#menu"),0.3,{top:"-258px"});
	   
	   }; 
	});
	



	function jq_vaca(){
		jq_ca();
		jq_va();
	}

	function jq_vaca_obj(obj){
		jq_va_obj(obj);
		jq_ca_obj(obj);
	}

	function jq_va() {
		$(".jq_va").each(function (e) {
				jq_va_obj(this);
		});
	};
	
	function jq_ca() {
		$(".jq_ca").each(function (e) {
					jq_ca_obj(this);
		});
	};
	
	
	function jq_va_obj(obj){
		parent_height = $(obj).parent().height();

		obj_height = $(obj).height();
		
		obj_top = (parent_height/2)-(obj_height/2);
		
		$(obj).css('position','absolute');
		$(obj).css('top',obj_top+'px');
	}
	
	function jq_ca_obj(obj){
		parent_width = $(obj).parent().width();
		obj_width = $(obj).width();
				
		obj_left = (parent_width/2)-(obj_width/2);
		$(obj).css('position','absolute');
		$(obj).css('left',obj_left+'px');
	}


// DEBUG
function debug(message){
	$('#debug').html(message);
}


});
