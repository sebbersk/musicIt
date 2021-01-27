import React, { useState } from 'react';

function MediaPlayer() {
	const [volume, setVolume] = useState(50);
	const playVideo = () => {
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
	};
	const pauseVideo = () => {
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
	};
	const stopVideo = () => {
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
	};

	const changeVolume = (e) => {
		setVolume(e.target.value);
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(
			JSON.stringify({ event: 'command', func: 'setVolume', args: [e.target.value] }),
			'*',
		);
	};
	const volumeOff = () => {
		setVolume(0);
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [0] }), '*');
	};
	const volumeOn = () => {
		setVolume(100);
		const iframe = document.querySelector('iframe');
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
	};
	return (
		<div className='mediaPlayer'>
			<div className='controls'>
				<p id='pause' onClick={pauseVideo}>
					<i className='far fa-pause-circle'></i>
				</p>
				<p id='play' onClick={playVideo}>
					<i className='far fa-play-circle'></i>
				</p>
				<p id='stop' onClick={stopVideo}>
					<i className='far fa-stop-circle'></i>
				</p>
			</div>

			<div className='volume'>
				<i className='fas fa-volume-off' onClick={volumeOff}></i>
				<input
					type='range'
					name='volume'
					id='volume-control'
					min='0'
					max='100'
					onInput={changeVolume}
					value={volume}
				/>
				<i className='fas fa-volume-up' onClick={volumeOn}></i>
			</div>
		</div>
	);
}

export default MediaPlayer;
