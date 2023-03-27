import { getLink, getLinkName } from '@/lib/utils'
import { motion as m } from 'framer-motion'

export default function Description({ desc, link }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-16 mt-4 flex w-2/3 flex-col items-center justify-center gap-2 rounded-3xl border-x-4 border-t-4 border-black bg-[#FFF3F8] p-8 shadow-xl [border-bottom-width:12px]"
        >
            <div className="break-words text-center">{desc}</div>
            {link && (
                <div className="flex flex-row gap-4">
                    {link?.split('\n').map((l) => (
                        <a
                            key={getLinkName(l)}
                            href={getLink(l)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <m.div
                                whileHover={{ scale: 1.1 }}
                                className="mt-4 rounded-2xl border-2 border-black bg-[#FFBD12] px-4 py-2 font-medium"
                            >
                                {getLinkName(l)}
                            </m.div>
                        </a>
                    ))}
                </div>
            )}
        </m.div>
    )
}
