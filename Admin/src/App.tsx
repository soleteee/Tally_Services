import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import BlogManagement from './pages/BlogManagement';
import AddBlog from './pages/AddBlog';
import PosterManagement from './pages/PosterManagement';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<BlogManagement />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="poster-settings" element={<PosterManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
