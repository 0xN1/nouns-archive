import Noggles from '@/components/asset/noggles'
import BackLink from '@/components/BackLink'
import BaseTemplate from '@/template/BaseTemplate'

export default function PropHouse() {
    return (
        <BaseTemplate>
            <BackLink url="/props" name="Funded Proposals" />
            <div className="pt-4"></div>
            <Noggles />
            <h1 className="p-8 font-gibson text-7xl uppercase">Prop House</h1>
        </BaseTemplate>
    )
}
