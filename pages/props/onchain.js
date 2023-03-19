import { useState } from 'react'
import PropSingleCard from '@/components/card/PropSingleCard'
import Noggles from '@/components/asset/noggles'

export default function OnChain({ initialData }) {
    const [data, setData] = useState(initialData)

    // handle search base on project title and description
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title'].toLowerCase()
            const tempDesc = entry.Description.toLowerCase()
            const tempTeam = entry['Team']?.toLowerCase()

            console.log(tempTeam)

            return (
                tempTitle.includes(searchQuery) ||
                tempDesc.includes(searchQuery) ||
                tempTeam?.includes(searchQuery)
            )
        })

        setData(filteredData)
    }

    // handle sort by project alphabetical / date
    const handleSort = (e) => {
        const sortQuery = e.target.value
        const sortedData = [...data]

        if (sortQuery === 'atoz') {
            sortedData.sort((a, b) => {
                const titleA = a['Project Title'].toLowerCase()
                const titleB = b['Project Title'].toLowerCase()

                if (titleA < titleB) {
                    return -1
                }
                if (titleA > titleB) {
                    return 1
                }
                return 0
            })
        }

        if (sortQuery === 'ztoa') {
            sortedData.sort((a, b) => {
                const titleA = a['Project Title'].toLowerCase()
                const titleB = b['Project Title'].toLowerCase()

                if (titleA < titleB) {
                    return 1
                }
                if (titleA > titleB) {
                    return -1
                }
                return 0
            })
        }

        if (sortQuery === 'latest') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.Date)
                const dateB = new Date(b.Date)

                return dateB - dateA
            })
        }

        if (sortQuery === 'oldest') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.Date)
                const dateB = new Date(b.Date)

                return dateA - dateB
            })
        }

        setData(sortedData)
    }

    // handle filter by category
    const handleFilter = (e) => {
        const filterQuery = e.target.value

        if (filterQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempCategory = entry.Category.map((item) =>
                    item.toLowerCase(),
                )

                return tempCategory.includes(filterQuery)
            })

            setData(filteredData)
        }
    }

    // console.log(data)

    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-[#FBF9F5] p-4 pt-32 font-inter">
            <Noggles />
            <h1 className="p-8 text-center font-gibson text-7xl uppercase">
                Onchain Proposals
            </h1>
            <div className="flex w-1/2 flex-col items-center gap-4">
                <input
                    className="mx-2 w-full rounded-xl border-2 border-black bg-transparent p-2"
                    type="text"
                    placeholder=" Search here"
                    onChange={handleSearch}
                />

                <div className="flex w-full flex-row items-center justify-center gap-4">
                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleFilter}
                    >
                        <option value="all">All</option>
                        <option value="art">Art</option>
                        <option value="tech">Tech</option>
                        <option value="marketing">Marketing</option>
                        <option value="charity">Charity</option>
                        <option value="physical">Physical</option>
                        <option value="operational">Operational</option>
                        <option value="investment">Investment</option>
                        <option value="staking">Staking</option>
                        <option value="community">Community</option>
                        <option value="other">Other</option>
                    </select>

                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleSort}
                    >
                        <option value="oldest">Oldest</option>
                        <option value="latest">Recent</option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>
            </div>

            <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

            <ul className="grid-rows grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((proposal) => (
                    <PropSingleCard key={proposal.id} proposal={proposal} />
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/1330bf9251614e64ae3de2b26b522051',
    )
    const initialData = await res.json()

    // sort the data by oldest
    initialData.sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date)
    })

    return {
        props: {
            initialData,
        },
        revalidate: 60,
    }
}
