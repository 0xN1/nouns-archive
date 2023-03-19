import BlockList from '@/template/BlockList'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <BlockList>
            <Component {...pageProps} />
        </BlockList>
    )
}

export default MyApp
