/*
  App组件，作为React应用的根组件，导入并渲染CommunityBoard组件
*/

import CommunityBoard from './pages/community/index.jsx'
import ScrollToTop from './pages/components/ScrollToTop/index.jsx'
import './App.css'
import { UserProvider } from './pages/context/UserContext';
import Profile from './pages/profile';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CommunityBoard />
      <ScrollToTop />
      <UserProvider />
      <Routes>
        <Route path="/" element={<CommunityBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
