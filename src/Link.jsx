import { NAVIGATION_EVENT } from "./const"

export function navigate (href) {
    window.history.pushState({},'',href)
    const navigationEvent = new Event(NAVIGATION_EVENT)
    window.dispatchEvent(navigationEvent)
  }
  
  export function Link({target, to, ...props}) {
    const handleClick = (event) => {
        event.preventDefault()
        // verificar que el evento sea el principal
        const isMainEvent = event.button ===0
        // verificar que el evento este modificado
        const isModifiedEvent = event.metaKey || event.altKey || event.shiftKey 
        const isManageableEvent = target === undefined || target === '_self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            navigate(to) 
        }
        
    }

    return <a onClick={handleClick} href={to} 
    target={target} {...props} />
  }