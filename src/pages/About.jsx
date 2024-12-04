import { Link } from "../Link";

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description: 'Hola me llamo about y estoy aqui'
  },
  en: {
    title: 'About us',
    button: 'go to home',
    description: 'Hi my name is about and it is here!!!'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export  function AboutPageRef ({ routesParams }) {
  const i18n = useI18n(routesParams.lang ?? 'es')
  return (
    <h1>Listo</h1>
  )
}

export default  function AboutPage({ routesParams }) {
  
    const i18n = useI18n(routesParams.lang ?? 'es')
    return (
      <>
        <h1>{i18n.title}</h1>
        <div>
          <img src="https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg" alt="foto" />
          <p>{i18n.description}</p>
        </div>
        <Link  to={'/'}>{i18n.button}</Link>
      </>
    )
  }