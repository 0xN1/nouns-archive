import { APP_NAME } from '@/lib/constants'
import Head from 'next/head'
import { ConnectKitButton } from 'connectkit'
import DatabaseView from '@/components/DatabaseView'
import BlockView from '@/components/BlockView'

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 font-inter">
            <Head>
                <title>Nouns Archive</title>
                <link rel="icon" href="/mono.svg" />
            </Head>
            {/* <div className="m-4 flex flex-col items-center">
                <ConnectKitButton />
            </div> */}

            {/* <DatabaseView databaseId="5c168e32a5aa485eae3ad357aff8bf99" /> */}
            {/* <DatabaseView databaseId="b15b373008624074a2da2600b1674ce5" /> */}
            {/* <BlockView blockId="da52f93301dd4ed59e5b876bd5151d93" /> */}
            {/* <BlockView blockId="f3f57f057fb1454393914d626d487648" /> */}
            <BlockView blockId="92a26d32-4ef3-4ad6-90f7-3d760f6ddcf6" />
            {/* <DatabaseView databaseId="67079226-a645-48ca-9d3f-feb7fe092bc0" /> */}

            {/* <div className="mt-6 select-none text-center text-6xl font-bold">
                {APP_NAME}
            </div> */}
        </div>
    )
}

export default Home
