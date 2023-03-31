import React, { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import useIsMobile from '@/hooks/useIsMobile'

const Stats = ({ data }) => {
    const isMobile = useIsMobile()

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`my-8 mx-4 grid grid-cols-2 justify-items-center gap-4 rounded-3xl border-2 border-black bg-white p-4 px-12 text-center md:gap-4 lg:grid-cols-4`}
        >
            {data.map((item, index) => (
                <div key={index} className="flex flex-col gap-0 sm:gap-2">
                    {Object.entries(item).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <span className="text-md">
                                {key === 'Total Contributors' && isMobile
                                    ? 'Total Cont.'
                                    : key}
                            </span>
                            <span className="text-lg font-bold">{value}</span>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </m.div>
    )
}

export default Stats
