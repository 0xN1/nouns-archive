import Noggles from '@/components/asset/Noggles'
import BackLink from '@/components/BackLink'
import Link from 'next/link'

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <BackLink url="/" name="Home" />
            <Noggles />
            <span className="text-center font-gibson text-2xl uppercase tracking-wide">
                omg, you broke the internet
            </span>
            {/* <Link
                href="/"
                className="text-center font-gibson text-4xl uppercase tracking-wide hover:underline"
            >
                go back home
            </Link> */}
        </div>
    )
}
