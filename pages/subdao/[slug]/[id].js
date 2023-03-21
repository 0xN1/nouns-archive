import Noggles from '@/components/asset/noggles'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'

import { useState } from 'react'
import ContestArtCard from '@/components/card/ContestArtCard'
import SearchBar from '@/components/page/SearchBar'

export async function getStaticPaths() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['No'] > 0
    })

    const paths = await Promise.all(
        filteredData.map(async (dao) => {
            const res2 = await fetch(
                `https://notion-api.splitbee.io/v1/table/${dao.DB}`,
            )
            const data2 = await res2.json()

            const filteredData2 = data2.filter((entry) => {
                return entry['No'] > 0
            })

            const contestPaths = filteredData2.map((contest) => ({
                params: {
                    slug: toSlug(dao['Project Title']),
                    id: contest['ID DB'],
                },
            }))

            return contestPaths
        }),
    )

    const flattenedPaths = paths.flat()
    // console.log('flattenedPaths =>', flattenedPaths)

    return {
        paths: flattenedPaths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug, id } = params

    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )

    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['No'] > 0
    })

    const dao = filteredData.find((d) => toSlug(d['Project Title']) === slug)

    if (!dao) {
        // If no matching dao was found, return a 404 page
        return { notFound: true }
    }

    const daoUrl = dao.DB
        ? `https://notion-api.splitbee.io/v1/table/${dao.DB}`
        : ''
    const res2 = daoUrl ? await fetch(daoUrl) : ''
    const data2 = res2 ? await res2.json() : {}

    const filteredData2 = data2.filter((entry) => {
        return entry['No'] > 0
    })

    const contest = filteredData2.find((c) => c['ID DB'] === id)

    // console.log('contest =>', contest)

    if (!contest) {
        // If no matching contest was found, return a 404 page
        return { notFound: true }
    }

    const contestUrl = contest['ID DB']
        ? `https://notion-api.splitbee.io/v1/table/${contest['ID DB']}`
        : ''
    const res3 = contestUrl ? await fetch(contestUrl) : ''
    const data3 = res3 ? await res3.json() : {}

    // sort by oldest to newest
    data3.sort((a, b) => {
        return new Date(a.Dates) - new Date(b.Dates)
    })

    return {
        props: {
            initialData: data3,
            contest: contest,
            dao: dao,
        },
        revalidate: 60,
    }
}

export default function Contest({ initialData, contest, dao }) {
    const [data, setData] = useState(initialData)

    // handle search base on id / title
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempArtist = entry['Artist']?.toLowerCase()

            return tempArtist?.includes(searchQuery)
        })

        setData(filteredData)
    }

    const handleSort = (e) => {
        const sortQuery = e.target.value
        const sortedData = [...data]

        if (sortQuery === 'atoz') {
            sortedData.sort((a, b) => {
                const titleA = a['Artist'].toLowerCase()
                const titleB = b['Artist'].toLowerCase()

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
                const titleA = a['Artist'].toLowerCase()
                const titleB = b['Artist'].toLowerCase()

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
                const dateA = new Date(a.Dates)
                const dateB = new Date(b.Dates)

                return dateB - dateA
            })
        }

        if (sortQuery === 'oldest') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.Dates)
                const dateB = new Date(b.Dates)

                return dateA - dateB
            })
        }

        setData(sortedData)
    }

    const handleFilter = (e) => {
        const filterQuery = e.target.value

        if (filterQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempCategory = entry.Categories.map((item) =>
                    item.toLowerCase(),
                )

                return tempCategory.includes(filterQuery)
            })

            setData(filteredData)
        }
    }

    return (
        <BaseTemplate>
            <BackLink
                url={`/subdao/${toSlug(dao['Project Title'])}`}
                name={`Back to ${dao['Project Title']}`}
            />
            <Noggles />

            <Title title={contest['Project Title']} />

            <Description desc={contest['Project Title']} />

            {/* <p className="mx-auto w-2/3 whitespace-pre-wrap p-8 text-justify">
                {JSON.stringify(dao, null, 2)}
            </p> */}

            <SearchBar handleSearch={handleSearch} />

            <div className="flex w-1/2 flex-row items-center justify-center gap-4">
                <select
                    className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                    onChange={handleSort}
                >
                    <option value="oldest">Oldest</option>
                    <option value="latest">Recent</option>
                    <option value="atoz">Artist - A to Z</option>
                    <option value="ztoa">Artist - Z to A</option>
                </select>

                <select
                    className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                    onChange={handleFilter}
                >
                    <option value="all">Category</option>
                    <option value="2d illustrations">2D</option>
                    <option value="3d illustrations">3D</option>
                    <option value="sketches">Sketches</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="video">Video</option>
                    <option value="cc0">CC0</option>
                </select>
            </div>

            <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((artwork) => (
                        <ContestArtCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            </div>
        </BaseTemplate>
    )
}
