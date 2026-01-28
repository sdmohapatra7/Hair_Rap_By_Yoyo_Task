import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import ServiceListing from './pages/ServiceListing';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-gray-50 font-sans text-gray-900">
          <Layout>
            <Routes>
              <Route path="/" element={<ServiceListing />} />
              <Route path="/book/:serviceId" element={<BookingForm />} />
              {/* Also allow booking without a pre-selected service */}
              <Route path="/book" element={<BookingForm />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/bookings/:bookingId" element={<BookingDetails />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
