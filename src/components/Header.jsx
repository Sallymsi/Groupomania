import logo from '../assets/icon-left-font-monochrome-white.png'
import '../styles/sass/main.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='banner'>
            <img className='logo' src={logo} alt='logo' />
            <nav className='menuBanner'>
                <ul className='menu'>
                    <li><Link to="/"><a>Accueil</a></Link></li>
                    <li><Link to="/register"><a>Se connecter</a></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header