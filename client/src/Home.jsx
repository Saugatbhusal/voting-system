import 'bootstrap/dist/css/bootstrap.min.css'
import {  useNavigate } from 'react-router-dom'; 



function Home(){
    const navigate = useNavigate();
    const handleClick = () =>{
        

navigate('/votingregister ')
    }

    const handleVote= () =>{

        navigate('/voting ')
            }

    return(
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
    <div className='butbox'>
       <button type="button" className="btn btn-warning" onClick={handleClick}>Register for candidacy </button> 
       <button type="button" className="btn btn-primary"  onClick={handleVote}>Vote</button>

    </div>
    </div>
    </>
    )
}
export default Home;