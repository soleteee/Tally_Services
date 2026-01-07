import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy loading all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/about/Team'));
const Journey = lazy(() => import('./pages/about/Journey'));
const WhyUs = lazy(() => import('./pages/about/WhyUs'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Resources = lazy(() => import('./pages/Resources'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const MoreProducts = lazy(() => import('./pages/MoreProducts'));
const MoreServices = lazy(() => import('./pages/MoreServices'));

// Product Pages
const PrimeSilver = lazy(() => import('./pages/products/PrimeSilver'));
const PrimeGold = lazy(() => import('./pages/products/PrimeGold'));
const Auditor = lazy(() => import('./pages/products/Auditor'));
const Server = lazy(() => import('./pages/products/Server'));
const ShoperSilver = lazy(() => import('./pages/products/ShoperSilver'));
const ShoperGold = lazy(() => import('./pages/products/ShoperGold'));
const Bookkeeper = lazy(() => import('./pages/products/Bookkeeper'));
const Rent = lazy(() => import('./pages/products/Rent'));
const TVU = lazy(() => import('./pages/products/TVU'));
const Mobile = lazy(() => import('./pages/products/Mobile'));

// Service Pages
const TSS = lazy(() => import('./pages/services/TSS'));
const Cloud = lazy(() => import('./pages/services/Cloud'));
const Training = lazy(() => import('./pages/services/Training'));
const Capital = lazy(() => import('./pages/services/Capital'));
const Insurance = lazy(() => import('./pages/services/Insurance'));
const Loan = lazy(() => import('./pages/services/Loan'));
const Deposit = lazy(() => import('./pages/services/Deposit'));
const Accounting = lazy(() => import('./pages/services/Accounting'));
const Consultancy = lazy(() => import('./pages/services/Consultancy'));

// Solution Pages
const AI = lazy(() => import('./pages/solutions/AI'));
const Customization = lazy(() => import('./pages/solutions/Customization'));

import PosterPopup from './components/PosterPopup';

// Loading Component
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-primary font-medium animate-pulse">Loading Tally Services...</p>
    </div>
  </div>
);

import { ComparisonProvider } from './context/ComparisonContext';
import ComparisonModal from './components/ComparisonModal';

function App() {
  return (
    <ComparisonProvider>
      <Router>
        <MainLayout>
          <PosterPopup />
          <ComparisonModal />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/about/journey" element={<Journey />} />
              <Route path="/about/why-us" element={<WhyUs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inquiry" element={<Inquiry />} />

              <Route path="/products/prime-silver" element={<PrimeSilver />} />
              <Route path="/products/prime-gold" element={<PrimeGold />} />
              <Route path="/products/auditor" element={<Auditor />} />
              <Route path="/products/server" element={<Server />} />
              <Route path="/products/shoper-silver" element={<ShoperSilver />} />
              <Route path="/products/shoper-gold" element={<ShoperGold />} />
              <Route path="/products/bookkeeper" element={<Bookkeeper />} />
              <Route path="/products/rent" element={<Rent />} />
              <Route path="/products/tvu" element={<TVU />} />
              <Route path="/products/mobile" element={<Mobile />} />
              <Route path="/products/more" element={<MoreProducts />} />

              <Route path="/services/tss" element={<TSS />} />
              <Route path="/services/cloud" element={<Cloud />} />
              <Route path="/services/training" element={<Training />} />
              <Route path="/services/capital" element={<Capital />} />
              <Route path="/services/insurance" element={<Insurance />} />
              <Route path="/services/loan" element={<Loan />} />
              <Route path="/services/deposit" element={<Deposit />} />
              <Route path="/services/accounting" element={<Accounting />} />
              <Route path="/services/consultancy" element={<Consultancy />} />
              <Route path="/services/more" element={<MoreServices />} />

              <Route path="/solutions/ai" element={<AI />} />
              <Route path="/solutions/customization" element={<Customization />} />

              <Route path="*" element={<div className="max-w-[1200px] mx-auto px-5 py-20 text-center"><h2>404 - Page Not Found</h2></div>} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </ComparisonProvider>
  );
}

export default App;
