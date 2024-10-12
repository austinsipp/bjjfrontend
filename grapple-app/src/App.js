import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import CurrentUserProvider from './contexts/CurrentUser'
import HomePage from './pages/HomePage'

function App() {
    return (
        <div className="App">
            <CurrentUserProvider>
                <HomePage />
            </CurrentUserProvider>
        </div>
    );
}

export default App;