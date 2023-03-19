import ImageModal from '@/components/modal/ImageModal'
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
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [videoModalURL, setVideoModalURL] = useState('')

    return (
        <div className="flex flex-col items-center bg-[#FBF9F5] p-4 pt-32 font-inter">
            <h1 className="mb-8 p-8 text-center font-gibson text-6xl uppercase">
                {proposal['Project Title']}
            </h1>
            <img
                className=" h-[400px] w-[800px] rounded-md object-cover shadow-xl shadow-[#878282]"
                src={
                    proposal.Thumbnails?.[0].url
                        ? proposal.Thumbnails?.[0].url
                        : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                }
                alt={proposal.Thumbnails?.[0].name}
                onClick={() => {
                    setImageModalURL(proposal.Thumbnails?.[0].url)
                    setShowImageModal(true)
                }}
            />

            <h1 className="mt-4 mb-8  p-8 text-center font-gibson text-5xl uppercase">
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
                <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white hover:bg-gray-500">
                    More Details
                </button>
            </a>

            <h1 className="mt-4 mb-8 p-8 text-center font-gibson text-5xl uppercase">
                Media
            </h1>
            <div
                className="grid w-3/4 grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-3
            "
            >
                <ImageModal
                    isVisible={showImageModal}
                    onClose={() => setShowImageModal(false)}
                >
                    <img
                        className="w-full rounded-lg object-cover shadow-lg shadow-gray-600"
                        src={imageModalURL}
                        alt={imageModalURL}
                    />
                </ImageModal>

                {/* <ImageModal
                    isVisible={showVideoModal}
                    onClose={() => setShowImageModal(false)}
                >
                    <video
                        src={videoModalURL}
                        className="rounded-lg shadow-lg shadow-black"
                        alt={videoModalURL}
                        controls={true}
                    />
                </ImageModal> */}

                {proposal['Product / Progress']?.map((item) =>
                    item.url.includes('.mp4') ? (
                        <video
                            key={item.name}
                            src={item.url}
                            className="rounded-lg shadow-lg shadow-black"
                            alt={item.name}
                            controls={true}
                            // onClick={() => {
                            //     setVideoModalURL(item.url)
                            //     setShowVideoModal(true)
                            // }}
                        />
                    ) : (
                        <img
                            className=" h-32 w-full rounded-md object-cover shadow-black transition-all duration-500 ease-in-out hover:shadow-lg sm:w-64"
                            key={item.name}
                            src={item.url}
                            alt={item.name}
                            onClick={() => {
                                setImageModalURL(item.url)
                                setShowImageModal(true)
                            }}
                        />
                    ),
                )}
            </div>
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
                            <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white hover:bg-gray-500">
                                {member.split('|')[0]}
                            </button>
                        </a>
                    </div>
                ))}
            </div>
            <h1 className="mt-4 mb-8 p-8  text-center font-gibson text-5xl uppercase">
                Links
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
                {proposal['Links'].split('\n').map((link) => (
                    <a
                        key={link}
                        href={link.split('|')[1]}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white hover:bg-gray-500">
                            {link.split('|')[0]}
                        </button>
                    </a>
                ))}
            </div>

            <span className="my-16 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

            <Link href="/props/onchain">
                <button className=" rounded-3xl bg-blue-600 py-2 px-4 font-bold text-white hover:bg-gray-500">
                    Back
                </button>
            </Link>
        </div>
    )
}
