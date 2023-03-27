import { motion as m } from 'framer-motion'

export default function CardWrapper({ children, className }) {
    return (
        <m.div
            transition={{ duration: 0.45 }}
            initial={{ opacity: 0.2, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 ${className}`}
        >
            <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {children}
            </div>
        </m.div>
    )
}
