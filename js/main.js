$(document).ready(function() {

	var sectionHeight = $(window).height(),
		$frontSection = $("#front_section"),
		$secondSection = $("#second_section"),
		$chaptersSection = $("#chapters_section"),
		$ensembleSection = $("#ensemble_section"),
		sections = [$frontSection, $secondSection, $chaptersSection, $ensembleSection];

	$(window).load(function() {
		$('body').height(sections.length*sectionHeight);

		if ($(window).scrollTop() == 0)
		{
			TweenLite.to(sections[0], 1, {opacity: 1});
		}
	});

	$(window).scroll(function(e) {

		var top = $(window).scrollTop(),
			windowHeight = $(window).height(),
			bodyHeight = $('body').height(),
			htmlHeight = bodyHeight - windowHeight,
			currentSection = ~~ (top / sectionHeight) , // ~~ - отбрасывание дробной части
			topOfSection = $(window).scrollTop() - (currentSection * sectionHeight),
			opacityPercent = (sectionHeight - topOfSection - (sectionHeight / 2)) * 0.9 / sectionHeight;

		if (top > sectionHeight)
		{
			TweenLite.to(sections[0], 0.1, {opacity: 0});
		}

		if (topOfSection > (sectionHeight / 2)) { // прозрачность с середины секции

			if (topOfSection < 0.9 * sectionHeight)
			{

				TweenLite.to(sections[currentSection], 1, {opacity: opacityPercent});
				TweenLite.to(sections[currentSection+1], 1, {opacity: 0});

			} else {

				TweenLite.to(sections[currentSection + 1], 1, {opacity: 1 - opacityPercent});
				TweenLite.to(sections[i], 1, {opacity: 0});

			}

		} else {
			TweenLite.to(sections[currentSection], 1, {opacity: 1});
			TweenLite.to(sections[currentSection+1], 1, {opacity: 0});
		}

		// if (topOfSection > (sectionHeight / 2)) { // прозрачность с середины секции

		// 	if (topOfSection < 0.9 * sectionHeight)
		// 	{

		// 		TweenLite.to(sections[currentSection], 1, {opacity: opacityPercent});

		// 		for (var i = currentSection+1; i < sections.length; i++)
		// 		{
		// 			TweenLite.to(sections[i], 1, {opacity: 0});
		// 		}

		// 	} else {

		// 		TweenLite.to(sections[currentSection + 1], 1, {opacity: 1 - opacityPercent});

		// 		for (var i = currentSection; i < sections.length; i++)
		// 		{
		// 			TweenLite.to(sections[i], 1, {opacity: 0});
		// 		}

		// 	}

		// } else {
		// 	TweenLite.to(sections[currentSection], 1, {opacity: 1});
		// 	TweenLite.to(sections[currentSection+1], 1, {opacity: 0});
		// }

	});

});