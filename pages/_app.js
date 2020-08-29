import '../styles/index.css'
import '../css/form.css'
import "toasted-notes/src/styles.css"
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pop Care App</title>
      </Head>

      <div className="flex flex-row bg-gray-100 px-5">
        <div className="flex-grow">
          <img
            src="/logo.png"
            alt="pop care logo"
            className="block my-2"
            style={{ width: '130px', height: '100px' }}
          ></img>
        </div>
        <div className="mt-8 mr-6 text-lg">
          <Link href="/">
            <a className='mr-8 hover:underline'>Home</a>
          </Link>
          <Link href="/got">
            <a className='mr-8 hover:underline'>Game of Thrones</a>
          </Link>
          <Link href="/new">
            <a className='hover:underline'>Add Pop</a>
          </Link>
        </div>
      </div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
