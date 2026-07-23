import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod"
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import useApi from '@/hooks/useApi';
import api from '@/api/axios';


const formSchema = z.object({
    name: z.string().min(3, "Name of item must be atleast 3 characters")
})

const BaggageDetails = () => {

  const [dependency, setDependency] = React.useState(0);

    const { tripId } = useParams();

    const { data, loading, error} = useApi (`/${tripId}/baggages`,{}, [dependency]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    if (loading) {
        return <Loader2 className='animate-spin mt-40' />
    }

    const onSubmit = async (formData)=>{
        console.log(formData)

        try {
            const response = await api.post(`/${tripId}/baggages`, formData);

            if(response.status == 201){
                toast.success("Baggage created successfully");
                form.reset();
                setDependency(dependency + 1);
            }else{
                toast.error( response.message || "Error creating baggage");
            }
        } catch (error) {
            console.log(error);
            toast.error( error.message || "Some error occurred");
        }
    }

     const onDelete = async (id)=>{

        try {
            const response = await api.delete(`/${tripId}/baggages/${id}`);

            if(response.status == 200){
                toast.success("Baggage deleted successfully");
                form.reset();
                setDependency(dependency + 1);
            }else{
                toast.error( response.message || "Error deleting baggage");
            }
        } catch (error) {
            console.log(error);
            toast.error( error.message || "Some error occured");
        }
      }


     const onCheck = async (id, status, name)=>{

        try {
            const response = await api.patch(`/${tripId}/baggages/${id}`,{completed: !status, name: name});

            if(response.status == 200){
                if(response.data.data.completed){
                    toast.success("Baggage packed successfully");
                }else{
                    toast.success("Baggage unpacked");
                }
                form.reset();
                setDependency(dependency + 1);
            }else{
                toast.error( response.message || "Error updating baggage");
            }
        } catch (error) {
            console.log(error);
            toast.error( error.message || "Some error occurred");
        }
}     

      const onEdit = async (id, formdata)=>{

        try {
            const response = await api.patch(`/${tripId}/baggages/${id}`, formdata);

            if(response.status == 200){
                toast.success("Baggage edited successfully");
                form.reset();
                setDependency(dependency + 1);
            }else{
                toast.error( response.message || "Error deleting baggage");
            }
        } catch (error) {
            console.log(error);
            toast.error( error.message || "Some error occurred");
        }
      }
    


    return (
        <section className='mt-20 px-20 py-12'>
            <Card>
                <CardHeader>
                    <CardTitle>Baggage List</CardTitle>
                    <CardDescription>All the items you need for this trip</CardDescription>
                    <CardAction>
                        <Dialog>
                            <DialogTrigger >Open</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Baggage</DialogTitle>
                                    <DialogDescription>
                                        Enter the name of item you want to take to trip.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Enter item name</FieldLabel>
                                                <Input
                                                    {...field}
                                                    id={field.name}
                                                    type="text"
                                                    placeholder="Medicines"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />

                                    <Button type="submit" className={"mt-4 w-full"}>Submit</Button>
                                </form>

                            </DialogContent>
                        </Dialog>
                    </CardAction>
                </CardHeader>

                <CardContent className={"grid grid-cols-3 gap-4"}>
                    {
                        data.length == 0 ?
                            <div>No baggages for this trip. Add baggage with the help of button above.</div>
                            :
                            data.map((item) => {
                              return (
                                <div>
                                    <div key={item._id} className={` ${item.completed ? "bg-green-200" : ""} flex items-center justify-between border border-gray-100 p-4 rounded-md`}>
                                        <Checkbox onClick={()=>{onCheck(item._id, item.completed, item.name)}} 
                                        checked={item.completed} />
                        
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Button size='icon' variant='outline'>
                                            <Edit />
                                        </Button>
                                        <Button size='icon' variant='outline'
                                         onClick={()=>{onDelete(item._id)}}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                              )
                            })
                    }
                </CardContent>
            </Card>
        </section>
    )
}

export default BaggageDetails