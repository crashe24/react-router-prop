import { useEffect } from "react"

export default function SearchPage ({routesParams}) {

    console.log('parametros ', routesParams.query)

    useEffect( () => {
        document.title = `Has buscado ${routesParams.query}`
    },
    [])
    return (
        <h1>
            Se esta buscando: {routesParams.query}
        </h1>
    )
}