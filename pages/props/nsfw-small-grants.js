import BlockList from '@/template/BlockList'

import Noggles from '@/components/asset/noggles'

export default function NSFWSmallGrants() {
    return (
        <BlockList>
            <div className="pt-4"></div>
            <Noggles />
            <h1 className="p-8 font-gibson text-7xl uppercase">
                NSFW: Small Grants
            </h1>
        </BlockList>
    )
}
