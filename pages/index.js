import Link from 'next/link'
import { motion as m } from 'framer-motion'
import MainCard from '@/components/card/MainCard'

const mainContents = [
    {
        name: 'Noggles',
        imageURL:
            'http://arweave.net/57OeUO6-Py-RVIR1SK6cmI3OlOZ7y03YMfgEMXipfy4',
        link: '/noggles',
        id: 1,
    },
    {
        name: 'Nouns',
        imageURL:
            'http://arweave.net/neTxQkw8jHEhouWgpSepbTk-YdD0nEHIjm62zG2IRKA',
        link: '/nouns',
        id: 2,
    },
    {
        name: 'Funded Proposal',
        imageURL:
            'http://arweave.net/Dhe92aOiTY3HN6SZRBS8N3sQ_EZGVjO7HQJWSyatciM',
        link: '/props',
        id: 3,
    },
    {
        name: 'Nouns Special',
        imageURL:
            'http://arweave.net/FwaSZN9g7G677SBYzfmN_HjHnUf3xBQAFaJIZ2n48rg',
        link: '/special',
        id: 4,
    },

    {
        name: 'SubDAOs',
        imageURL:
            'http://arweave.net/c0lRON-PHQ5KwPq1k6qCQIxu-VHcjfeq8ZeRrWcbn-0',
        link: '/subdao',
        id: 5,
    },
    {
        name: 'Nouns World',
        imageURL:
            'http://arweave.net/_lH_ghkQFzYATBG0sWJ_bNkkpxTNT885WzqwnRPjABg',
        link: '/world',
        id: 6,
    },
]

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-4">
            <h1 className="p-4 text-center font-gibson text-4xl uppercase leading-tight tracking-wide sm:w-3/4 sm:p-8 sm:text-5xl md:w-3/4 md:p-10 xl:w-3/4">
                we archive{' '}
                <span className="underline underline-offset-4 hover:text-blue-500">
                    all media
                </span>{' '}
                in nounsdao&apos;s ecosystem
            </h1>
            <div className="my-6 grid grid-cols-1 items-center justify-center gap-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {mainContents.map((content) => (
                    <MainCard content={content} key={content.name} />
                ))}
            </div>
        </div>
    )
}

export default Home
