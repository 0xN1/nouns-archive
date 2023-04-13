import { useEffect, useState, useRef } from 'react'
import PropsCard from '@/components/card/PropsCard'
import Noggles from '@/components/asset/noggles'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import SearchBar from '@/components/page/SearchBar'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import CardWrapper from '@/components/card/CardWrapper'
import generateRSSFeed from '@/lib/generateRSSFeed'
import { BASE_URL } from '@/lib/constants'

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6b8443b4ebbc45e881f52cc09d4e1d10',
    )

    const data = await res.json()

    const Links = {
        'Prop House': '/props/prop-house',
        'NSFW : Small Grants': '/props/nsfw-small-grants',
        'On-Chain Proposals': '/props/onchain',
    }

    const rssData = data.map((entry) => {
        return {
            id: entry.id,
            title: entry['Project Title'],
            link: `${Links[entry['Project Title']]}`,
            description: entry.Description,
            image: entry.Thumbnails?.[0]?.url,
            date: new Date(),
        }
    })

    const baseURL = BASE_URL
    const rssPath = '/props'

    generateRSSFeed(rssData, baseURL, rssPath)

    return {
        props: {
            initialData: data,
        },
        revalidate: 60,
    }
}

const Props = ({ initialData }) => {
    const [data, setData] = useState(initialData)

    const searchRef = useRef(null)
    const [scroll, setScroll] = useLocalStorage(`props-scroll`, 0)
    const [search, setSearch] = useLocalStorage(`props-search`, '')

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
            <Title title="Funded Proposals" />
            <Description
                desc="Looking to get funding for a Nounish project? There are many ways to go about doing so! Through NSFW : Small Grants, Prop House & On-Chain Proposals."
                link={`Get Funded|https://nouns.center/funding\nDiscourse|https://discourse.nouns.wtf`}
            />
            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <CardWrapper>
                {data?.map((prop) => (
                    <PropsCard key={prop.id} prop={prop} />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export default Props
