import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProposalListView({ proposalDB }) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/notion/db?id=${proposalDB}`)
            const results = await response.json()
            // console.log(typeof results) // check the type of results

            // sort the data by Dates in ascending order
            // results.results.sort((a, b) => {
            //     return (
            //         new Date(a.properties.Date.date.start) -
            //         new Date(b.properties.Date.date.start)
            //     )
            // })

            // sort by proposal number
            results.results.sort((a, b) => {
                return a.properties.No.number - b.properties.No.number
            })

            // filter out category marketing
            // results.results = results.results.filter((item) =>
            //     item.properties.Category.multi_select
            //         .map((item) => item.name)
            //         .includes('Marketing'),
            // )

            setData(results.results)
        }

        fetchData()
    }, [proposalDB])

    return (
        <div className="p-4">
            <h1 className="gap-2 p-4 text-center text-3xl">OnChain Props</h1>
            <div>
                <ul className="grid grid-cols-3 gap-8 p-2">
                    {data.map((item) => (
                        <li
                            key={item.id}
                            className="flex h-64 w-64 flex-col items-center gap-3 rounded-md bg-gray-800 p-8"
                        >
                            {/* {item.id} */}

                            <div className="flex w-full flex-row">
                                <h1 className="text-md flex-1">
                                    Prop #{item.properties.No.number}
                                </h1>
                                <Link
                                    href={`/proposal/${item.properties.No.number}`}
                                >
                                    <span className=" text-md">🔗</span>
                                </Link>
                            </div>
                            <img
                                className="my-4 h-32 w-full rounded-lg object-cover object-top shadow-lg shadow-black"
                                src={
                                    item.properties.Thumbnails.files[0].file.url
                                }
                                // alt={item.properties.Name.title[0].plain_text}
                            />
                            {/* <h2 className="text-xl">
                                {item.properties.Name.title[0].plain_text}
                            </h2> */}
                            {/* USDC:{item.properties.USDC.number} */}
                            {/* <br /> */}
                            {/* <p className="text-md">
                                {
                                    item.properties.Description.rich_text[0]
                                        .plain_text
                                }
                            </p>
                            <br /> */}
                            {/* Category:
                            <ul>
                                {item.properties.Category.multi_select.map(
                                    (item) => (
                                        <li key={item.id}>{item.name}</li>
                                    ),
                                )}
                            </ul> */}
                            {/* Links:
                            <ul>
                                {item.properties.Links.rich_text.map((item) => (
                                    <li key={item.id}>
                                        <a href={item.text.link?.url}>
                                            {item.text.content}
                                        </a>
                                    </li>
                                ))}
                            </ul> */}
                            {/* <br /> */}
                            {/* <ul className="flex flex-col items-center gap-4">
                                {item.properties['End Product'].files.map(
                                    (item) => (
                                        <li key={item.id}>
                                            {item.file.url.includes('.mp4') ? (
                                                <video
                                                    src={item.file.url}
                                                    className="rounded-lg shadow-lg shadow-black"
                                                    alt={item.name}
                                                    controls={true}
                                                />
                                            ) : (
                                                <img
                                                    src={item.file.url}
                                                    className="rounded-lg shadow-lg shadow-black"
                                                    alt={item.name}
                                                />
                                            )}
                                        </li>
                                    ),
                                )}
                            </ul> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
