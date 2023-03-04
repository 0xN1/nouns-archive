import { useState, useEffect } from 'react'

export default function DatabaseView({ databaseId }) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/notion/db?id=${databaseId}`)
            const results = await response.json()
            console.log(typeof results) // check the type of results

            // sort the data by Dates in ascending order
            results.results.sort((a, b) => {
                return (
                    new Date(a.properties.Dates.date.start) -
                    new Date(b.properties.Dates.date.start)
                )
            })

            setData(results.results)
        }

        fetchData()
    }, [databaseId])

    return (
        <div className="p-4">
            <h1 className="text-center text-3xl">DatabaseView</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <br />
                        {item.properties.Artist.title[0].plain_text}
                        <br />
                        {item.properties["Artist's Twitter"].url}
                        <br />
                        <img src={item.properties['Storage Link'].url} />
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticPaths() {
    // Generate an array of paths based on your databases
    const paths = [
        { params: { databaseId: 'databaseId1' } },
        { params: { databaseId: 'databaseId2' } },
        // Add more paths as needed
    ]

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { databaseId } = params
    return { props: { databaseId } }
}
