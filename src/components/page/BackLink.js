import Link from 'next/link'

export default function BackLink({ url, name }) {
    return (
        <Link
            href={url}
            className="absolute left-20 top-32 flex flex-row items-center gap-4 self-start"
        >
            <div className="rounded-full border-2 border-black bg-[#FBF9F5] px-2 font-bold hover:bg-[#FFBD12]">{`<`}</div>
            <h1 className="font-medium underline-offset-1 hover:underline">
                {name}
            </h1>
        </Link>
    )
}
