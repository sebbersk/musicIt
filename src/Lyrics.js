import React from 'react';

function Lyrics(props) {
	const alignLyrics = (lyrics) => {
		if (props.lyrics) {
			const regex = /(\r\n|\n|\r)/gm;
			const text = lyrics.replace(regex, '\n');
			return text;
		}
		return 'Lyrics could not be found in the API :(';
	};
	return (
		<>
			<h3>{props.song}</h3>
			<p className='lyrics' style={{ whiteSpace: 'pre-line' }}>
				{alignLyrics(props.lyrics)}
			</p>
		</>
	);
}

export default Lyrics;
