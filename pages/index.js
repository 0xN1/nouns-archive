import Head from 'next/head'
import Noggles from '@/components/asset/noggles'
import Link from 'next/link'
import { motion as m } from 'framer-motion'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Head>
                <title>Nouns Archive</title>
                <link rel="icon" href="/mono.svg" />
            </Head>

            {/* <Noggles /> */}
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
        </div>
    )
}

export default Home
