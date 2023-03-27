import { motion as m } from 'framer-motion'

export default function Separator() {
    return (
        <m.span
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"
        ></m.span>
    )
}
