import React from 'react';
import { withRouter } from 'react-router-dom';
function Song(props) {
	const handleClick = () => {
		props.setSong(props.song);
	};
	return (
		<div className={`song ${props.selected ? 'selected-song' : ''}`} onClick={handleClick}>
			<p>{props.song.song}</p>
			<p className='by-artist' onClick={() => props.history.push(`/artist/${props.song.artist}`)}>
				<span>by </span>
				{props.song.artist}
			</p>
		</div>
	);
}

export default withRouter(Song);
