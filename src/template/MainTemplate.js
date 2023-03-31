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
            </Head>
            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default MainTemplate
