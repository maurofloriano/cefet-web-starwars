// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado



const idToRoman = id => {
	let episodes = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
	return episodes[parseInt(id)];
}

const changeData = data => {
    $('.reading-animation').text(data);
}


$.ajax({
	url: 'http://swapi.co/api/films/',
	method: 'get',
	success: response => {
		let $ul = $('#movies ul');

		let films = response.results.sort((a, b) => a.episode_id > b.episode_id);
		
		films.forEach(film => {
			let $li = $('<li>', {
				'data-episode-url': film.url, 
				'text': 'Episode ' + idToRoman(film.episode_id)
			});

			$ul.append($li);
		})
	}
});


$("#movies ul").on('click', 'li', e => {
	let url = $(e.target).data('episode-url');

	$.ajax({
		url: url,
		method: 'get',
		success: response => {
			let episode = idToRoman(response.episode_id);
			let text = 'Episode ' + episode + '\n' +
					 	response.title + '\n\n' +
			 		    response.opening_crawl;

			changeData(text);
		}
	});
});