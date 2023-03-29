import React, { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'

const Stats = ({ data }) => {
    const [numCols, setNumCols] = useState(4)

    useEffect(() => {
        if (data.length === 2) {
            setNumCols(2)
        } else if (data.length === 3) {
            setNumCols(3)
        } else if (data.length === 4) {
            setNumCols(4)
        }
    }, [data])

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`my-8 mx-8 grid grid-cols-2 justify-items-center gap-4 rounded-3xl  border-2 border-black bg-white p-4 px-12 text-center md:gap-8 lg:grid-cols-4`}
        >
            {data.map((item, index) => (
                <div key={index} className="flex flex-col gap-0 md:gap-4">
                    {Object.entries(item).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <span className="text-md">{key}</span>
                            <span className="text-lg font-bold">{value}</span>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </m.div>
    )
}

export default Stats
