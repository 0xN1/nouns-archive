import { formatDate, toSlug } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function MainCard({ content }) {
    return (
        <div className="relative mx-auto flex w-full flex-col items-center transition-all duration-200 hover:-translate-y-2">
            <div
                className="min-h-[265px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black object-cover shadow-xl [border-bottom-width:12px] hover:shadow-gray-300"
                key={content.name}
            >
                <Link href={content.link}>
                    <Image
                        className="h-[265px] w-[300px] border-b-4 border-black object-cover"
                        src={
                            content.imageURL
                                ? content.imageURL
                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                        }
                        alt={content.name}
                        width={1000}
                        height={1000}
                    />
                </Link>
            </div>
            <div className="absolute -bottom-4 mx-auto rounded-full border-2 border-black bg-[#FFBD12] px-6 py-2 font-gibson text-lg uppercase">
                {content.name}
            </div>
        </div>
    )
}
