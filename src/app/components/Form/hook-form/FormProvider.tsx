"use client"
import { FormProvider, UseFormReturn } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: (e?: React.BaseSyntheticEvent) => void
  className?: string
}

export default function FormWrapper({
  children,
  onSubmit,
  methods,
  className,
}: Props) {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}
