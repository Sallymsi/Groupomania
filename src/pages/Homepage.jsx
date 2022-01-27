import '../styles/sass/main.scss'
import Banner from "../components/Banner"
import Forum from "../components/Forum"

function Homepage() {
    return (
        <div className='homepage'>
            <Banner />
            <Forum />
        </div>
    )
}

export default Homepage