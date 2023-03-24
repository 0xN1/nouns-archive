import BlockList from '@/template/BlockList'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

const MyApp = ({ Component, pageProps }) => {
    return (
        <BlockList>
            <Component {...pageProps} />
            <Analytics />
        </BlockList>
    )
}

export default MyApp
