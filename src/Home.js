import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
function Home(props) {
	const [searchData, setSearchData] = useState({
		input: '',
		options: ['Artist', 'Song', 'Genre'],
		index: 0,
	});
	const changeOption = (i) => {
		if (i > 0) {
			searchData.index === 2
				? setSearchData((state) => ({ ...state, index: 0 }))
				: setSearchData((state) => ({ ...state, index: state.index + 1 }));
		} else {
			searchData.index === 0
				? setSearchData((state) => ({ ...state, index: 2 }))
				: setSearchData((state) => ({ ...state, index: state.index - 1 }));
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const regex = /\//gm;
		let search = searchData.input;
		search = search.replace(regex, '');
		if (searchData.index === 0) {
			props.history.push(`/artist/${search}`);
		} else if (searchData.index === 1) {
			props.history.push(`/songs/${search}`);
		} else {
			props.history.push(`/genre/${search}`);
		}

		setSearchData((state) => ({ ...state, input: '' }));
	};
	return (
		<>
			<Navbar />
			<header>
				<div className='container'>
					<p className='lead'>
						Everything from your favourite artist in one page. Discover new songs within your favourite
						genre. Learn the lyrics of your favourite song. Just Search!
					</p>
				</div>
			</header>
			<main>
				<div className='container'>
					<div className='search-form-container'>
						<form action='' className='search-form' onSubmit={handleSubmit}>
							<div className='search'>
								<input
									type='text'
									name=''
									id=''
									placeholder='Search'
									value={searchData.input}
									onChange={(e) =>
										setSearchData((state) => ({
											...state,
											input: e.target.value,
										}))
									}
								/>
								<button type='submit'>Search</button>
							</div>
							<div className='search-option'>
								<span className='arrow' onClick={() => changeOption(-1)}>
									{'<'}
								</span>{' '}
								<span className='selected'>{searchData.options[searchData.index]}</span>
								<span className='arrow' onClick={() => changeOption(1)}>
									{'>'}
								</span>
							</div>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default Home;
