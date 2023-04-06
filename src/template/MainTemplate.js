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
                    property="og:site_name"
                    content="Nouns Archive"
                    key="site_name"
                />
                <meta property="og:locale" content="en_US" key="locale" />

                <title>Nouns Archive</title>
                <meta
                    name="description"
                    content="We archive all media in Nouns DAO ecosystem"
                />

                <meta property="og:url" content="https://archives.wtf" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Nouns Archive" />
                <meta
                    property="og:description"
                    content="We archive all media in Nouns DAO ecosystem"
                />
                <meta
                    property="og:image"
                    content="https://archives.wtf/api/og"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="archives.wtf" />
                <meta property="twitter:url" content="https://archives.wtf" />
                <meta name="twitter:title" content="Nouns Archive" />
                <meta
                    name="twitter:description"
                    content="We archive all media in Nouns DAO ecosystem"
                />
                <meta
                    name="twitter:image"
                    content="https://archives.wtf/api/og"
                />
            </Head>
            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default MainTemplate
