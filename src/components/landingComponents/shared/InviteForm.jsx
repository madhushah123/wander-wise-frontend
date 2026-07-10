import { Button } from '@/components/ui/button'
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React from 'react'
import * as z from 'zod'

const formSchema = z.object({
    collaboratorEmail: z.array(
        z.string().email("Invalid email address").min(5, "Must be at least 5 characters long"),
    ).min(1, "At least one email is required")
})

const InviteForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaboratorEmail: [""]
        }
    })

    const onSubmit = async (data) => {
        console.log(data)
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader>
                <CardTitle>Invite Collaborators</CardTitle>
                <CardDescription>Enter the email addresses of the people you want to invite.</CardDescription>
                <CardAction>
                    <Button variant='outline' size='icon'>
                        <Plus />
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    </form>
  )
}

export default InviteForm