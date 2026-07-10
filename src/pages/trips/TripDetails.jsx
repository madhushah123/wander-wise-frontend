import { Button } from '@/components/ui/button';
import React from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle , Card} from '@/components/ui/card';
import { Input }from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import useApi from '@/hooks/useApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import api from '@/api/axios';

const TripDetails = () => {

  const [dependency, setDependency] = React.useState(0);


  const { tripId } = useParams();
  console.log(tripId);

  const { error, loading, data } = useApi(`/trips/${tripId}`,{}, [dependency]);

  if (loading) {
    return <Loader2 className="animate-spin" />
  }

  if( error){
    return <div>Error: {error.message}</div>
  }

  const expenseSubmit = async() => {
    const name = document.getElementById("name");
    const amount = document.getElementById("amount");

    const expenseData = {
      name: name.value,
      amount: Number(amount.value),
      date: new Date().toISOString()
    }

    try{
      const response = await api.patch(`/trips/${tripId}/expenses`, expenseData)
      console.log(response);

      if(response.status === 200){
        toast.success("Expense added successfully");
        name.value = "";
        amount.value = "";

        setDependency(dependency + 1);
      }else{
        toast.error( response.message || "Failed to add expense");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add expense");
      console.log(error);
    }
  }


  return (
    <section className="px-20 py-4 mt-20 grid grid-cols-4 gap-4">

        <div className="col-span-3 border border-gray-300 rounded-lg p-4 h-80">

        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add your expense</CardTitle>
              <CardDescription>Enter the details of your expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Bus Ticket" /> 
              </div>
               <div>
                <Label htmlFor="amount">Amount</Label>
                <Input type="number" id="amount" placeholder="100" /> 
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={expenseSubmit} >
                Add Expense
              </Button>
            </CardFooter>
          </Card>
        </div>
    </section> 

  )
}

export default TripDetails