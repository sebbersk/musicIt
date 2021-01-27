import React from 'react';

function Video(props) {
	return (
		<iframe
			src={`${props.src}?enablejsapi=1`}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			loading='lazy'
			title='song'></iframe>
	);
}

export default Video;
