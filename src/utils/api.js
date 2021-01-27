const getArtist = async (artistName) => {
	const artistRes = await fetch(`/api/v1/artist/${artistName}`);
	const artistData = await artistRes.json();

	return artistData;
};
const getSongsByArtist = async (artistName, amount) => {
	const songsRes = await fetch(`/api/v1/artist/${artistName}/songs/${amount}`);
	const songsData = await songsRes.json();
	return songsData.toptracks.track;
};
const getYoutubeId = async (artistName, songName) => {
	const youtubeRes = await fetch(`/api/v1/youtube/${artistName}/${songName}`);
	const youtubeData = await youtubeRes.json();
	const youtubeId = youtubeData.items[0].id.videoId;
	return youtubeId;
};

const getLyrics = async (artistName, songName) => {
	const lyricsRes = await fetch(`/api/v1/lyrics/${artistName}/${songName}`);
	const lyricsData = await lyricsRes.json();
	return lyricsData.lyrics;
};

const getGenreArtists = async (genreName) => {
	const genreRes = await fetch(`/api/v1/genre/artists/${genreName}`);
	const genreData = await genreRes.json();
	return genreData.topartists.artist;
};

const getGenreInfo = async (genreName) => {
	const genreInfoRes = await fetch(`/api/v1/genre/info/${genreName}`);
	const genreInfoData = await genreInfoRes.json();

	return genreInfoData.tag.wiki.summary;
};

const getSongsByTitle = async (songName) => {
	const trackRes = await fetch(`/api/v1/songs/${songName}`);
	const trackData = await trackRes.json();
	return trackData.results.trackmatches.track;
};
export { getArtist, getYoutubeId, getSongsByArtist, getLyrics, getGenreArtists, getGenreInfo, getSongsByTitle };
