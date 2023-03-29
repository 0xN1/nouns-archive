import { toSlug } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArtworkIcon, PersonIcon } from '../svg'

export default function NogglesContestsCard({ contest, parentSlug }) {
    return (
        <div className="transition-all duration-200 hover:-translate-y-2">
            <div className="relative h-[410px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] hover:shadow-gray-300">
                <Link
                    href={`/${parentSlug}/${toSlug(contest['Project Title'])}`}
                >
                    <Image
                        className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                        src={
                            contest.Thumbnails?.[0]?.url
                                ? contest.Thumbnails?.[0]?.url
                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                        }
                        alt={contest.Thumbnails?.[0]?.name}
                        width={1000}
                        height={1000}
                    />
                </Link>

                <h1 className="h-12 overflow-hidden break-words px-5 py-4 text-xl font-medium">
                    {contest['Project Title'].length > 40 ? (
                        <>{contest['Project Title'].slice(0, 37)} ...</>
                    ) : (
                        <>{contest['Project Title']}</>
                    )}
                </h1>
                <div className="px-5 py-1">
                    <div className="flex flex-row gap-2">
                        <PersonIcon />

                        <p className="h-6 overflow-hidden break-all text-sm">
                            {contest['Artists']} Artists
                        </p>
                    </div>
                    <p className="flex flex-row gap-2 text-sm">
                        <ArtworkIcon />
                        {contest['Artworks']} Artworks
                    </p>
                </div>

                <div className="flex flex-row gap-2 px-4 py-3">
                    {contest.Category?.map((category) => (
                        <div
                            key={category}
                            className="flex flex-row items-center justify-center rounded-full border-2 border-black bg-transparent px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#FFBD12]"
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
