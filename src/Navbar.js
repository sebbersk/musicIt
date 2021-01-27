import React from 'react';
import Logo from './img/logo.png';
import { Link } from 'react-router-dom';
function Navbar() {
	return (
		<>
			<nav className='navbar'>
				<div className='logo'>
					<Link to='/'>
						<h1>
							<img src={Logo} width='24px' alt='' /> MusicIt
						</h1>
					</Link>
				</div>
				<div className='nav-left'>
					<ul>
						<li>
							<Link to='/about'>About</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
