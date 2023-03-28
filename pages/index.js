import Link from 'next/link'
import { motion as m } from 'framer-motion'
import MainCard from '@/components/card/MainCard'

const mainContents = [
    {
        name: 'Funded Proposal',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
        link: '/props',
        id: 1,
    },
    {
        name: 'Noggles',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
        link: '/noggles',
        id: 2,
    },
    {
        name: 'Nouns Special',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
        link: '/special',
        id: 3,
    },
    {
        name: 'Nouns',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
        link: '/nouns',
        id: 4,
    },
    {
        name: 'SubDAOs',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
        link: '/subdao',
        id: 5,
    },
    {
        name: 'Nouns World',
        imageURL:
            'https://arweave.net/76pyRGBY6B6fD2ly77Um5fJoUBHehB1Irt-SwUMVfN4',
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
