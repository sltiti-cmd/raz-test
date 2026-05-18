import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TestPage from './pages/TestPage'
import PlacementHome from './pages/PlacementHome'
import PlacementPage from './pages/PlacementPage'
import ResultPage from './pages/ResultPage'
import AdminPage from './pages/AdminPage'
import FeedbackWidget from './components/FeedbackWidget'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:levelId" element={<TestPage />} />
        <Route path="/placement" element={<PlacementHome />} />
        <Route path="/placement/:levelId" element={<PlacementPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <FeedbackWidget />
    </BrowserRouter>
  )
}
