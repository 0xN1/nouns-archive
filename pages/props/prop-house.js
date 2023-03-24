import { useRef, useState, useEffect } from 'react'
import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'
import Title from '@/components/page/Title'
import Description from '@/components/page/Description'
import SearchBar from '@/components/page/SearchBar'
import BaseTemplate from '@/template/BaseTemplate'
import useLocalStorage from '@/hooks/useLocalStorage'
import PropHouseCard from '@/components/card/PropHouseCard'
import FilterSelect from '@/components/page/FilterSelect'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import useScrollPosition from '@/hooks/useScrollPosition'

const DEBUG_MODE = false

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
    const [scroll, setScroll] = useLocalStorage(`prop-house-scroll`, 0)
    const [category, setCategory] = useLocalStorage(
        `prop-house-category`,
        'all',
    )
    const [round, setRound] = useLocalStorage(`prop-house-round`, 'all')
    const [house, setHouse] = useLocalStorage(`prop-house-house`, 'all')
    const [search, setSearch] = useLocalStorage(`prop-house-search`, '')

    // SCROLL POSITION
    useScrollPosition(setScroll, scroll)

    function debounce(func, delay) {
        let timeoutId
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args)
                timeoutId = null
            }, delay)
        }
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

    // FILTERS

    const filterBySearch = (data, search) => {
        if (search === '') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempTitle = entry['Project Title'].toLowerCase()
                const tempDesc = entry.Description.toLowerCase()
                const tempTeam = entry['Team']?.toLowerCase()
                const tempCategory = entry['Category']
                const tempRound = entry['Round'].toString()

                return (
                    tempTitle.includes(search) ||
                    tempDesc.includes(search) ||
                    tempTeam?.includes(search) ||
                    tempCategory?.includes(search) ||
                    tempRound.includes(search)
                )
            })
            return filteredData
        }
    }

    const filterByCategory = (data, category) => {
        if (category === 'all') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempCategory = entry.Category.map((item) =>
                    item.toLowerCase(),
                )
                return tempCategory.includes(category)
            })
            return filteredData
        }
    }

    const filterByRound = (data, round) => {
        if (round === 'all') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempRound = Array.isArray(entry.Round)
                    ? entry.Round.map((item) => item.toString().toLowerCase())
                    : [entry.Round.toString().toLowerCase()]

                return tempRound.includes(round.toString().toLowerCase())
            })
            return filteredData
        }
    }

    const filterByHouse = (data, house) => {
        if (house === 'all') {
            return data
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempHouse = entry.House.toLowerCase()

                return tempHouse.includes(house.toLowerCase())
            })

            return filteredData
        }
    }

    // HANDLERS

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = filterBySearch(initialData, searchQuery)
        setData(filteredData)
        setSearch(searchQuery)

        setCategory('all')
        setRound('all')
        setHouse('all')
        categorySelectRef.current.value = 'all'
        roundSelectRef.current.value = 'all'
        houseSelectRef.current.value = 'all'
    }

    const handleCategory = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByCategory(initialData, filterQuery)
        setData(filteredData)
        setCategory(filterQuery)

        setRound('all')
        setHouse('all')
        setSearch('')
        roundSelectRef.current.value = 'all'
        houseSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    const handleRound = (e) => {
        const roundQuery = e.target.value
        const filteredData = filterByRound(initialData, roundQuery)
        setData(filteredData)
        setRound(roundQuery)

        setCategory('all')
        setHouse('all')
        setSearch('')
        categorySelectRef.current.value = 'all'
        houseSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    const handleHouse = (e) => {
        const houseQuery = e.target.value
        const filteredData = filterByHouse(initialData, houseQuery)
        setData(filteredData)
        setHouse(houseQuery)

        setCategory('all')
        setRound('all')
        setSearch('')
        categorySelectRef.current.value = 'all'
        roundSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    // USEEFFECTS

    useEffect(() => {
        if (category !== 'all') {
            const filteredData = filterByCategory(initialData, category)
            setData(filteredData)
        }

        if (round !== 'all') {
            const filteredData = filterByRound(initialData, round)
            setData(filteredData)
        }

        if (house !== 'all') {
            const filteredData = filterByHouse(initialData, house)
            setData(filteredData)
        }

        if (search !== '') {
            const filteredData = filterBySearch(initialData, search)
            setData(filteredData)
        }

        // debounce setCategory to prevent multiple calls
        const debouncedSetCategory = debounce((value) => {
            setCategory(value)
        }, 100)

        debouncedSetCategory(category)
        categorySelectRef.current.value = category

        // debounce setRound to prevent multiple calls
        const debouncedSetRound = debounce((value) => {
            setRound(value)
        }, 100)

        debouncedSetRound(round)
        roundSelectRef.current.value = round

        // debounce setHouse to prevent multiple calls
        const debouncedSetHouse = debounce((value) => {
            setHouse(value)
        }, 100)

        debouncedSetHouse(house)
        houseSelectRef.current.value = house

        searchRef.current.value = search
    }, [
        setCategory,
        category,
        setRound,
        round,
        setHouse,
        house,
        setSearch,
        search,
        initialData,
    ])

    // Setting up the dynamic select options

    const categories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Category)
                .flat()
                .filter((category) => category),
        ),
    )
    const rounds = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Round)
                .flat()
                .filter((round) => round),
        ),
    )
    const houses = Array.from(
        new Set(
            initialData
                .map((entry) => entry.House)
                .flat()
                .filter((house) => house),
        ),
    )

    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <Noggles />
            <Title title="Prop House" />
            <Description desc="Prop House KIV" />

            {DEBUG_MODE && (
                <p className="mx-auto my-8 h-96 w-2/3 overflow-auto whitespace-pre-wrap p-8 text-justify">
                    {JSON.stringify(data, null, 2)}
                </p>
            )}
            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <FilterSelectContainer>
                <FilterSelect
                    key="category"
                    defaultOption="all"
                    options={categories}
                    handler={handleCategory}
                    ref={categorySelectRef}
                    name="Category"
                />
                <FilterSelect
                    key="round"
                    defaultOption="all"
                    options={rounds}
                    handler={handleRound}
                    ref={roundSelectRef}
                    name="Round"
                />
                <FilterSelect
                    key="house"
                    defaultOption="all"
                    options={houses}
                    handler={handleHouse}
                    ref={houseSelectRef}
                    name="House"
                />
                <FilterSelect
                    key="sort"
                    defaultOption="oldest"
                    options={['oldest', 'latest', 'atoz', 'ztoa']}
                    optionsTitle={{
                        oldest: 'Oldest',
                        latest: 'Latest',
                        atoz: 'A-Z',
                        ztoa: 'Z-A',
                    }}
                    handler={handleSort}
                    name="Sort"
                />
            </FilterSelectContainer>

            <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((proposal) => (
                        <PropHouseCard proposal={proposal} key={proposal.id} />
                    ))}
                </div>
            </div>

            {DEBUG_MODE && (
                <div className="fixed top-10 right-10 flex flex-col ">
                    <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xl">
                        {scroll.toFixed(2)}
                    </span>
                    <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xl">
                        {category}
                    </span>
                    <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xl">
                        {round}
                    </span>
                    <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xl">
                        {house}
                    </span>
                    <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xl">
                        {search ? search : 'none'}
                    </span>
                </div>
            )}
        </BaseTemplate>
    )
}
