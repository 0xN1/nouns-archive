import { getLink, getLinkName } from '@/lib/utils'
import { motion as m } from 'framer-motion'

export default function ContestDetails({ contest }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col justify-center text-center"
        >
            <h2 className="font-bold">Contest Brief</h2>
            <p className="mx-auto whitespace-pre-wrap break-words p-4 text-center">
                {contest['Contest Brief']}
            </p>
            <div className="flex flex-row justify-center gap-4">
                {contest['Link']?.split('\n').map((l) => (
                    <a
                        key={getLinkName(l)}
                        href={getLink(l)}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="rounded-2xl border-2 border-black bg-[#FFBD12] px-4 py-2 font-medium">
                            {getLinkName(l)}
                        </div>
                    </a>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="font-bold">
                    Contest Duration: {contest['Contest Duration']}
                </h2>
                <h2 className="font-bold">Hosted By: {contest['Host']}</h2>
            </div>
        </m.div>
    )
}
