import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<>
			<footer>
				&#169; <span>2021 MusicIT</span> <Link to='/about'>About</Link>
			</footer>
		</>
	);
}

export default Footer;
