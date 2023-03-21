import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/page/BackLink'
import BaseTemplate from '@/template/BaseTemplate'

export default function NSFWSmallGrants() {
    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <div className="pt-4"></div>
            <Noggles />
            <h1 className="p-8 font-gibson text-7xl uppercase">
                NSFW: Small Grants
            </h1>
        </BaseTemplate>
    )
}
