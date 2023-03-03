import { getPage } from '@/lib/notion'

export default async (req, res) => {
    const pageId = req.query.id
    const data = await getPage(pageId)

    if (!data) {
        res.status(500).json({
            message: 'An error occurred while querying the database.',
        })
        return
    }

    // If the data is retrieved successfully, return it as JSON
    res.status(200).json(data)
}
