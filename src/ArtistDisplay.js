import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Video from './Video';
import ArtistInfo from './ArtistInfo';
import Song from './Song';
import Lyrics from './Lyrics';
import MediaPlayer from './MediaPlayer';
import Spinner from './img/spinner.gif';
import { getSongsByArtist, getArtist, getYoutubeId, getLyrics } from './utils/api';
function ArtistDisplay() {
	const artistName = useParams().artistname;
	const [artistState, setArtistState] = useState({
		loading: true,
		artistInfo: {},
		songs: [],
		lyrics: null,
		linkId: '',
		chosen: null,
		tags: [],
		lcs: {},
	});
	const setSong = async (song) => {
		const linkId = await getYoutubeId(artistName, song.song);
		setArtistState((state) => ({ ...state, lyrics: state.lcs[song.song], chosen: song.song, linkId }));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const artistData = await getArtist(artistName);
		const songsData = await getSongsByArtist(artistName, 10);
		const regex = /\//gm;
		let artistN = songsData[0].artist.name;
		artistN = artistN.replace(regex, ' ');
		const linkId = await getYoutubeId(artistName, songsData[0].name);
		const lcs = {};
		songsData.forEach(async (song) => {
			try {
				const lyrics = await getLyrics(artistN, song.name);
				lcs[song.name] = lyrics;
			} catch (e) {
				console.log(e);
			}
		});
		setTimeout(() => {
			setArtistState((state) => ({
				...state,
				artistInfo: {
					name: artistData.artist.name,
					content: artistData.artist.bio.summary,
				},
				lyrics: lcs[songsData[0].name],
				songs: songsData,
				loading: false,
				chosen: songsData[0].name,
				linkId,
				tags: artistData.artist.tags.tag.slice(0, 3),
				lcs,
			}));
		}, 3000);

		// eslint-disable-next-line
	}, []);
	let content = '';
	if (artistState.loading) {
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
						<div className='display-container'>
							<div className='display-video'>
								<Video src={`https://www.youtube.com/embed/${artistState.linkId}`} />
							</div>
							<div className='display-info'>
								<ArtistInfo artistInfo={artistState.artistInfo} tags={artistState.tags} />
							</div>
							<div className='display-songs'>
								{artistState.songs.map((song, i) => {
									return (
										<Song
											key={i}
											song={{ song: song.name, artist: song.artist.name }}
											selected={artistState.chosen === song.name}
											setSong={setSong}
										/>
									);
								})}
							</div>
							<div className='display-lyrics'>
								<Lyrics song={artistState.chosen} lyrics={artistState.lyrics} />
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

export default ArtistDisplay;
