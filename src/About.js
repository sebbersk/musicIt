import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function About() {
	return (
		<>
			<Navbar />
			<main>
				<div className='container'>
					<div className='about-content'>
						<h1>What is MusicIt?</h1>
						<p>MusicIt is an app to display information about your favourite artists, songs and genres.</p>
						<p>
							We also display similar artists to your search, who knows? Maybe you find a new favourite!
						</p>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default About;
