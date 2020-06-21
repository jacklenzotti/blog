import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Footer from './footer'

const name = 'Jack Benett Lenzotti'
export const siteTitle = 'Jack Lenzotti - Home'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href = {process.env.BACKEND_URL + "/favicon.ico"} />
        <meta
          name="description"
          content="Jack Lenzotti Tech Ramblings"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <title>Jack Lenzotti - Blog</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes' />
        <meta name='description' content='Jack Lenzotti - Blog' />
        <meta name='keywords' content='Jack Lenzotti Tech Blog' />
        <link rel='manifest' href={process.env.BACKEND_URL + '/manifest.json'} />
        <link href={process.env.BACKEND_URL + '/favicon-16x16.png'} rel='icon' type='image/png' sizes='16x16' />
        <link href={process.env.BACKEND_URL + '/favicon-32x32.png'} rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href={process.env.BACKEND_URL + '/apple-icon.png'}></link>
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src={process.env.BACKEND_URL + "/images/profile.jpg"}
              className={`${styles.headerHomeImage} ${utilStyles.borderProfileImg}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href={ process.env.BACKEND_URL + "/" }>
              <a>
                <img
                  src={process.env.BACKEND_URL + "/images/profile.jpg"}
                  className={`${styles.headerImage} ${utilStyles.borderProfileImg}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href={ process.env.BACKEND_URL + "/"}>
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={process.env.BACKEND_URL + "/"}>
            <a>← Back to 🏠</a>
          </Link>
        </div>
      )}
      <Footer></Footer>
    </div>
  )
}