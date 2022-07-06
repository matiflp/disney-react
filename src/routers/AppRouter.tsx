import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Link
} from 'react-router-dom'
import NavBar from '../components/NavBar'
import CharactersList from '../components/CharactersList'
import Login from './Login'
import Register from './Register'
import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import { Add } from './Add'

export default function AppRouter() {

  const data = useContext(AuthContext);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
            <>
                {
                  data?.isAuth 
                  ? <div className='container'>
                      <h6>¿Quieres añadir un nuevo personaje?</h6>
                      <Link to='/add' style={{ textDecoration: 'none' }}>
                        <div className="d-grid gap-2">
                          <button className='btn btn-outline-primary mb-4'>Añadir</button>
                        </div>
                      </Link>
                      <CharactersList />
                    </div>
                  : <div className='container'>
                      <div className="alert alert-warning" role="alert">
                        Debe iniciar sesión para poder visualizar los personajes o peliculas de Disney.
                      </div>
                    </div>
                }
            </>
        } />
        <Route path="/add" element={
          <Add />
        } />
        <Route path='*' element={<h1>Error 404 Pagina no encontrada.</h1>} />
      </Routes>
    </Router>
  )
}
