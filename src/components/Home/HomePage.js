import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
const HomePage = (props) => {

// viet ham lva lay state 
    // lay state cua redux dong lnay lay tu state.user lay tu redux store va cu the la o root redux
    //state => state.user.account  nghia la state cua redux va tro den state nao ma mik muon cai use la o root  .
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
   
    
    
    
    
    
    
    
    
    
    
    
    return (
    <div>
        <div className="homepage-container">
           <video width="750" height="500" autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
                </video>
         <div className='homepage-content'>
                <div className='title-1'>Get up to 3.5x more data about them</div>
                <div className='title-2'>When your forms break the norm, more people fill them out. Think branded designs, video content, and relevant follow-up questions.</div>
                <div className='title-3'>
                    <button>Get's started</button>
                </div>
                
            </div>
        </div>
            
    </div>
    )
}
export default HomePage;

//de control thi no se hien thanh tabbar
//Nhờ position: relative;, .homepage-content có thể được di chuyển mà không ảnh hưởng tới video hoặc phần tử khác trong .homepage-container.
