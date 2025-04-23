import React from 'react'
import { useController } from 'react-hook-form'

type Props = {
  label?: string
  name: string
  control: any
  required?: boolean
  options: Array<{ value: string; label: string }>
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  other?: any
}

const SelectDropdown = ({
  label,
  name,
  control,
  required,
  options,
  size,
  fullWidth,
  other,
}: Props) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: options[0].value,
  })

  return (
    <div>
      {label && (
        <label className="block text-md font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <select
          ref={ref}
          required={required}
          {...other}
          {...inputProps}
          className={`${fullWidth ? 'w-full' : ''} ${
            size == 'small'
              ? 'px-3 py-3 text-sm'
              : size == 'large'
              ? 'px-5 py-5 text-lg'
              : 'px-4 py-3 text-md'
          } block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  )
}

export default SelectDropdown
