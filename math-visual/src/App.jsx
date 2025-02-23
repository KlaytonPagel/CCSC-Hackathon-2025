import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Mandel, Home, Quaternions, Solar } from './pages';

const App = () => {
    return (
        <main>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/mandel' element={<Mandel />} />
                    <Route path='/quaternions' element={<Quaternions />} />
                    <Route path='/solarsystem' element={<Solar />} />
                </Routes>
            </Router>
        </main>
    )
}

export default App
