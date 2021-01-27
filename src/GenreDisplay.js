import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GenreInfo from './GenreInfo';
import Video from './Video';
import TopArtist from './TopArtist';
import MediaPlayer from './MediaPlayer';
import { useParams } from 'react-router-dom';
import Spinner from './img/spinner.gif';
import { getSongsByArtist, getYoutubeId, getGenreArtists, getGenreInfo } from './utils/api';

function GenreDisplay(props) {
	const genreName = useParams().genre;

	const [genreState, setGenreState] = useState({
		genreInfo: '',
		artists: [],
		linkId: '',
		artistSongs: {},
		loading: true,
		chosen: '',
		selectedSong: '',
	});
	const setArtistAndSong = async (artist, song) => {
		const linkId = await getYoutubeId(artist, song);
		setGenreState((state) => ({ ...state, chosen: artist, selectedSong: song, linkId }));
	};
	const goToArtist = (artist) => {
		props.history.push(`/artist/${artist}`);
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const artistInfoArray = await getGenreArtists(genreName);
		const genreSummary = await getGenreInfo(genreName);
		const artistArray = [];
		const artistSongContainer = {};
		artistInfoArray.forEach(async (artist) => {
			artistArray.push(artist.name);
			const trackInfoArray = await getSongsByArtist(artist.name, 3);
			const trackArray = [];
			trackInfoArray.forEach((track) => {
				trackArray.push(track.name);
			});
			artistSongContainer[artist.name] = { name: artist.name, tracks: trackArray };
		});

		const genreInfo = { info: genreSummary, name: genreName };
		let linkId = '';
		setTimeout(async () => {
			linkId = await getYoutubeId(artistArray[0], artistSongContainer[artistArray[0]].tracks[0]);
		}, 2000);

		setTimeout(() => {
			setGenreState((state) => ({
				...state,
				genreInfo,
				artistSongs: artistSongContainer,
				artists: artistArray,
				loading: false,
				chosen: artistArray[0],
				selectedSong: artistSongContainer[artistArray[0]].tracks[0],
				linkId,
			}));
		}, 4000);

		// eslint-disable-next-line
	}, []);
	let content = '';
	if (genreState.loading) {
		content = (
			<div className='container'>
				<div className='spinner'>
					<img src={Spinner} alt='' />
				</div>
			</div>
		);
	} else {
		content = (
			<>
				<Navbar />
				<main>
					<div className='container'>
						<div className='genre-container'>
							<div className='genre-top'>
								<div className='genre-info'>
									<GenreInfo info={genreState.genreInfo} />
								</div>
								<div className='genre-video'>
									<Video src={`https://www.youtube.com/embed/${genreState.linkId}`} />
								</div>
							</div>
							<div className='genre-top-artist'>
								{genreState.artists.map((artist, i) => {
									return (
										<TopArtist
											key={i}
											selected={artist === genreState.chosen}
											artist={artist}
											tracks={genreState.artistSongs[artist].tracks}
											selectedSong={genreState.selectedSong}
											setSong={setArtistAndSong}
											goToArtist={goToArtist}
										/>
									);
								})}
							</div>
						</div>
					</div>
					<MediaPlayer />
				</main>
			</>
		);
	}
	return <>{content}</>;
}

export default GenreDisplay;
