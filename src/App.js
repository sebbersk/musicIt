import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import ArtistDisplay from './ArtistDisplay';
import GenreDisplay from './GenreDisplay';
import SongDisplay from './SongDisplay';
import About from './About';
function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route exact path='/about' component={About}></Route>
				<Route exact path='/artist/:artistname' component={ArtistDisplay}></Route>
				<Route exact path='/genre/:genre' component={GenreDisplay}></Route>
				<Route exact path='/songs/:songname' component={SongDisplay}></Route>
			</Switch>
		</>
	);
}

export default App;
