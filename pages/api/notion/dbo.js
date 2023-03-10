import { retrieveDatabase } from '@/lib/notion'

const dbo = async (req, res) => {
    const dbId = req.query.id
    const data = await retrieveDatabase(dbId)

    if (!data) {
        res.status(500).json({
            message: 'An error occurred while retrieving the database.',
        })
        return
    }

    // If the data is retrieved successfully, return it as JSON
    return res.status(200).json(data)
}

export default dbo
