import { useState } from 'react'
import toast from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Income } from './pages/Income'
import { Expense } from './pages/Expense'
import { Category } from './pages/Category'
import { Filter } from './pages/Filter'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Activate } from './pages/Activate'
import { Dashboard } from './components/Dashboard'
import { PrivateRoute } from './routing/PrivateRoute'
import { PublicRoute } from './routing/PublicRoute'
import { Landing } from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  const notify = () => toast.success("Here is your toast")

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={ <PublicRoute><Landing /></PublicRoute> } />
        <Route path='/login' element={ <PublicRoute><Login /></PublicRoute> } />
        <Route path='/signup' element={ <PublicRoute><Signup /> </PublicRoute> } />
        
        <Route path="/dashboard" element={ <PrivateRoute><Home /></PrivateRoute> } />
        <Route path='income' element={ <PrivateRoute><Income /> </PrivateRoute> } />
        <Route path='expense' element={ <PrivateRoute><Expense /></PrivateRoute> } />
        <Route path='category' element={ <PrivateRoute><Category /></PrivateRoute> } />
        <Route path='filter' element={ <PrivateRoute><Filter /></PrivateRoute> } />
        <Route path='activate' element={ <PrivateRoute><Activate /></PrivateRoute> } />

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
