import './Footer.css';
import copyright from '../../assets/icons/icon-copyright.svg';

function Footer(){
    return(
            <footer className='Footer'>
                <img src={copyright} alt="copyright" />
                <h5>Copyright Rimel 2022. All right reserved</h5>
            </footer>
    )
}

export default Footer;