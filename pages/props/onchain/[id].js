import ImageModal from '@/components/modal/ImageModal'
import BaseTemplate from '@/template/BaseTemplate'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export async function getStaticPaths() {
    // Fetch the data from the API
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/1330bf9251614e64ae3de2b26b522051',
    )
    const data = await res.json()

    // Generate the paths for each proposal
    const paths = data.map((proposal) => ({
        params: { id: proposal.No.toString() },
    }))

    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const { id } = params

    // Fetch the data for the specified proposal
    const res = await fetch(
        `https://notion-api.splitbee.io/v1/table/1330bf9251614e64ae3de2b26b522051`,
    )
    const data = await res.json()
    const proposal = data.find((proposal) => proposal.No.toString() === id)

    return { props: { proposal }, revalidate: 60 }
}

export default function Proposal({ proposal }) {
    console.log(proposal)

    const [showImageModal, setShowImageModal] = useState(false)
    const [imageModalURL, setImageModalURL] = useState('')

    return (
        <BaseTemplate>
            <h1 className="p-8 text-center font-gibson text-6xl uppercase">
                {proposal['Project Title']}
            </h1>
            <div className="mb-8 flex flex-row gap-4 p-4">
                {proposal.Category.map((category) => (
                    <div
                        key={category}
                        className=" text-md flex flex-row items-center justify-center rounded-full border-2 border-black bg-[#FFBD12] px-4 py-2 font-medium text-gray-900"
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 justify-items-center gap-8 rounded-3xl border-2 border-black bg-white p-4 px-12 text-center">
                <div className="flex flex-col gap-4 ">
                    <span className="text-md">Voting</span>
                    <span className="text-lg font-bold">{proposal.Voting}</span>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-md">Total Funded</span>
                    <span className="text-lg font-bold">
                        {proposal.ETH} ETH
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-md">Status</span>
                    <span className="text-lg font-bold">{proposal.Status}</span>
                </div>
            </div>

            <span className="my-8 w-3/4 rounded-xl bg-[#b5b5b5] p-[1px]"></span>

            <Image
                className=" w-[800px] scale-75 rounded-md object-cover shadow-xl shadow-[#878282] transition-all duration-500 ease-in-out hover:shadow-xl md:h-[400px] md:scale-100"
                src={
                    proposal.Thumbnails?.[0].url
                        ? proposal.Thumbnails?.[0].url
                        : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                }
                alt={
                    proposal.Thumbnails?.[0].name
                        ? proposal.Thumbnails?.[0].name
                        : 'Nouns Archive'
                }
                onClick={() => {
                    setImageModalURL(
                        proposal.Thumbnails?.[0].url
                            ? proposal.Thumbnails?.[0].url
                            : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway',
                    )
                    setShowImageModal(true)
                }}
                width={800}
                height={400}
            />

            <h1 className="mt-8 mb-8 p-8 text-center font-gibson text-5xl uppercase">
                Description
            </h1>
            <p className="w-3/4 whitespace-pre-wrap break-words p-2 text-justify">
                {proposal.Description}
            </p>
            <a
                href={`https://nouns.wtf/vote/${proposal.No}`}
                target="_blank"
                rel="noreferrer"
                className="p-8"
            >
                <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700">
                    More Details
                </button>
            </a>

            {proposal['Medias'] && (
                <div className="flex flex-col items-center">
                    <h1 className="mt-4 mb-8 p-8 text-center font-gibson text-5xl uppercase">
                        Media
                    </h1>
                    <div
                        className="grid w-3/4 justify-items-center gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            "
                    >
                        <ImageModal
                            isVisible={showImageModal}
                            onClose={() => setShowImageModal(false)}
                        >
                            <Image
                                className="w-full rounded-lg object-cover shadow-lg shadow-gray-600"
                                src={imageModalURL}
                                alt={imageModalURL}
                                width={800}
                                height={400}
                            />
                        </ImageModal>

                        {proposal['Medias']?.map((item) => (
                            <Image
                                className=" h-32 w-full rounded-md object-cover shadow-md shadow-[#878282] transition-all duration-500 ease-in-out hover:shadow-lg sm:w-64"
                                key={item.name}
                                src={item.url}
                                alt={item.name}
                                onClick={() => {
                                    setImageModalURL(item.url)
                                    setShowImageModal(true)
                                }}
                                width={800}
                                height={400}
                            />
                        ))}
                    </div>
                </div>
            )}

            {proposal['Video'] && (
                <div className="flex flex-col items-center">
                    <h1 className="mt-4 mb-8 p-8 text-center font-gibson text-5xl uppercase">
                        Video
                    </h1>
                    <div
                        className="grid w-3/4 grid-cols-1 justify-items-center gap-4 py-4
            "
                    >
                        {proposal['Video']?.split('\n').map((item) => (
                            <video
                                key={item.split('|')[0]}
                                src={item.split('|')[1]}
                                className="rounded-lg shadow-lg shadow-black"
                                alt={item.split('|')[0]}
                                controls={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {proposal['Team'] && (
                <div className="flex flex-col items-center">
                    <h1 className="mt-4 mb-8 p-8  text-center font-gibson text-5xl uppercase">
                        Team
                    </h1>

                    <div className="flex flex-col gap-4">
                        {proposal['Team']?.split('\n').map((member) => (
                            <div
                                key={member.split('|')[0]}
                                className="flex flex-row items-center justify-center gap-4"
                            >
                                <a
                                    href={member.split('|')[1]}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700">
                                        {member.split('|')[0]}
                                    </button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {proposal['Links'] && (
                <div className="flex flex-col items-center">
                    <h1 className="mt-4 mb-8 p-8  text-center font-gibson text-5xl uppercase">
                        Links
                    </h1>
                    <div className="flex flex-col items-center justify-center gap-4">
                        {proposal['Links']?.split('\n').map((link) => (
                            <a
                                key={link}
                                href={link.split('|')[1]}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700">
                                    {link.split('|')[0]}
                                </button>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <span className="my-8 mt-16 w-3/4 rounded-xl bg-[#b5b5b5] p-[1px]"></span>

            <Link href="/props/onchain">
                <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700">
                    Back
                </button>
            </Link>
        </BaseTemplate>
    )
}
