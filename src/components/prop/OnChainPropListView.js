import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

const OnChainPropListView = ({ proposalDB }) => {
    const [filters, setFilters] = useState([])

    const fetcher = (url) =>
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // sort by proposal number
                data.results.sort((a, b) => {
                    return a.properties.No.number - b.properties.No.number
                })

                // apply filters
                if (filters.length > 0) {
                    data.results = data.results.filter((item) =>
                        item.properties.Category.multi_select
                            .map((item) => item.name)
                            .some((name) => filters.includes(name)),
                    )
                }

                return data.results
            })

    const { data, error, isLoading, mutate } = useSWR(
        `/api/notion/db?id=${proposalDB}`,
        fetcher,
    )

    const handleFilterChange = (filter) => {
        setFilters(filter)
        mutate()
    }

    useEffect(() => {
        mutate()
    }, [filters])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error...</div>
    }

    return (
        <div className="p-4">
            {/* {JSON.stringify(data)} */}

            <h1 className="gap-2 p-4 text-center text-3xl">OnChain Props</h1>

            <div>
                <div className="flex justify-center gap-2 p-4">
                    <button onClick={() => handleFilterChange([])}>All</button>
                    <button onClick={() => handleFilterChange(['Marketing'])}>
                        Marketing
                    </button>
                    <button onClick={() => handleFilterChange(['Tech'])}>
                        Tech
                    </button>
                    <button onClick={() => handleFilterChange(['Art'])}>
                        Art
                    </button>
                    <button onClick={() => handleFilterChange(['Community'])}>
                        Community
                    </button>
                </div>

                <ul className="grid grid-cols-3 gap-8 p-2">
                    {data.map((item) => (
                        <li
                            key={item.id}
                            className="flex h-64 w-64 flex-col items-center gap-3 rounded-md bg-gray-800 p-8"
                        >
                            <div className="flex w-full flex-row">
                                <h1 className="text-md flex-1">
                                    Prop #{item.properties.No.number}
                                </h1>
                                <Link
                                    href={`/proposal/${item.properties.No.number}`}
                                >
                                    <span className=" text-md">🔗</span>
                                </Link>
                            </div>
                            <img
                                className="my-4 h-32 w-full rounded-lg object-cover object-top shadow-lg shadow-black"
                                src={
                                    item.properties.Thumbnails.files[0]?.file
                                        .url
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default OnChainPropListView
