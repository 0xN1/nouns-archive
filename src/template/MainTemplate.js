import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import Head from 'next/head'

function MainTemplate({ children, ...props }) {
    const [showToTopButton, setShowToTopButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowToTopButton(true)
            } else {
                setShowToTopButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-[#FBF9F5] font-inter">
            <Head>
                <title>Nouns Archive</title>
                <link rel="icon" href="/nouns-archive.svg" />
            </Head>
            <Header />
            {showToTopButton && (
                <button
                    onClick={() => {
                        scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }}
                >
                    <div className="fixed bottom-5 right-5 z-50 font-inter">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-full border-2 border-black bg-[#FBF9F5] px-4 py-2 hover:bg-[#FFBD12]"
                        >
                            Back to Top
                        </m.div>
                    </div>
                </button>
            )}
            {children}
            <Footer />
        </div>
    )
}

export default MainTemplate
