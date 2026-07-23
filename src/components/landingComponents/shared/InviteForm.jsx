import api from '@/api/axios'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
    collaboratorEmails: z.array(
        z.string().email("Invalid email address").min(5, "Must be at least 5 characters long"),
    ).min(1, "At least one email is required")
})

const InviteForm = ({ tripId }) => {

    const form = useForm ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaboratorEmails: [""]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "collaboratorEmail"
    })

    const onSubmit = async (data) => {
        console.log(data)
        try{
            const response = await api.post(`/trips/${tripId}/invite`, data);

            if(response.status === 200){
                toast.success("Invites sent successfully")
                form.reset()
            }else{
                toast.error( response.message || "Error sending invitation");
            }
            }catch(error){
                console.log(error)
                toast.error(error.message ||"Some error occured while sending invitation")
            }
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader>
                <CardTitle>Invite Collaborators</CardTitle>
                <CardDescription>Enter the email addresses of the people you want to invite.</CardDescription>
                <CardAction>
                    <Button type="button" onClick={() => append("")} variant='outline' size='icon'>
                        <Plus />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {
                    fields.map((field, index) => {
                        return (
                            <Controller
                            key={index}
                            name={`collaboratorEmails.${index}`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Collaborator Email {index +1}</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        placeholder="Enter email address"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                        )}/>
                                 )
                    })
                }
            </CardContent>
            <CardFooter>
                <Button className='w-full' type='submit'>Send Invites</Button>
            </CardFooter>
        </Card>
    </form>
  )
}

export default InviteForm