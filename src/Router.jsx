import { useState, useEffect, Children } from 'react'
import { NAVIGATION_EVENT, POPSTATE_EVENT } from './const'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Router ({children,routes = [], defaultComponent: DefaultComponent = () =><h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())
  
    useEffect(()=>{
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath())
      }
      window.addEventListener(NAVIGATION_EVENT, onLocationChange)
      window.addEventListener(POPSTATE_EVENT, onLocationChange)
      return ()=>{
        window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
        window.removeEventListener(POPSTATE_EVENT, onLocationChange)
      }
    },[])

    let routesParams = {}

    // add routes from children
    const routesFromChildren = Children.map( children, ({ props, type }) => {
      const { name } = type
      const isRoute = name === 'Route'
      if (!isRoute) return null
      return props 
    })
    
    const routeToUse = routes.concat(routesFromChildren).filter(Boolean)
    
    const Page = routeToUse.find(({path}) => {
        if (path === currentPath) return true 
        // implementando rutas dinamicas  // search/:query
        const matchesUrl = match(path, { decode: decodeURIComponent})
        const matched = matchesUrl(currentPath)
        if (!matched) return false
        routesParams = matched.params
        console.log('routesParams: ', routesParams)
        return true 

    })?.Component
    
    console.log(" page : ", Page)
    return Page 
      ? <Page routesParams={routesParams} />
      : <DefaultComponent routesParams={routesParams}/>
  }
  