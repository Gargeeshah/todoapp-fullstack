import Navbar from '../components/Navbar';
import SliderLine from '../components/SliderLine';
// import '../components/Header.css'
import '../components/Advance.css'

const Home = () => {

    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: "#fcfdfb"}}>
            <Navbar/>
            <div className="intro-section-static_headersContainer__7A1XU YttEe7kIjjIAtcbhghld c8EWRT5sy9CxCZyUQe6w">
                <h1 className="Z2j5FoeQ_umI7vX0SmxF f8hhoqjLEteSfgx6bdr2 mWJbs2TuAw9nS7uYCe19">Organize your work and life, finally.</h1>
            </div>
            <SliderLine></SliderLine>
            
        </div>
    );
};

export default Home;
