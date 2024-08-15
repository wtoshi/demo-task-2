import FlightsHome from './components/flights/FlightsHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/sidebar/Sidebar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MyFlights from './components/user/MyFlights';
import Navbar from './components/shared/Navbar';

function App() {

  return (
    <Router>
      <div className="bg-purple-200 min-h-screen flex justify-center items-center py-12">
        <div className="bg-[#F5F3F7] border shadow-2xl rounded-2xl w-full max-w-6xl pb-12">
          <Navbar />
          <div className="flex flex-col md:flex-row w-full px-6 mt-8 gap-4">
            <div className="flex-grow md:w-4/5 flex flex-col gap-4" >
              <Routes>
                <Route path="/" element={<FlightsHome />} />
                <Route path="/my-flights" element={<MyFlights />} />
              </Routes>
            </div>

            <Sidebar />
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
