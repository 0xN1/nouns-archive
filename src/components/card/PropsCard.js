import Link from 'next/link'
import Image from 'next/image'

const Links = {
    'Prop House': '/props/prop-house',
    'NSFW : Small Grants': '/props/nsfw-small-grants',
    'On-Chain Proposals': '/props/onchain',
}

function PropsCard({ prop }) {
    return (
        <div
            className="relative h-[400px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl transition-all duration-150 [border-bottom-width:12px] hover:-translate-y-2 hover:shadow-gray-300"
            key={prop.No}
        >
            <Link href={Links[prop['Project Title']]}>
                <Image
                    className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                    src={
                        prop.Thumbnails?.[0].url
                            ? prop.Thumbnails?.[0].url
                            : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                    }
                    alt={prop.Thumbnails?.[0].name}
                    width={300}
                    height={236}
                />
            </Link>

            <h1 className="h-20 overflow-hidden break-words px-5 py-4 text-xl font-medium">
                {prop['Project Title']}
            </h1>

            <div className="absolute bottom-4 left-6">
                <p className="text-lg">{prop.Builders} Builders</p>
                <p className=" text-lg">{prop.Proposals} Proposals</p>
            </div>

            <div className="flex-rows absolute bottom-4 right-6 flex gap-2">
                <a
                    href={prop['Discord URL']}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className=" text-lg">DC</p>
                </a>
                <a
                    href={prop['Twitter URL']}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className=" text-lg">TW</p>
                </a>
            </div>
        </div>
    )
}

export default PropsCard
