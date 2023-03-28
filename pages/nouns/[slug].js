import Noggles from '@/components/asset/noggles'
import CardWrapper from '@/components/card/CardWrapper'
import ContestCard from '@/components/card/ContestCard'
import BackLink from '@/components/page/BackLink'
import Description from '@/components/page/Description'
import FilterSelect from '@/components/page/FilterSelect'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import SearchBar from '@/components/page/SearchBar'
import Separator from '@/components/page/Separator'
import Title from '@/components/page/Title'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import { useState, useRef, useEffect } from 'react'

const DEBUG_MODE = false

export default function NounsList({ initialData, pageData, nouns }) {
    const [data, setData] = useState(initialData)

    const parentSlug = toSlug(pageData['Project Title'])

    const categorySelectRef = useRef(null)
    const searchRef = useRef(null)
    const typeRef = useRef(null)

    const [scroll, setScroll] = useLocalStorage(`${parentSlug}-scroll`, 0)
    const [category, setCategory] = useLocalStorage(
        `${parentSlug}-category`,
        'all',
    )
    const [search, setSearch] = useLocalStorage(`${parentSlug}-search`, '')
    const [type, setType] = useLocalStorage(`${parentSlug}-type`, 'all')

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

    // FILTERS

    const filterBySearch = (data, search) => {
        if (search === '') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempTitle = entry['Project Title'].toLowerCase()
                const tempCategory = entry['Category']

                return (
                    tempTitle.includes(search) || tempCategory?.includes(search)
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

    const filterByType = (data, type) => {
        if (type === 'all') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempType = entry.Type.toLowerCase()
                return tempType.includes(type)
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
        categorySelectRef.current.value = 'all'
        setType('all')
        typeRef.current.value = 'all'
    }

    const handleCategory = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByCategory(initialData, filterQuery)
        setData(filteredData)
        setCategory(filterQuery)

        setSearch('')
        searchRef.current.value = ''
        setType('all')
        typeRef.current.value = 'all'
    }

    const handleType = (e) => {
        const filterQuery = e.target.value
        const filteredData = filterByType(initialData, filterQuery)
        setData(filteredData)
        setType(filterQuery)

        setSearch('')
        searchRef.current.value = ''
        setCategory('all')
        categorySelectRef.current.value = 'all'
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

        if (type !== 'all') {
            const filteredData = filterByType(initialData, type)
            setData(filteredData)
        }

        // debounce setCategory to prevent multiple calls
        const debouncedSetCategory = debounce((value) => {
            setCategory(value)
        }, 100)

        debouncedSetCategory(category)
        categorySelectRef.current.value = category

        const debouncedSetType = debounce((value) => {
            setType(value)
        }, 100)

        debouncedSetType(type)
        typeRef.current.value = type

        searchRef.current.value = search
    }, [setCategory, category, setSearch, search, initialData, setType, type])

    // Setting up the dynamic select options

    const categories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Category)
                .flat()
                .filter((category) => category),
        ),
    )

    const types = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Type)
                .flat()
                .filter((type) => type),
        ),
    )

    return (
        <BaseTemplate>
            <BackLink url={'/nouns'} name={'Nouns'} />
            <Noggles />
            <Title title={pageData['Project Title']} />
            <Description desc={pageData.Description} link={pageData.Link} />

            {DEBUG_MODE && (
                <p className="mx-auto my-8 h-96 w-2/3 overflow-auto whitespace-pre-wrap p-8 text-justify">
                    {JSON.stringify(data[0].DB, null, 2)}
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
                    key="type"
                    defaultOption="all"
                    options={types}
                    handler={handleType}
                    ref={typeRef}
                    name="Type"
                />
            </FilterSelectContainer>

            <Separator />

            <CardWrapper>
                {data.map((contest) => (
                    <ContestCard
                        contest={contest}
                        key={contest.id}
                        parentSlug={toSlug(nouns['Project Title'])}
                        grandparentSlug="nouns"
                    />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export async function getStaticPaths() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/c6b83e5671e340f58b07083a03b3de13',
    )
    const data = await res.json()

    const filteredData = data
        .filter((entry) => {
            return entry['No'] > 0
        })
        .filter((entry) => {
            return entry['DB'] !== undefined
        })

    const paths = filteredData.map((nouns) => ({
        params: { slug: toSlug(nouns['Project Title']) },
    }))
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/c6b83e5671e340f58b07083a03b3de13',
    )
    const data = await res.json()

    const filteredData = data
        .filter((entry) => {
            return entry['No'] > 0
        })
        .filter((entry) => {
            return entry['DB'] !== undefined
        })

    const nouns = filteredData.find((nouns) => {
        return toSlug(nouns['Project Title']) === slug
    })

    if (!nouns) {
        return {
            notFound: true,
        }
    } else {
        const res = await fetch(
            `https://notion-api.splitbee.io/v1/table/${nouns.DB}`,
        )
        const data = await res.json()

        const filteredData = data.filter((entry) => {
            return entry['No'] > 0
        })

        const pageData = data.filter((entry) => {
            return entry['No'] === undefined
        })

        return {
            props: {
                initialData: filteredData,
                pageData: pageData[0],
                raw: data,
                nouns: nouns,
            },
            revalidate: 60,
        }
    }
}
