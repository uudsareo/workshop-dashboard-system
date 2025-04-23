import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  className?: string
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
  className,
}: Props) {
  return (
    <Form {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
