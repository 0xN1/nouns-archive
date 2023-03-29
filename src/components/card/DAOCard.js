import Image from 'next/image'
import Link from 'next/link'
import { toSlug } from '@/lib/utils'
import {
    DiscordIcon,
    PersonIcon,
    ProposalIcon,
    TwitterIcon,
    WebsiteIcon,
} from '../svg'

export default function DAOCard({ dao }) {
    return (
        <div className="transition-all duration-200 hover:-translate-y-2">
            <div className="relative h-[400px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl transition-all duration-150 [border-bottom-width:12px] hover:-translate-y-2 hover:shadow-gray-300">
                <Link href={`/subdao/${toSlug(dao['Project Title'])}`}>
                    <Image
                        className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                        src={
                            dao.Thumbnails?.[0].url
                                ? dao.Thumbnails?.[0].url
                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                        }
                        alt={dao.Thumbnails?.[0].name}
                        width={1000}
                        height={1000}
                    />
                </Link>

                <h1 className="h-20 overflow-hidden break-words px-5 py-6 text-2xl font-medium">
                    {dao['Project Title']}
                </h1>

                <div className="absolute bottom-4 left-6 flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <PersonIcon />
                        <p className="-mt-1 overflow-hidden break-all text-lg">
                            {dao.Builders} Builders
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <ProposalIcon />
                        <p className="-mt-1 overflow-hidden break-all text-lg">
                            {dao.Proposals} Proposals
                        </p>
                    </div>
                </div>

                <div className="flex-rows absolute bottom-4 right-6 flex gap-2">
                    {dao['Website URL'] && (
                        <a
                            href={dao['Website URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div>
                                <WebsiteIcon />
                            </div>
                        </a>
                    )}

                    {dao['Discord URL'] && (
                        <a
                            href={dao['Discord URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div>
                                <DiscordIcon />
                            </div>
                        </a>
                    )}

                    {dao['Twitter URL'] && (
                        <a
                            href={dao['Twitter URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div>
                                <TwitterIcon />
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
