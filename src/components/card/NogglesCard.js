import Image from 'next/image'
import Link from 'next/link'
import { toSlug } from '@/lib/utils'

export default function NogglesCard({ item }) {
    return (
        <div
            key={item.id}
            className="relative flex flex-col items-center justify-center transition-all duration-150  hover:-translate-y-2 hover:shadow-gray-300"
        >
            <div className="h-[350px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] ">
                <Link href={`/noggles/${toSlug(item.child_database.title)}`}>
                    <Image
                        className="h-[350px] w-[300px] border-b-4 border-black object-cover"
                        src="https://placehold.co/300x350/FBF9F5/000000?text=Nouns+Archive&font=raleway"
                        width={300}
                        alt="nouns-archive"
                        height={350}
                    />
                </Link>
            </div>
            <div
                className="-mt-8 rounded-full border-2 border-black bg-yellow-400 px-4 py-2 shadow-xl
                "
            >
                <h1 className="font-gibson text-xl uppercase">
                    {item.child_database.title.length > 15
                        ? item.child_database.title.slice(0, 15) + '...'
                        : item.child_database.title}
                </h1>
            </div>
            <span className="p-4">{toSlug(item.child_database.title)}</span>
        </div>
    )
}
