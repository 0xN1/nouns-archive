import { APP_NAME } from '@/lib/constants'
import Head from 'next/head'
import { ConnectKitButton } from 'connectkit'
import DatabaseView from '@/components/DatabaseView'
import BlockView from '@/components/BlockView'
import ProposalListView from '@/components/ProposalListView'
import PropSinglePage from '@/components/prop/PropSinglePage'
import OnChainPropListView from '@/components/prop/OnChainPropListView'
import OnChainView from '@/components/prop/OnChainView'
import Noggles from '@/components/asset/noggles'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Head>
                <title>Nouns Archive</title>
                <link rel="icon" href="/mono.svg" />
            </Head>

            <Noggles />
            <h1 className="w-full p-4 text-center font-gibson text-5xl uppercase leading-tight tracking-wide sm:p-8 md:w-10/12">
                we archive{' '}
                <span className="underline underline-offset-4">all medias</span>{' '}
                in nounsdao&apos;s ecosystem
            </h1>
            <div className="grid w-2/3 grid-rows-1 items-center justify-center justify-items-center p-4 text-center md:grid-cols-3 ">
                <Link href="/props">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        Funded Proposals
                    </h1>
                </Link>
                <Link href="/noggles">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        Noggles
                    </h1>
                </Link>
                <Link href="/world">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        Nouns World
                    </h1>
                </Link>
                <Link href="/special">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        Nouns Special
                    </h1>
                </Link>
                <Link href="/nouns">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        Nouns
                    </h1>
                </Link>
                <Link href="/subdao">
                    <h1 className="p-4 font-gibson text-3xl uppercase transition-all duration-150 ease-in hover:text-red-500 hover:underline">
                        SubDAOs
                    </h1>
                </Link>
            </div>
            {/* <div className="columns-3 gap-4 p-2">
                <Image
                    src="https://placehold.co/300x700/000000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className=" rounded-b-full py-2"
                    width={300}
                    height={700}
                />
                <Image
                    src="https://placehold.co/300x500/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-t-full py-2"
                    width={300}
                    height={500}
                />
                <Image
                    src="https://placehold.co/300x300/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-b-full py-2"
                    width={300}
                    height={300}
                />
                <Image
                    src="https://placehold.co/300x500/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-t-full py-2"
                    height={500}
                    width={300}
                />
                <Image
                    src="https://placehold.co/300x700/000000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-full py-2"
                    width={300}
                    height={700}
                />
                <Image
                    src="https://placehold.co/300x300/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-full py-2"
                    width={300}
                    height={300}
                />
                <Image
                    src="https://placehold.co/300x300/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-full py-2"
                    width={300}
                    height={300}
                />
                <Image
                    src="https://placehold.co/300x600/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-b-full py-2"
                    width={300}
                    height={600}
                />
                <Image
                    src="https://placehold.co/300x600/ff0000/ffffff?text=Nouns+Archive&font=raleway"
                    alt="Nouns Archive"
                    className="rounded-t-full py-2"
                    width={300}
                    height={600}
                />
            </div> */}
            {/* <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 font-inter text-white"> */}
            {/* <div className="m-4 flex flex-col items-center">
                <ConnectKitButton />
            </div> */}
            {/* <DatabaseView databaseId="5c168e32a5aa485eae3ad357aff8bf99" /> */}
            {/* <DatabaseView databaseId="b15b373008624074a2da2600b1674ce5" /> */}
            {/* <BlockView blockId="da52f93301dd4ed59e5b876bd5151d93" /> */}
            {/* <BlockView blockId="f3f57f057fb1454393914d626d487648" /> */}
            {/* <BlockView blockId="92a26d32-4ef3-4ad6-90f7-3d760f6ddcf6" /> */}
            {/* <DatabaseView databaseId="67079226-a645-48ca-9d3f-feb7fe092bc0" /> */}
            {/* <div className="mt-6 select-none text-center text-6xl font-bold">
                {APP_NAME}
            </div> */}
            {/* <OnChainPropListView proposalDB="1330bf9251614e64ae3de2b26b522051" /> */}
            {/* <ProposalListView proposalDB="7560d477d44b404baa2e70afd5ecf52b" /> */}
            {/* <ProposalListView proposalDB="1330bf9251614e64ae3de2b26b522051" /> */}
            {/* <PropSinglePage propId="80f38e6c-f846-4457-b811-1ff7cfbf5130" /> */}
            {/* <OnChainView /> */}
            {/* </div> */}
        </div>
    )
}

export default Home
