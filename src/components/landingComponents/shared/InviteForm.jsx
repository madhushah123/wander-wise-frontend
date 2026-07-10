import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  message: z.string().optional(),
})

const InviteForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        const result = formSchema.safeParse(data)
        if (!result.success) {
            console.error(result.error.format())
            return
        }
        console.log('Form submitted successfully:', result.data)
    }

    return (
        <div>
            <form id="invite-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}

                <textarea
                    id="message"
                    placeholder="Message"
                    {...register('message')}
                />
                {errors.message && <p>{errors.message.message}</p>}

                <button type="submit">Invite</button>
            </form>
        </div>
    )
}

export default InviteForm
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const email = emailInput.value
            const name = nameInput.value
            const message = messageInput.value

            const result = formSchema.safeParse({ email, name, message })

            if (!result.success) {
                console.error(result.error.format())
                return
            }

            console.log('Form submitted successfully:', result.data)
        }),
     []
  return (
    <div>InviteForm</div>
  )


export default InviteForm