/*
  App组件，作为React应用的根组件，导入并渲染CommunityBoard组件
*/

import CommunityBoard from './community/index.jsx'
import './App.css'

function App() {
  return (
    <>
      <CommunityBoard />
    </>
  )
}

export default App
