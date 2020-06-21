import '../styles/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const lang = "en"
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <Component {...pageProps} />
}