import Link from 'next/link'

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
    return (
        <div className="p-4 font-inter">
            <img
                className="h-64 w-full object-cover"
                src={
                    proposal.Thumbnails?.[0].url
                        ? proposal.Thumbnails?.[0].url
                        : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=montserrat'
                }
                alt={proposal.Thumbnails?.[0].name}
            />
            <h1 className="py-4 text-3xl font-bold">
                {proposal['Project Title']}
            </h1>
            <p className=" whitespace-pre-wrap break-words p-2">
                {proposal.Description}
            </p>
            <div
                className="grid grid-cols-4 gap-4 py-4
            "
            >
                {proposal['Product / Progress']?.map((item) =>
                    item.url.includes('.mp4') ? (
                        <video
                            key={item.name}
                            src={item.url}
                            className="rounded-lg shadow-lg shadow-black"
                            alt={item.name}
                            controls={true}
                        />
                    ) : (
                        <img
                            className=" h-32 w-full rounded-md object-cover shadow-black transition-all duration-500 ease-in-out hover:shadow-lg"
                            key={item.name}
                            src={item.url}
                            alt={item.name}
                        />
                    ),
                )}
            </div>

            <Link href="/on-chain-props">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                    Back
                </button>
            </Link>
        </div>
    )
}
