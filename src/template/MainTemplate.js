import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Head from 'next/head'

function MainTemplate({ children, ...props }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-[#FBF9F5] font-inter">
            <Head>
                <title>Nouns Archive</title>
                <link rel="icon" href="/nouns-archive.svg" />
                <meta
                    property="og:image"
                    content="https://archives.wtf/api/og"
                />
                <meta property="og:title" content="Nouns Archive" key="title" />
                <meta
                    property="og:description"
                    content="We archive all media in Nouns DAO ecosystem"
                    key="description"
                />
                <meta
                    property="og:url"
                    content="https://archives.wtf"
                    key="url"
                />
                <meta
                    property="og:site_name"
                    content="Nouns Archive"
                    key="site_name"
                />
                <meta property="og:type" content="website" key="type" />
                <meta property="og:locale" content="en_US" key="locale" />
            </Head>
            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default MainTemplate
