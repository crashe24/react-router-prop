import { lazy, Suspense } from 'react'

//import HomePage from './pages/Home'
//import { AboutPage } from './pages/About' //import statico
import './App.css'
import { Router } from './Router'
import PageNotFound from './pages/Page404'
import  SearchPage  from './pages/SearchPages'
import { Route } from './Route'

const LazyAboutPage = lazy(()=> import('./pages/About.jsx'))
const LazyHomePage = lazy(()=> import('./pages/Home.jsx'))

const routes = [
 // {path: '/', Component: HomePage},
 // {path: '/about', Component: AboutPage},
  {path: '/search/:query', Component: SearchPage}
]


function App() {
  

  return (
    <main>
       <Suspense fallback={<div>Loading...</div>}>
          <Router routes = {routes} defaultComponent={PageNotFound} >
              <Route path='/' Component = {LazyHomePage} />
              <Route path='/:lang/about' Component = {LazyAboutPage} />
          </Router>
        </Suspense>   
    </main>
  )
}

export default App
