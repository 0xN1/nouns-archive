// lib to use notion api

import { Client } from '@notionhq/client'

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

export async function queryDatabase(databaseId) {
    const response = await notion.databases.query({
        database_id: databaseId,
    })
    return response
}

export async function retrieveDatabase(databaseId) {
    const response = await notion.databases.retrieve({
        database_id: databaseId,
    })
    return response
}

export async function getBlock(blockId) {
    const response = await notion.blocks.children.list({
        block_id: blockId,
    })
    return response
}

export async function getBlockChildren(blockId) {
    const response = await notion.blocks.children.list({
        block_id: blockId,
    })
    return response
}

export async function getPage(pageId) {
    const response = await notion.pages.retrieve({
        page_id: pageId,
    })
    return response
}
