import React from 'react';

function TopArtist(props) {
	return (
		<div className={`top-artist ${props.selected ? 'selected-artist' : ''}`}>
			<p className='artist-name' onClick={() => props.goToArtist(props.artist)}>
				{props.artist}
			</p>
			<div className='artist-top-3'>
				{props.tracks.map((track, i) => {
					return (
						<p
							key={i}
							className={props.selected && props.selectedSong === track ? 'top-selected-song' : ''}
							onClick={() => props.setSong(props.artist, track)}>
							{track}
						</p>
					);
				})}
			</div>
		</div>
	);
}

export default TopArtist;
