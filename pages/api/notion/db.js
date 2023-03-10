import { queryDatabase } from '@/lib/notion'

const db = async (req, res) => {
    const dbId = req.query.id
    const data = await queryDatabase(dbId)

    if (!data) {
        res.status(500).json({
            message: 'An error occurred while querying the database.',
        })
        return
    }

    // If the data is retrieved successfully, return it as JSON
    return res.status(200).json(data)
}

export default db
