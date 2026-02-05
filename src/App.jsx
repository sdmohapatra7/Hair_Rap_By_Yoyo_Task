import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceListing from './pages/ServiceListing';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import ServiceDetails from './pages/ServiceDetails';
import AIAssistantPage from './pages/AIAssistantPage';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Reviews from './pages/Reviews';
import Settings from './pages/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-gray-50 font-sans text-gray-900">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServiceListing />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/ai-chat" element={<AIAssistantPage />} />
              <Route path="/book/:serviceId" element={<BookingForm />} />
              {/* Also allow booking without a pre-selected service */}
              <Route path="/book" element={<BookingForm />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/bookings/:bookingId" element={<BookingDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
