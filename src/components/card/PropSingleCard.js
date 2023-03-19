import Link from 'next/link'

export default function PropSingleCard({ proposal }) {
    return (
        <div>
            <Link href={`/props/onchain/${proposal.No}`} key={proposal.id}>
                <li
                    className="relative h-[400px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black [border-bottom-width:12px]"
                    key={proposal.id}
                >
                    <img
                        className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                        src={
                            proposal.Thumbnails?.[0].url
                                ? proposal.Thumbnails?.[0].url
                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                        }
                        alt={proposal.Thumbnails?.[0].name}
                    />

                    <h1 className="h-20 overflow-hidden break-words px-5 py-4 text-2xl">
                        {proposal['Project Title'].length > 40 ? (
                            <>{proposal['Project Title'].slice(0, 37)} ...</>
                        ) : (
                            <>{proposal['Project Title']}</>
                        )}
                    </h1>

                    <div className="absolute bottom-4 left-6">
                        <p className=" text-lg">Prop #{proposal.No}</p>
                        <p className="text-sm">Date: {proposal.Date}</p>
                    </div>
                </li>
            </Link>
        </div>
    )
}
