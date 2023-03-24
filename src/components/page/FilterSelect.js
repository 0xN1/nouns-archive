import { forwardRef } from 'react'

const FilterSelect = forwardRef(
    ({ handler, options, defaultOption, name, optionsTitle }, ref) => {
        return (
            <select
                className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                onChange={handler}
                ref={ref}
            >
                <option value={defaultOption}>{name}</option>
                {options.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                        {optionsTitle ? optionsTitle[option] : option}
                    </option>
                ))}
            </select>
        )
    },
)

FilterSelect.displayName = 'FilterSelect'

export default FilterSelect
