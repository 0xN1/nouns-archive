import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="mb-8 flex w-full flex-col items-center justify-between px-8 py-4 sm:flex-row">
            <Link href="/">
                <div className="flex min-w-[350px] scale-90 flex-row sm:scale-100">
                    <Image
                        src="/nouns-archive.svg"
                        alt="logo"
                        width={80}
                        height={80}
                    />
                    <div className="flex flex-col p-2 sm:p-4">
                        <h1 className="font-gibson text-2xl uppercase">
                            Nouns Archive
                        </h1>
                        <h1 className="font-semibold">
                            Archive Center for NounsDAOs
                        </h1>
                    </div>
                </div>
            </Link>
            <div className="hidden sm:flex">
                <Link href="/faq">
                    <span className="rounded-2xl border-2 border-black bg-transparent px-6 py-2 font-gibson text-xl tracking-wide transition-all duration-500 ease-in-out hover:bg-[#FFBD12]">
                        FAQ
                    </span>
                </Link>
            </div>
        </header>
    )
}
