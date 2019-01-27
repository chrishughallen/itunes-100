
let songs = []

// INITIAL AJAX CALL THAT RETURNS LIST OF ALL 100 TOP SONGS
const retrieveSongs = () =>{
		$.getJSON("https://itunes.apple.com/us/rss/topSongs/limit=100/json").done((data) => {

	    data.feed.entry.forEach((song) => {
	    	let newSong = {
	    		genre:song.category.attributes.term,
	    		link:song.id.label,
	    		title:song['im:name'].label,
	    		artist:song['im:artist'].label,
	    		image:song['im:image'][2].label
	    	}
	    	songs.push(newSong)
	    })
	    return songs;
	}).then(()=>{
		buildPage(songs)
	});
}

// TAKES THE PASSED IN ARRAY AND BUILDS EACH ITEM TO THE VIEW
const buildPage = (arr) =>{
			$('.songs').html("")
		    arr.forEach((song)=>{
	    	let flexItem = "<div class=\"song\">"
	    	let link = "<a target=\"_blank\" href=\"" + song.link + "\">"
	    	let title = "<p class=\"title\">" + song.title + "</p>"
	    	let artist = "<p class=\"artist\">" + song.artist + "</p>"
	    	let image = "<img src=\"" + song.image + "\">";

	    $('.songs').append(flexItem + artist + title + link + image + "</a></div>")
	    })
} 



// CREATES A NEW LIST AND BUILDS IT TO THE PAGE BASED ON THE USERS QUERY
const filter = (query) => {
	let results = []
	songs.forEach((song)=>{
		if(song.title.toLowerCase().indexOf(query) != -1 
			|| song.artist.toLowerCase().indexOf(query) != -1 
			|| song.genre.toLowerCase().indexOf(query) != -1){
			results.push(song)
		}
	})
	buildPage(results)
}


// TRIGGERS THE FILTER FUNCTION EACH TIME A KEY ENTRY IS MADE FOR REAL TIME SEARCHES
 $('#query').on('keyup',()=>{
  		filter($('#query').val())
  })

// INITIAL CALL TO BUILD VIEW ON PAGE LOAD
retrieveSongs()

