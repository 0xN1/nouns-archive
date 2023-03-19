import Link from 'next/link'

export default function Header() {
    return (
        <header className="mb-8 flex w-full flex-row items-center justify-between px-8 py-4">
            <Link href="/">
                <div className="flex flex-row">
                    <img src="/nouns-archive.svg" alt="logo" />
                    <div className="flex flex-col p-4">
                        <h1 className="font-gibson text-2xl uppercase">
                            Nouns Archive
                        </h1>
                        <h1 className="font-semibold">
                            Archive Center for NounsDAOs
                        </h1>
                    </div>
                </div>
            </Link>
            <div className="flex">
                <span className="rounded-2xl border-2 border-black bg-transparent px-6 py-2 font-gibson text-xl tracking-wide transition-all duration-500 ease-in-out hover:bg-[#FFBD12]">
                    ???
                </span>
            </div>
        </header>
    )
}
