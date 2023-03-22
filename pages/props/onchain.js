import { useState } from 'react'
import PropSingleCard from '@/components/card/PropSingleCard'
import Noggles from '@/components/asset/noggles'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import Title from '@/components/page/Title'
import SearchBar from '@/components/page/SearchBar'
import Description from '@/components/page/Description'

export default function OnChain({ initialData }) {
    const [data, setData] = useState(initialData)

    // handle search base on project title and description
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title'].toLowerCase()
            const tempDesc = entry.Description.toLowerCase()
            const tempTeam = entry['Team']?.toLowerCase()
            const tempCategory = entry['Category']
            const tempNumber = entry.No.toString()

            console.log(tempCategory)

            return (
                tempTitle.includes(searchQuery) ||
                tempDesc.includes(searchQuery) ||
                tempTeam?.includes(searchQuery) ||
                tempCategory?.includes(searchQuery) ||
                tempNumber.includes(searchQuery)
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

    const categories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Category)
                .flat()
                .filter((category) => category),
        ),
    )

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

    const statusCategories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Status)
                .flat()
                .filter((category) => category),
        ),
    )

    const handleStatusFilter = (e) => {
        const filterQuery = e.target.value

        if (filterQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempStatus = entry.Status?.toLowerCase()

                return tempStatus === filterQuery
            })

            setData(filteredData)
        }
    }

    // console.log(data)

    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <Noggles />
            <Title title="On-chain Proposals" />
            <Description
                desc="Nouns govern Nouns DAO. Nouns can vote on proposals or delegate their vote to a third party. A minimum of 2 Nouns is required to submit proposals."
                link={`NounsDAO Governance|https://nouns.wtf/vote`}
            />
            <div className="flex w-full flex-col items-center gap-2">
                <SearchBar handleSearch={handleSearch} />

                <div className="flex w-1/2 flex-row items-center justify-center gap-4">
                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleFilter}
                    >
                        <option value="all">Category</option>
                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category.toLowerCase()}
                            >
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleStatusFilter}
                    >
                        <option value="all">Status</option>
                        {statusCategories.map((status) => (
                            <option key={status} value={status.toLowerCase()}>
                                {status}
                            </option>
                        ))}
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
        </BaseTemplate>
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
