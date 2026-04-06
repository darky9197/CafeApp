import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import { theme } from './Theme.jsx'
import MainPage from './pages/MainPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import ManagePage from './pages/ManagePage.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path: '/',
        index: true,
        element:<MainPage/>
      },
      {
        path:"itemdesciption/:itemId",
        element:<ItemPage/>,
      },
      {
        path:"manage",
        element:<ManagePage/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
