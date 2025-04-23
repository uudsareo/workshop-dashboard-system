import React from 'react'
import { useController } from 'react-hook-form'

type Props = {
  label?: string
  name: string
  type: string
  control: any
  placeholder?: string
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  other?: any
}

const InputTextarea = ({
  label,
  type,
  name,
  control,
  required,
  placeholder,
  size,
  fullWidth,
  disabled,
  other,
}: Props) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: '',
  })

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-md font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <textarea
          rows={4}
          id={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          required={required}
          disabled={disabled}
          {...other}
          {...inputProps}
          className={`${fullWidth ? 'w-full' : ''} ${
            size == 'small'
              ? 'px-3 py-2 text-sm'
              : size == 'large'
              ? 'px-5 py-5 text-lg'
              : 'px-4 py-3 text-md'
          } block appearance-none rounded-md ${
            type != 'file' ? 'border border-gray-300 shadow-sm' : ''
          } placeholder-gray-400  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  )
}

export default InputTextarea
