import Link from 'next/link'
import useSWR from 'swr'

export default function PropSinglePage({ propId }) {
    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data: propPageID } = useSWR(
        `/api/getProposalID?id=${propId}`,
        fetcher,
    )

    const { data, error, isLoading } = useSWR(
        `/api/notion/page?id=${propPageID}`,
        fetcher,
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error...</div>
    }

    return (
        <div>
            {data?.properties && (
                <div>
                    <img
                        className="h-96 w-full object-cover"
                        src={data.properties.Thumbnails.files[0]?.file.url}
                        alt={data.properties.No.number}
                    />
                    <h1 className="mt-4 p-4 text-2xl font-semibold">
                        {data.properties['Project Title'].title[0].plain_text}
                    </h1>
                    {data.properties.ETH.number > 0 && (
                        <p className="p-4 text-xl font-medium">
                            {data.properties.ETH.number} ETH
                        </p>
                    )}
                    <p className="mb-4 whitespace-pre-wrap break-words px-4">
                        {data.properties.Description.rich_text[0].plain_text}
                    </p>
                    <div className="p-4">
                        <a
                            href={data.properties.Links.rich_text[0].href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                                View Proposal
                            </button>
                        </a>

                        <Link className="p-4 font-bold" href={'/'}>
                            Back to Proposals
                        </Link>
                    </div>
                    {/* <ul className="flex flex-col items-center gap-4">
                        {data.properties['End Product'].files.map((item) => (
                            <li key={item.id}>
                                {item.file.url.includes('.mp4') ? (
                                    <video
                                        src={item.file.url}
                                        className="rounded-lg shadow-lg shadow-black"
                                        alt={item.name}
                                        controls={true}
                                    />
                                ) : (
                                    <img
                                        src={item.file.url}
                                        className="rounded-lg shadow-lg shadow-black"
                                        alt={item.name}
                                    />
                                )}
                            </li>
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    )
}
