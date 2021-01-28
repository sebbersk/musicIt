import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Video from './Video';
import Song from './Song';
import Lyrics from './Lyrics';
import MediaPlayer from './MediaPlayer';
import Spinner from './img/spinner.gif';
import { useParams } from 'react-router-dom';
import { getYoutubeId, getLyrics, getSongsByTitle } from './utils/api';
function SongDisplay() {
	const songTitle = useParams().songname;
	const [songState, setSongState] = useState({
		trackArray: [],
		linkId: '',
		loading: true,
		chosen: [],
		lyrics: '',
		lcs: {},
	});

	const setSong = async (song) => {
		const linkId = await getYoutubeId(song.artist, song.song);
		setSongState((state) => ({ ...state, lyrics: state.lcs[song.song], chosen: [song.song, song.artist], linkId }));
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const trackArray = await getSongsByTitle(songTitle);
		const linkId = await getYoutubeId(trackArray[0].artist, trackArray[0].name);
		const lcs = {};
		trackArray.forEach(async (song) => {
			lcs[song.name] = await getLyrics(song.artist, song.name);
		});
		setTimeout(() => {
			setSongState((state) => ({
				...state,
				trackArray,
				lyrics: lcs[trackArray[0].name],
				loading: false,
				chosen: [trackArray[0].name, trackArray[0].artist],
				linkId,
				lcs,
			}));
		}, 3000);

		// eslint-disable-next-line
	}, []);
	let content = '';
	if (songState.loading) {
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
						<div className='songs-container'>
							<h2>Songs with title '{songTitle}'</h2>

							<div className='songs-video'>
								<Video src={`https://www.youtube.com/embed/${songState.linkId}`} />
							</div>

							<div className='songs-grid'>
								<div className='songs-songs'>
									{songState.trackArray.map((track, i) => {
										return (
											<Song
												key={i}
												song={{ song: track.name, artist: track.artist }}
												selected={
													songState.chosen[0] === track.name &&
													songState.chosen[1] === track.artist
												}
												setSong={setSong}
											/>
										);
									})}
								</div>
								<div className='songs-lyrics'>
									<Lyrics song={songState.chosen[0]} lyrics={songState.lyrics} />
								</div>
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

export default SongDisplay;
