import React, { useEffect, useState } from 'react'

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
        <div
            className={`my-8 grid grid-cols-${numCols} justify-items-center gap-8 rounded-3xl border-2 border-black bg-white p-4 px-12 text-center`}
        >
            {data.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                    {Object.entries(item).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <span className="text-md">{key}</span>
                            <span className="text-lg font-bold">{value}</span>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Stats
