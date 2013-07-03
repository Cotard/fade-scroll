$(document).ready(function() {

	var sectionHeight = $(window).height(),
		$frontSection = $("#front_section"),
		$secondSection = $("#second_section"),
		$chaptersSection = $("#chapters_section"),
		$ensembleSection = $("#ensemble_section"),
		sections = [$frontSection, $secondSection, $chaptersSection, $ensembleSection];

	$(window).load(function() {

		$('body').height(sections.length*sectionHeight);

		if ($(window).scrollTop() == 0)	{
			TweenLite.to(sections[0], 1, {opacity: 1});
		}
		//после перезагрузки страницы выполняется window.scroll, и все норм. 
		//а если не выполняется, то прозрачность первой секции = 1 
		
	});

	$(window).scroll(function(e) {

		var top = $(window).scrollTop(),
			currentSection = ~~ (top / sectionHeight) , // ~~ - отбрасывание дробной части
			topOfSection = top - (currentSection * sectionHeight);

		if (top > sectionHeight) {

			for (var i = 0; i < currentSection; i++) {
				TweenLite.to(sections[i], 1, {opacity: 0});
			}
				
		} else {

			for (var i = currentSection + 1; i < sections.length; i++) {
				TweenLite.to(sections[i], 1, {opacity: 0});
			}

		} 	//костыль для устранения глюков при «дерзком» скролле


		if (topOfSection > (sectionHeight / 2)) { // прозрачность с середины секции

				TweenLite.to(sections[currentSection], 1, {opacity: 0});
				TweenLite.to(sections[currentSection+1], 1, {opacity: 0});

		} else {
			TweenLite.to(sections[currentSection], 1, {opacity: 1});
		}

	});

});