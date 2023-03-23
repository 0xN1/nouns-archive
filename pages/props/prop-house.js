import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import BaseTemplate from '@/template/BaseTemplate'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, PersonIcon } from '@/components/svg'
import { formatDate, toSlug } from '@/lib/utils'
import { useRef, useState } from 'react'
import SearchBar from '@/components/page/SearchBar'

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/67079226a64548ca9d3ffeb7fe092bc0',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['Project Title'] !== ''
    })

    return {
        props: {
            initialData: filteredData,
        },
    }
}

export default function PropHouse({ initialData }) {
    const [data, setData] = useState(initialData)
    const categorySelectRef = useRef(null)
    const roundSelectRef = useRef(null)
    const houseSelectRef = useRef(null)
    const searchRef = useRef(null)

    // handle search base on project title and description
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title'].toLowerCase()
            const tempDesc = entry.Description.toLowerCase()
            const tempTeam = entry['Team']?.toLowerCase()
            const tempCategory = entry['Category']
            const tempRound = entry['Round'].toString()

            return (
                tempTitle.includes(searchQuery) ||
                tempDesc.includes(searchQuery) ||
                tempTeam?.includes(searchQuery) ||
                tempCategory?.includes(searchQuery) ||
                tempRound.includes(searchQuery)
            )
        })

        setData(filteredData)

        roundSelectRef.current.value = 'all'
        categorySelectRef.current.value = 'all'
    }

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

        roundSelectRef.current.value = 'all'
        houseSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    const rounds = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Round)
                .flat()
                .filter((round) => round),
        ),
    )

    // handle filter by round
    const handleRound = (e) => {
        const roundQuery = e.target.value

        if (roundQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempRound = Array.isArray(entry.Round)
                    ? entry.Round.map((item) => item.toString().toLowerCase())
                    : [entry.Round.toString().toLowerCase()]

                return tempRound.includes(roundQuery.toString().toLowerCase())
            })

            setData(filteredData)
        }

        categorySelectRef.current.value = 'all'
        houseSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    const houses = Array.from(
        new Set(
            initialData
                .map((entry) => entry.House)
                .flat()
                .filter((house) => house),
        ),
    )

    // handle filter by house
    const handleHouse = (e) => {
        const houseQuery = e.target.value

        if (houseQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempHouse = entry.House.toLowerCase()

                return tempHouse.includes(houseQuery.toLowerCase())
            })

            setData(filteredData)
        }

        categorySelectRef.current.value = 'all'
        roundSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <Noggles />
            <Title title="Prop House" />
            <Description desc="Prop House KIV" />
            {/* <p className="mx-auto my-8 h-96 w-2/3 overflow-auto whitespace-pre-wrap p-8 text-justify">
                {JSON.stringify(data, null, 2)}
            </p> */}
            <div className="flex w-full flex-col items-center gap-2">
                <SearchBar handleSearch={handleSearch} ref={searchRef} />

                <div className="flex w-1/2 flex-row items-center justify-center gap-4">
                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleFilter}
                        ref={categorySelectRef}
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
                        onChange={handleRound}
                        ref={roundSelectRef}
                    >
                        <option value="all">Round</option>
                        {rounds.map((round) => (
                            <option key={round} value={round}>
                                {round}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleHouse}
                        ref={houseSelectRef}
                    >
                        <option value="all">House</option>
                        {houses.map((house) => (
                            <option key={house} value={house}>
                                {house}
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

            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((proposal) => (
                        <div
                            className="transition-all duration-200 hover:-translate-y-2"
                            key={proposal.id}
                        >
                            <div
                                className="relative h-[410px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] hover:shadow-gray-300"
                                key={proposal.id}
                            >
                                <Link
                                    href={`/props/prop-house/${toSlug(
                                        proposal['Project Title'],
                                    )}`}
                                    key={proposal.id}
                                >
                                    <Image
                                        className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                                        src={
                                            proposal.Thumbnails?.[0].url
                                                ? proposal.Thumbnails?.[0].url
                                                : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                                        }
                                        alt={proposal.Thumbnails?.[0].name}
                                        width={300}
                                        height={236}
                                    />
                                </Link>

                                <h1 className="h-12 overflow-hidden break-words px-5 py-4 text-xl font-medium">
                                    {proposal['Project Title']?.length > 40 ? (
                                        <>
                                            {proposal['Project Title']?.slice(
                                                0,
                                                37,
                                            )}{' '}
                                            ...
                                        </>
                                    ) : (
                                        <>{proposal['Project Title']}</>
                                    )}
                                </h1>
                                <div className="px-5 py-1 ">
                                    <div className="flex flex-row gap-2">
                                        <PersonIcon />
                                        <p className="h-6 overflow-hidden break-all text-sm">
                                            {proposal['Team']
                                                ?.split('\n')
                                                .map((member) => (
                                                    <span
                                                        className="pr-2 leading-normal"
                                                        key={
                                                            member.split('|')[0]
                                                        }
                                                    >
                                                        {member.split('|')[0]}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                    <p className="flex flex-row gap-2 text-sm">
                                        <CalendarIcon />
                                        {formatDate(proposal.Date)}
                                    </p>
                                </div>

                                <div className="flex w-96 flex-row gap-1 overflow-clip px-4 py-3">
                                    {proposal.Category?.map((category) => (
                                        <div
                                            key={category}
                                            className="flex h-8 flex-row items-center justify-center rounded-full border-2 border-black bg-transparent px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#FFBD12]"
                                        >
                                            {category}
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute top-2 right-2 rounded-full border-2 border-black bg-[#FBF9F5] px-4 py-2 font-bold hover:bg-[#FFBD12]">
                                    {proposal.Round}
                                </div>

                                {/* <div className="absolute bottom-4 left-6">
                                    <p className=" text-lg">Nouns Prop #{proposal.No}</p>
                                    <p className="text-sm">Date: {proposal.Date}</p>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <h1 className="p-8 font-gibson text-7xl uppercase">Prop House</h1> */}
        </BaseTemplate>
    )
}
