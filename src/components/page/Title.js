import { motion as m } from 'framer-motion'

export default function Title({ title }) {
    return (
        <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 text-center font-gibson text-4xl uppercase sm:p-8 sm:text-7xl"
        >
            {title}
        </m.h1>
    )
}
