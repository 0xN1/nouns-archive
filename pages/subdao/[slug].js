import { fixURL, toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import Noggles from '@/components/asset/noggles'
import { useEffect, useRef, useState } from 'react'
import ContestCard from '@/components/card/ContestCard'
import Title from '@/components/page/Title'
import Description from '@/components/page/Description'
import SearchBar from '@/components/page/SearchBar'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import FilterSelectContainer from '@/components/page/FilterSelectContainer'
import FilterSelect from '@/components/page/FilterSelect'
import Separator from '@/components/page/Separator'
import CardWrapper from '@/components/card/CardWrapper'
import generateRSSFeed from '@/lib/generateRSSFeed'
import { BASE_URL } from '@/lib/constants'

const SubDAOContestList = ({ initialData, pageData, raw, dao }) => {
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
            <BackLink url={`/subdao`} name="SubDAOs" />
            <Noggles />
            <Title title={pageData['Project Title']} />

            <Description desc={pageData.Description} link={pageData.Link} />

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
                        parentSlug={toSlug(dao['Project Title'])}
                        grandparentSlug="subdao"
                    />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export default SubDAOContestList

export async function getStaticPaths() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data
        .filter((entry) => {
            return entry['No'] > 0
        })
        .filter((entry) => {
            return entry['DB'] !== undefined
        })

    const paths = filteredData.map((dao) => ({
        params: {
            slug: toSlug(dao['Project Title']),
        },
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data
        .filter((entry) => {
            return entry['No'] > 0
        })
        .filter((entry) => {
            return entry['DB'] !== undefined
        })

    const dao = filteredData.find((d) => toSlug(d['Project Title']) === slug)

    if (!dao) {
        // If no matching dao was found, return a 404 page
        return { notFound: true }
    } else {
        const res = await fetch(
            `https://notion-api.splitbee.io/v1/table/${dao.DB}`,
        )
        const data = await res.json()

        const filteredData = data.filter((entry) => {
            return entry['No'] > 0
        })

        const pageData = data.filter((entry) => {
            return entry['No'] === undefined
        })

        const rssData = filteredData.map((entry) => {
            return {
                id: entry.id,
                title: entry['Project Title'],
                link: `/subdao/${toSlug(dao['Project Title'])}/${toSlug(
                    entry['Project Title'],
                )}`,
                description: entry.Description,
                image: fixURL(entry.Thumbnails?.[0]?.url),
                date: entry.Date ? new Date(entry.Date) : new Date(),
            }
        })

        const baseURL = BASE_URL
        const rssPath = `/subdao/${toSlug(dao['Project Title'])}`

        generateRSSFeed(rssData, baseURL, rssPath)

        return {
            props: {
                initialData: filteredData,
                pageData: pageData[0],
                raw: data,
                dao: dao,
            },
            revalidate: 60,
        }
    }
}
