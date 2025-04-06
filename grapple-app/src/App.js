import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import CurrentUserProvider from './contexts/CurrentUser'
import HomePageControl from './pages/HomePageControl'

function App() {
    return (
        <div className="App">
            <CurrentUserProvider>
                <HomePageControl />
            </CurrentUserProvider>
        </div>
    );
}

export default App;