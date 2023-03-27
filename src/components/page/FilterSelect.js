import { forwardRef } from 'react'
import { motion as m } from 'framer-motion'

const FilterSelect = forwardRef(
    ({ handler, options, defaultOption, name, optionsTitle }, ref) => {
        return (
            <m.select
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
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
            </m.select>
        )
    },
)

FilterSelect.displayName = 'FilterSelect'

export default FilterSelect
