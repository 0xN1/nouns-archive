import { useState, useRef, useEffect } from 'react'
import PropSingleCard from '@/components/card/PropSingleCard'
import Noggles from '@/components/asset/noggles'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import Title from '@/components/page/Title'
import SearchBar from '@/components/page/SearchBar'
import Description from '@/components/page/Description'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import FilterSelect from '@/components/page/FilterSelect'
import Separator from '@/components/page/Separator'
import CardWrapper from '@/components/card/CardWrapper'

const DEBUG_MODE = false

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

export default function OnChain({ initialData }) {
    const [data, setData] = useState(initialData)

    const categorySelectRef = useRef(null)
    const statusSelectRef = useRef(null)
    const searchRef = useRef(null)
    const votingRef = useRef(null)
    const [scroll, setScroll] = useLocalStorage(`onchain-scroll`, 0)
    const [category, setCategory] = useLocalStorage(`onchain-category`, 'all')
    const [status, setStatus] = useLocalStorage(`onchain-status`, 'all')
    const [search, setSearch] = useLocalStorage(`onchain-search`, '')
    const [voting, setVoting] = useLocalStorage(`onchain-voting`, 'all')

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
                const tempStatus = entry['Status']?.toString()
                const tempNo = entry['No']?.toString()

                return (
                    tempTitle.includes(search) ||
                    tempDesc.includes(search) ||
                    tempTeam?.includes(search) ||
                    tempCategory?.includes(search) ||
                    tempStatus?.includes(search) ||
                    tempNo?.includes(search)
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
                const tempStatus = entry['Status']?.toLowerCase()

                return tempStatus?.includes(stat.toLowerCase())
            })

            return filteredData
        }
    }

    const filterByVoting = (data, voting) => {
        if (voting === 'all') {
            return data
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempVoting = entry['Voting']?.toLowerCase()

                return tempVoting?.includes(voting.toLowerCase())
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
        setVoting('all')
        categorySelectRef.current.value = 'all'
        statusSelectRef.current.value = 'all'
        votingRef.current.value = 'all'
    }

    const handleCategory = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByCategory(initialData, filterQuery)
        setData(filteredData)
        setCategory(filterQuery)

        setStatus('all')
        setSearch('')
        setVoting('all')
        statusSelectRef.current.value = 'all'
        searchRef.current.value = ''
        votingRef.current.value = 'all'
    }

    const handleStatus = (e) => {
        const statusQuery = e.target.value
        const filteredData = filterByStatus(initialData, statusQuery)
        setData(filteredData)
        setStatus(statusQuery)

        setCategory('all')
        setSearch('')
        setVoting('all')
        categorySelectRef.current.value = 'all'
        searchRef.current.value = ''
        votingRef.current.value = 'all'
    }

    const handleVoting = (e) => {
        const votingQuery = e.target.value
        const filteredData = filterByVoting(initialData, votingQuery)
        setData(filteredData)
        setVoting(votingQuery)

        setCategory('all')
        setSearch('')
        setStatus('all')
        categorySelectRef.current.value = 'all'
        searchRef.current.value = ''
        statusSelectRef.current.value = 'all'
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

        if (voting !== 'all') {
            const filteredData = filterByVoting(initialData, voting)
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

        const debouncedSetVoting = debounce((value) => {
            setVoting(value)
        }, 100)
        votingRef.current.value = voting

        searchRef.current.value = search
    }, [
        setCategory,
        category,
        setStatus,
        status,
        setSearch,
        search,
        setVoting,
        voting,
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
    const votings = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Voting)
                .flat()
                .filter((voting) => voting),
        ),
    )

    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <Noggles />
            <Title title="On-chain Proposals" />
            <Description
                desc="Nouns govern Nouns DAO. Nouns can vote on proposals or delegate their vote to a third party. A minimum of 2 Nouns is required to submit proposals."
                link={`NounsDAO Governance|https://nouns.wtf/vote`}
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
                    key="voting"
                    defaultOption="all"
                    options={votings}
                    handler={handleVoting}
                    ref={votingRef}
                    name="Voting"
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
                    <PropSingleCard key={proposal.id} proposal={proposal} />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}
