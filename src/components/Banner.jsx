import '../styles/sass/main.scss'
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div className='barAccount'>
            <div className='blockImg'>
                <img alt='profil'></img>
            </div>
            <nav>
                <li><Link to="/profil"><a>Mon compte</a></Link></li>
                <li><Link to="/amis"><a>Mes amis</a></Link></li>
                <li><Link to="/"><a>Se déconnecter</a></Link></li>
            </nav>
        </div>
    )
}

export default Banner