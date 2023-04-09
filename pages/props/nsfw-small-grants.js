import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'
import { useState, useRef, useEffect } from 'react'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import BaseTemplate from '@/template/BaseTemplate'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import SearchBar from '@/components/page/SearchBar'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import FilterSelect from '@/components/page/FilterSelect'
import NSFWCard from '@/components/card/NSFWCard'
import Separator from '@/components/page/Separator'
import CardWrapper from '@/components/card/CardWrapper'

const DEBUG_MODE = false

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6376cceee4274b26babac3ff3e9f38c9',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['Project Title'] !== ''
    })

    // filter by oldest
    filteredData.sort((a, b) => {
        const dateA = new Date(a.Date)
        const dateB = new Date(b.Date)

        return dateA - dateB
    })

    return {
        props: {
            initialData: filteredData,
        },
        revalidate: 60,
    }
}

export default function NSFWSmallGrants({ initialData }) {
    const [data, setData] = useState(initialData)

    const categorySelectRef = useRef(null)
    const statusSelectRef = useRef(null)
    const searchRef = useRef(null)
    const [scroll, setScroll] = useLocalStorage(`nsfw-scroll`, 0)
    const [category, setCategory] = useLocalStorage(`nsfw-category`, 'all')
    const [status, setStatus] = useLocalStorage(`nsfw-status`, 'all')
    const [search, setSearch] = useLocalStorage(`nsfw-search`, '')

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
                const tempStatus = entry['Status'].toString()

                return (
                    tempTitle.includes(search) ||
                    tempDesc.includes(search) ||
                    tempTeam?.includes(search) ||
                    tempCategory?.includes(search) ||
                    tempStatus.includes(search)
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

    const filterByStatus = (data, stat) => {
        if (stat === 'all') {
            return data
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempStatus = entry.Status.toLowerCase()

                return tempStatus.includes(stat.toLowerCase())
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
        setStatus('all')
        categorySelectRef.current.value = 'all'
        statusSelectRef.current.value = 'all'
    }

    const handleCategory = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByCategory(initialData, filterQuery)
        setData(filteredData)
        setCategory(filterQuery)

        setStatus('all')
        setSearch('')
        statusSelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    const handleStatus = (e) => {
        const statusQuery = e.target.value
        const filteredData = filterByStatus(initialData, statusQuery)
        setData(filteredData)
        setStatus(statusQuery)

        setCategory('all')
        setSearch('')
        categorySelectRef.current.value = 'all'
        searchRef.current.value = ''
    }

    // USEEFFECTS

    useEffect(() => {
        if (category !== 'all') {
            const filteredData = filterByCategory(initialData, category)
            setData(filteredData)
        }

        if (status !== 'all') {
            const filteredData = filterByStatus(initialData, status)
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

        // debounce setStatus to prevent multiple calls
        const debouncedSetStatus = debounce((value) => {
            setStatus(value)
        }, 100)

        debouncedSetStatus(status)
        statusSelectRef.current.value = status

        searchRef.current.value = search
    }, [
        setCategory,
        category,
        setStatus,
        status,
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
    const statuses = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Status)
                .flat()
                .filter((status) => status),
        ),
    )

    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <div className="pt-4"></div>
            <Noggles />
            <Title title="NSFW: Small Grants" />

            <Description
                desc={`NSFW: Nouns Strategic Funding Works run by a group of Nouners to be a "flexible pool of capital" that can be deployed when either the project is time sensitive, the ask is too small for an official proposal, or retroactive funding is merited because the work is already done.`}
                link={`NSFW: Small Grants|https://nouns.center/funding/smallgrants`}
            />

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
                    key="status"
                    defaultOption="all"
                    options={statuses}
                    handler={handleStatus}
                    ref={statusSelectRef}
                    name="Status"
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

            <Separator />

            <CardWrapper>
                {data.map((proposal) => (
                    <NSFWCard proposal={proposal} key={proposal.id} />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}
