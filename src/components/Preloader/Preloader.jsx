import './Preloader.css';
import preloader from '../../assets/gifs/Basketball.gif';

function Preloader(){
    return(
        <div className='Preloader'>
            <img src={preloader} alt="preloader" />
        </div>
    )
}

export default Preloader;