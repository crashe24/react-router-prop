
import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'
import { getCurrentPath } from './utils.js'
import { Link } from './Link.jsx'




vi.mock('./utils.js',() =>({
    getCurrentPath: vi.fn()
}))

describe('Router', () => {
    beforeEach(() => { 
        cleanup()
        vi.clearAllMocks()
    })
    it('should work', () => {
       render(<Router routes={[]} />)
       expect(true).toBeTruthy()
    }
    )

    it('should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
       // console.log(screen.debug())
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should the component of the first route than matches',() =>{
        getCurrentPath.mockReturnValue('/about')
        const routes = [
             {path: '/', Component:() => <h1>Home</h1>},
             {path: '/about', Component:() => <h1>About</h1>}
           ]
        render(<Router routes={routes} />)
        expect(screen.getByText('About')).toBeTruthy()
    }) 

    it('should navigate using Link', () => {
        getCurrentPath.mockReturnValue('/')
        render(<Router>
            <Route path= '/' Component = { () => 
                {
                    return (
                        <>
                            <h1>Home</h1>
                            <Link to={'/about'}>About</Link>
                        </>
                    )
                }
            } 
            >
            </Route>
        </Router>)

        screen.getByText('About').click()
        expect(screen.getByText('About'))
        })
})