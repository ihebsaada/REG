'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { sendEmail } from '@/lib/send-email'
import { useDictionary } from '@/lib/useDictionary'
import { ContactFormSchema } from '@/types/zod'

interface FormContactProps {
  className?: string
  formClassName?: string
}

export function FormContact({
  className = '',
  formClassName = '',
}: FormContactProps) {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
  })
  const { dict } = useDictionary()

  async function onSubmit(data: z.infer<typeof ContactFormSchema>) {
    try {
      await sendEmail(data)
      toast({
        title: dict.contact.toast.successTitle,
        description: (
          <p>
            {dict.contact.toast.successDescription}{' '}
            <a
              href="mailto:contact@s-reg.tn"
              className="text-blue-500 hover:underline"
            >
              contact@s-reg.tn
            </a>
          </p>
        ),
      })
    } catch (error) {
      toast({
        title: dict.contact.toast.errorTitle,
        description: error.message,
      })
    } finally {
      form.reset({
        fullName: '',
        email: '',
        message: '',
      })
    }
  }

  return (
    <div
      className={`${className} space-y-8 sm:min-w-[340px] md:min-w-[400px] lg:min-w-[500px]`}
    >
      <div>
        <h3 className="text-lg font-medium text-muted-foreground">
          {dict.contact.title}
        </h3>
        <p className="text-sm text-muted-foreground">{dict.contact.subtitle}</p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${formClassName} space-y-6`}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.fields.fullName}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.contact.placeholders.fullName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.fields.email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.contact.placeholders.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.fields.message}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={dict.contact.placeholders.message}
                    className="resize"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              {form.formState.isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {dict.contact.button.loading}
                </>
              ) : (
                dict.contact.button.send
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormContact
