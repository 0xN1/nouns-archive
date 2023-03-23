import Noggles from '@/components/asset/noggles'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'
import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'

import { useState, useRef } from 'react'
import ContestArtCard from '@/components/card/ContestArtCard'
import SearchBar from '@/components/page/SearchBar'

import ImageModal from '@/components/modal/ImageModal'
import Image from 'next/image'

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
                    id: toSlug(contest['Project Title']),
                },
            }))

            return contestPaths
        }),
    )

    const flattenedPaths = paths.flat()

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

    const contest = filteredData2.find((c) => toSlug(c['Project Title']) === id)

    if (!contest) {
        // If no matching contest was found, return a 404 page
        return { notFound: true }
    }

    const contestUrl = contest['ID DB']
        ? `https://notion-api.splitbee.io/v1/table/${contest['ID DB']}`
        : ''
    const res3 = contestUrl ? await fetch(contestUrl) : ''
    const data3 = res3 ? await res3.json() : {}

    // sort based on No, if No is not available, sort by title
    data3.sort((a, b) => {
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
            initialData: data3,
            contest: contest,
            dao: dao,
        },
        revalidate: 60,
    }
}

export default function Contest({ initialData, contest, dao }) {
    const [data, setData] = useState(initialData)
    const searchRef = useRef(null)
    const categoryRef = useRef(null)
    const winnerRef = useRef(null)

    const [showImageModal, setShowImageModal] = useState(false)
    const [imageModalURL, setImageModalURL] = useState('')

    // handle search base on id / title
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempArtist = entry['Artist']?.toLowerCase()

            return tempArtist?.includes(searchQuery)
        })

        setData(filteredData)
        categoryRef.current.value = 'all'
        if (winnerRef.current) {
            winnerRef.current.value = 'all'
        }
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

    const categories = Array.from(
        new Set(
            initialData
                .map((entry) => entry.Categories)
                .flat()
                .filter((category) => category),
        ),
    )

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
        searchRef.current.value = ''
        if (winnerRef.current) {
            winnerRef.current.value = 'all'
        }
    }

    const handleFilterWinner = (e) => {
        const filterQuery = e.target.value

        if (filterQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                return entry['No'] > 0
            })

            setData(filteredData)
        }

        searchRef.current.value = ''
        categoryRef.current.value = 'all'
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
            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <div className="flex w-1/2 flex-row items-center justify-center gap-4">
                <select
                    className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                    onChange={handleFilter}
                    ref={categoryRef}
                >
                    <option value="all">Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>

                {
                    // check if any of the artwork has a winner number
                    initialData.some((artwork) => artwork['No'] > 0) && (
                        <select
                            className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                            onChange={handleFilterWinner}
                            ref={winnerRef}
                        >
                            <option value="all">Everyone</option>
                            <option value="winner">Winners</option>
                        </select>
                    )
                }

                <select
                    className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                    onChange={handleSort}
                >
                    <option value="oldest">Oldest</option>
                    <option value="latest">Recent</option>
                    <option value="atoz">Artist - A to Z</option>
                    <option value="ztoa">Artist - Z to A</option>
                </select>
            </div>
            <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

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

            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                </div>
            </div>
        </BaseTemplate>
    )
}
