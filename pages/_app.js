import MainTemplate from '@/template/MainTemplate'
import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
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
        <MainTemplate>
            <Component {...pageProps} />
            <Analytics />
            {showToTopButton && (
                <button
                    onClick={() => {
                        scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }}
                >
                    <div className="z-100 fixed bottom-5 right-5 font-inter">
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
        </MainTemplate>
    )
}

export default MyApp
