/*
  React入口文件，导入了项目框架文件和全局样式文件，并将App组件渲染到HTML的root节点中
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
