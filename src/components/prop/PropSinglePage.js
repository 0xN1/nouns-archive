import { useState, useEffect } from 'react'

export default function PropSinglePage({ propId }) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const propPageID = await fetch(`/api/getProposalID?id=${propId}`)
            const id = await propPageID.json()
            const response = await fetch(`/api/notion/page?id=${id}`)
            const results = await response.json()

            setData(results)
        }

        fetchData()
    }, [propId])

    return (
        <div className="p-4">
            {data.properties && (
                <div>
                    {/* {JSON.stringify(data.properties)} */}
                    {/* <h1 className="p-4">
                        {data.properties.Name.title[0].plain_text}
                    </h1> */}
                    <img
                        className="rounded-lg object-cover"
                        src={data.properties.Thumbnails.files[0].file.url}
                        alt={data.properties.No.number}
                    />
                    {/* <p className="p-4 text-center">
                        {data.properties.Description.rich_text[0].plain_text}
                    </p>
                    <ul className="flex flex-col items-center gap-4">
                        {data.properties['End Product'].files.map((item) => (
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
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    )
}
