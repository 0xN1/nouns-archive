import { APP_NAME } from '@/lib/constants'
import Head from 'next/head'
import { ConnectKitButton } from 'connectkit'
import DatabasePage from '@/components/DatabasePage'

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 font-inter">
            <Head>
                <title>Next Starter</title>
                <link rel="icon" href="/mono.svg" />
            </Head>
            <div className="m-4 flex flex-col items-center">
                <ConnectKitButton />
            </div>

            {/* <DatabasePage databaseId="5c168e32a5aa485eae3ad357aff8bf99" /> */}
            <DatabasePage databaseId="b15b373008624074a2da2600b1674ce5" />

            <div className="mt-6 select-none text-center text-6xl font-bold">
                {APP_NAME}
            </div>
        </div>
    )
}

export default Home
