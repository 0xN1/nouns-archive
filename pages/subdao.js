import { useState, useRef, useEffect } from 'react'
import { fixURL, toSlug } from '@/lib/utils'

import BaseTemplate from '@/template/BaseTemplate'
import Noggles from '@/components/asset/noggles'
import DAOCard from '@/components/card/DAOCard'
import BackLink from '@/components/page/BackLink'
import SearchBar from '@/components/page/SearchBar'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import CardWrapper from '@/components/card/CardWrapper'
import Separator from '@/components/page/Separator'
import generateRSSFeed from '@/lib/generateRSSFeed'
import { BASE_URL } from '@/lib/constants'

export default function SubDAOList({ initialData, pageData, raw }) {
    const [data, setData] = useState(initialData)
    const parentSlug = toSlug(pageData['Project Title'])
    const searchRef = useRef(null)
    const [scroll, setScroll] = useLocalStorage(`${parentSlug}-scroll`, 0)
    const [search, setSearch] = useLocalStorage(`${parentSlug}-search`, '')

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

    const filterBySearch = (data, search) => {
        if (search === '') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempTitle = entry['Project Title'].toLowerCase()

                return tempTitle.includes(search)
            })
            return filteredData
        }
    }

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = filterBySearch(initialData, searchQuery)
        setData(filteredData)
        setSearch(searchQuery)
    }

    useEffect(() => {
        if (search !== '') {
            const filteredData = filterBySearch(initialData, search)
            setData(filteredData)
        }
        searchRef.current.value = search
    }, [setSearch, search, initialData])

    return (
        <BaseTemplate>
            <BackLink url="/" name="Home" />
            <Noggles />
            <Title title="SubDAOs" />
            <Description desc={pageData.Description} link={pageData.Link} />
            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <Separator />
            <CardWrapper>
                {data.map((dao) => (
                    <DAOCard dao={dao} key={dao.No} />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export async function getStaticProps() {
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

    const pageData = data.filter((entry) => {
        return entry['No'] === undefined
    })

    const rssData = filteredData.map((entry) => {
        return {
            id: entry.id,
            title: entry['Project Title'],
            link: `/subdao/${toSlug(entry['Project Title'])}`,
            description: entry.Description,
            image: fixURL(entry.Thumbnails?.[0]?.url),
            date: entry.Date ? new Date(entry.Date) : new Date(),
        }
    })

    const baseURL = BASE_URL
    const rssPath = '/subdao'

    generateRSSFeed(rssData, baseURL, rssPath)

    return {
        props: {
            initialData: filteredData,
            pageData: pageData[0],
            raw: data,
        },
        revalidate: 60,
    }
}
