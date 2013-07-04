$(document).ready(function() {

	var sectionHeight = $(window).height(),
		$firstSection = $("#firstSection"),
		$secondSection = $("#secondSection"),
		$thirdSection = $("#thirdSection"),
		$fourthSection = $("#fourthSection"),
		sections = [$firstSection, $secondSection, $thirdSection, $fourthSection];
		
	$('html, body').animate({scrollTop:0}, 1); //возвращает скролл к началу страницы
	$('body').height((sections.length + 0.5) * sectionHeight);

	if ($(window).scrollTop() == 0)	{

		TweenLite.to(sections[0], 0.4, {opacity: 1});

	} 	
	//после перезагрузки страницы выполняется window.scroll, и все норм. 
	//а если не выполняется, то прозрачность первой секции = 1 

	$(window).scroll(function(e) {

		var top = $(window).scrollTop(),
			currentSection = ~~ (top / sectionHeight) , // ~~ - отбрасывание дробной части
			topOfSection = top - (currentSection * sectionHeight);

		if (top > sectionHeight) {

			for (var i = 0; i < currentSection; i++) {

				TweenLite.to(sections[i], 0.0001, {opacity: 0});

			}
				
		} else {

			for (var i = currentSection + 1; i < sections.length; i++) {

				TweenLite.to(sections[i], 0.4, {opacity: 0});

			}

		} 	//костыль для устранения глюков при «дерзком» скролле


		if (topOfSection > (sectionHeight / 2)) { // прозрачность с середины секции

			if (currentSection == (sections.length - 1)) {

				TweenLite.to(sections[currentSection], 0.4, {opacity: 1});
				//если текущая секция последняя - ей не надо исчезать

			} else {

				TweenLite.to(sections[currentSection], 0.4, {opacity: 0});
				TweenLite.to(sections[currentSection+1], 0.4, {opacity: 0});

			}

		} else {

			TweenLite.to(sections[currentSection], 0.4, {opacity: 1});

		}

		return false;

	});
 
return false;

});