import { getBlock, getBlockChildren } from '@/lib/notion'

export default async (req, res) => {
    if (req.query.children === 'true') {
        const blockId = req.query.id
        const data = await getBlockChildren(blockId)

        if (!data) {
            res.status(500).json({
                message: 'An error occurred while querying the database.',
            })
            return
        }

        // If the data is retrieved successfully, return it as JSON
        res.status(200).json(data)
        return
    } else {
        const blockId = req.query.id
        const data = await getBlock(blockId)
        if (!data) {
            res.status(500).json({
                message: 'An error occurred while querying the database.',
            })
            return
        }

        // If the data is retrieved successfully, return it as JSON
        res.status(200).json(data)
    }
}
