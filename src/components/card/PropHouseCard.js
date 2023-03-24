import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, PersonIcon } from '../svg'
import { toSlug, formatDate } from '@/lib/utils'

export default function PropHouseCard({ proposal }) {
    return (
        <div
            className="transition-all duration-200 hover:-translate-y-2"
            key={proposal.id}
        >
            <div
                className="relative h-[410px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] hover:shadow-gray-300"
                key={proposal.id}
            >
                <Link
                    href={`/props/prop-house/${toSlug(
                        proposal['Project Title'],
                    )}`}
                    key={proposal.id}
                >
                    <Image
                        className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                        src={
                            proposal.Thumbnails?.[0].url
                                ? proposal.Thumbnails?.[0].url
                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                        }
                        alt={proposal.Thumbnails?.[0].name}
                        width={300}
                        height={236}
                    />
                </Link>

                <h1 className="h-12 overflow-hidden break-words px-5 py-4 text-xl font-medium">
                    {proposal['Project Title']?.length > 40 ? (
                        <>{proposal['Project Title']?.slice(0, 37)} ...</>
                    ) : (
                        <>{proposal['Project Title']}</>
                    )}
                </h1>
                <div className="px-5 py-1 ">
                    <div className="flex flex-row gap-2">
                        <PersonIcon />
                        <p className="h-6 overflow-hidden break-all text-sm">
                            {proposal['Team']?.split('\n').map((member) => (
                                <span
                                    className="pr-2 leading-normal"
                                    key={member.split('|')[0]}
                                >
                                    {member.split('|')[0]}
                                </span>
                            ))}
                        </p>
                    </div>
                    <p className="flex flex-row gap-2 text-sm">
                        <CalendarIcon />
                        {formatDate(proposal.Date)}
                    </p>
                </div>

                <div className="flex w-96 flex-row gap-1 overflow-clip px-4 py-3">
                    {proposal.Category?.map((category) => (
                        <div
                            key={category}
                            className="flex h-8 flex-row items-center justify-center rounded-full border-2 border-black bg-transparent px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#FFBD12]"
                        >
                            {category}
                        </div>
                    ))}
                </div>

                <div className="absolute top-2 right-2 rounded-full border-2 border-black bg-[#FBF9F5] px-4 py-2 font-bold hover:bg-[#FFBD12]">
                    {proposal.Round}
                </div>
            </div>
        </div>
    )
}
