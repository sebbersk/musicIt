import React from 'react';
import { removeTag } from './utils/utils';
function GenreInfo(props) {
	return (
		<>
			<h2>{props.info.name}</h2>
			<p>{removeTag(props.info.info)}</p>
		</>
	);
}

export default GenreInfo;
