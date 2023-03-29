import Link from 'next/link'
import { ArrowLeftIcon } from '../svg'
import { motion as m } from 'framer-motion'

export default function BackLink({ url, name }) {
    return (
        <Link
            href={url}
            className="my-0 flex items-center gap-4 sm:absolute sm:left-20 sm:top-32 sm:flex-row sm:self-start "
        >
            {/* <div className="rounded-full border-2 border-black bg-[#FBF9F5] px-2 font-bold hover:bg-[#FFBD12]">{`<`}</div> */}
            <m.div
                transition={{ duration: 0.25 }}
                initial={{ opacity: 0.2, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="scale-125"
            >
                <ArrowLeftIcon className="hover:fill-[#FFBD12]" />
            </m.div>
            <m.h1
                transition={{ duration: 0.45 }}
                initial={{ opacity: 0.2, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-medium underline-offset-1 hover:underline"
            >
                {name}
            </m.h1>
        </Link>
    )
}
