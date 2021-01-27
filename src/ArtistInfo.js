import React from 'react';
import { Link } from 'react-router-dom';
import { removeTag } from './utils/utils';
function ArtistInfo(props) {
	const { name, content } = props.artistInfo;
	return (
		<>
			<h3>{name}</h3>
			{props.tags.map((tag, i) => {
				return (
					<span key={i}>
						<Link to={`/genre/${tag.name}`}>{tag.name}</Link>
					</span>
				);
			})}
			<p>{removeTag(content)}</p>
		</>
	);
}

export default ArtistInfo;
