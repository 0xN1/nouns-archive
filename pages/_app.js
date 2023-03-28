import MainTemplate from '@/template/MainTemplate'
import { Analytics } from '@vercel/analytics/react'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <MainTemplate>
            <Component {...pageProps} />
            <Analytics />
        </MainTemplate>
    )
}

export default MyApp
