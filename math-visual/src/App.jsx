import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Mandel } from './pages';

const App = () => {
    return (
        <main>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={ 'Home' } />
                    <Route path='/mandel' element={<Mandel />} />
                    <Route path='/projects' element={ 'Projects' } />
                    <Route path='/contact' element={ 'Contact' } />
                </Routes>
            </Router>
        </main>
    )
}

export default App
