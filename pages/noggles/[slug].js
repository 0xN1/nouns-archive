import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import SearchBar from '@/components/page/SearchBar'
import Separator from '@/components/page/Separator'
import Title from '@/components/page/Title'
import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import { useState, useRef, useEffect } from 'react'
import ContestArtCard from '@/components/card/ContestArtCard'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import FilterSelect from '@/components/page/FilterSelect'
import ImageModal from '@/components/modal/ImageModal'
import Image from 'next/image'
import Stats from '@/components/page/Stats'
import ContestDetails from '@/components/page/ContestDetails'
import CardWrapper from '@/components/card/CardWrapper'

const DEBUG_MODE = false

const NogglesContest = ({ initialData, contest }) => {
    const [data, setData] = useState(initialData)

    const [showImageModal, setShowImageModal] = useState(false)
    const [imageModalURL, setImageModalURL] = useState('')

    const contestSlug = toSlug(contest['Project Title'])

    const categoryRef = useRef(null)
    const searchRef = useRef(null)
    const cc0Ref = useRef(null)

    const [scroll, setScroll] = useLocalStorage(`${contestSlug}-scroll`, 0)
    const [category, setCategory] = useLocalStorage(
        `${contestSlug}-category`,
        'all',
    )
    const [search, setSearch] = useLocalStorage(`${contestSlug}-search`, '')
    const [cc0, setCC0] = useLocalStorage(`${contestSlug}-cc0`, 'all')

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

        if (sortQuery === 'winner') {
            sortedData.sort((a, b) => {
                // If either "No" value is undefined, move to end of array
                if (a['No'] === undefined) {
                    return 1
                } else if (b['No'] === undefined) {
                    return -1
                }

                // Sort based on "No" value
                return a['No'] - b['No']
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
                const tempTitle = entry['Artist'].toLowerCase()

                return tempTitle.includes(search)
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

    const filterByCC0 = (data, cc0) => {
        if (cc0 === 'all') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempCC0 = entry['CC0']?.toLowerCase()
                return tempCC0 === cc0.toLowerCase()
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
        setCC0('all')
        categoryRef.current.value = 'all'
        cc0Ref.current.value = 'no'
    }

    const handleCategory = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByCategory(initialData, filterQuery)
        setData(filteredData)
        setCategory(filterQuery)

        setSearch('')
        setCC0('all')
        searchRef.current.value = ''
        cc0Ref.current.value = 'no'
    }

    const handleCC0 = (e) => {
        const cc0Query = e.target.value
        const filteredData = filterByCC0(initialData, cc0Query)
        setData(filteredData)
        setCC0(cc0Query)

        setSearch('')
        setCategory('all')
        searchRef.current.value = ''
        categoryRef.current.value = 'all'
    }

    // USEEFFECTS

    useEffect(() => {
        if (category !== 'all') {
            const filteredData = filterByCategory(initialData, category)
            setData(filteredData)
        }

        if (search !== '') {
            const filteredData = filterBySearch(initialData, search)
            setData(filteredData)
        }

        if (cc0 !== 'all') {
            const filteredData = filterByCC0(initialData, cc0)
            setData(filteredData)
        }

        // debounce setCategory to prevent multiple calls
        const debouncedSetCategory = debounce((value) => {
            setCategory(value)
        }, 100)

        const debouncedSetCC0 = debounce((value) => {
            setCC0(value)
        }, 100)

        debouncedSetCategory(category)
        debouncedSetCC0(cc0)

        categoryRef.current.value = category
        cc0Ref.current.value = cc0
        searchRef.current.value = search
    }, [setCategory, category, setSearch, search, initialData, setCC0, cc0])

    // Setting up the dynamic select options

    const categories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Category)
                .flat()
                .filter((category) => category),
        ),
    )

    const cc0s = Array.from(
        new Set(initialData.map((entry) => entry['CC0']).filter((cc0) => cc0)),
    )

    return (
        <BaseTemplate>
            <BackLink url="/noggles" name="Noggles" />
            <Noggles />
            <Title title={contest['Project Title']} />

            <ContestDetails contest={contest} />

            <Stats
                data={[
                    { 'Total Contributors': contest['Artists'] },
                    { 'Total Entries': contest['Artworks'] },
                    { 'Total Prize': `${contest['Prize']} ETH` },
                    { Status: contest['Status'] },
                ]}
            />

            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <FilterSelectContainer>
                <FilterSelect
                    key="category"
                    defaultOption="all"
                    options={categories}
                    handler={handleCategory}
                    ref={categoryRef}
                    name="Category"
                />
                <FilterSelect
                    key="cc0"
                    defaultOption="all"
                    options={cc0s}
                    handler={handleCC0}
                    ref={cc0Ref}
                    name="CC0"
                />
                <FilterSelect
                    key="sort"
                    defaultOption="oldest"
                    options={['oldest', 'latest', 'winner']}
                    optionsTitle={{
                        oldest: 'Oldest',
                        latest: 'Latest',
                        winner: 'Winners',
                    }}
                    handler={handleSort}
                    name="Sort"
                />
            </FilterSelectContainer>

            <Separator />

            {DEBUG_MODE && (
                <p className="mx-auto my-8 h-96 w-2/3 overflow-auto whitespace-pre-wrap p-8 text-justify">
                    {JSON.stringify(contest, null, 2)}
                </p>
            )}

            <ImageModal
                isVisible={showImageModal}
                onClose={() => setShowImageModal(false)}
            >
                <Image
                    className="w-full rounded-lg object-cover shadow-lg shadow-gray-600"
                    src={imageModalURL}
                    alt={imageModalURL}
                    width={800}
                    height={400}
                />
            </ImageModal>

            <CardWrapper>
                {data.map((artwork) => (
                    <ContestArtCard
                        key={artwork.id}
                        artwork={artwork}
                        onClick={(a) => {
                            setImageModalURL(a['Storage Link'])
                            setShowImageModal(true)
                        }}
                    />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export default NogglesContest

export async function getStaticPaths() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6c4396c9d9c646799b292e7ff4ef5028',
    )
    const data = await res.json()

    const filteredData = data.filter((contest) => {
        return contest['No'] > 0
    })

    const paths = filteredData.map((contest) => {
        return {
            params: {
                slug: toSlug(contest['Project Title']),
            },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6c4396c9d9c646799b292e7ff4ef5028',
    )
    const data = await res.json()

    const filteredData = data.filter((contest) => {
        return contest['No'] > 0
    })

    const contest = filteredData.find(
        (d) => toSlug(d['Project Title']) === slug,
    )

    if (!contest) {
        return {
            notFound: true,
        }
    }

    const contestURL = contest.DB
        ? `https://notion-api.splitbee.io/v1/table/${contest.DB}`
        : ''

    const contestRes = contestURL ? await fetch(contestURL) : ''
    const contestData = contestRes ? await contestRes.json() : {}

    // filter by winner no
    contestData.sort((a, b) => {
        // If either "No" value is undefined, move to end of array
        if (a['No'] === undefined) {
            return 1
        } else if (b['No'] === undefined) {
            return -1
        }
        // Sort based on "No" value
        return a['No'] - b['No']
    })

    return {
        props: {
            initialData: contestData,
            contest: contest,
        },
        revalidate: 60,
    }
}
