import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-between gap-4">
            <BackLink url="/" name="Home" />
            <Noggles />
            <span className="text-center font-gibson text-2xl uppercase tracking-wide">
                omg, you broke the internet
            </span>
        </div>
    )
}
