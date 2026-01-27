import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import ServiceListing from './pages/ServiceListing';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ServiceListing />} />
              <Route path="/book/:serviceId" element={<BookingForm />} />
              {/* Also allow booking without a pre-selected service */}
              <Route path="/book" element={<BookingForm />} />
              <Route path="/bookings" element={<MyBookings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
