import useApi from '@/hooks/useApi'
import { Ellipsis, Loader2 } from 'lucide-react';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Trip = () => {

  const { data, error, loading } = useApi("/trips");

  console.log(data);

  if (loading) {
    return <Loader2 />
  }

  return (
    <div className="mt-20 p-20">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Your Trips</CardTitle>
          <CardDescription>Trips that you are part of.</CardDescription>

          <CardAction>
            <a href="/trips/add">
              <Button>Add Trip</Button>
            </a>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              data.length == 0
                ?
                <div>No Trips available to show</div>
                :
                data.map((trip) => {
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle>View your trips</CardTitle>
                        <CardDescription>
                          {formatDate(trip.startDate)}
                        </CardDescription>
                        <CardAction>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={<Button variant="outline" />}
                            >
                                <Ellipsis />
                              Open
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                <DropdownMenuItem><a href={`/trips/${trip._id}`}>View</a></DropdownMenuItem>
                                <DropdownMenuItem><a href={`/trips/${trip._id}/edit`}>Edit</a></DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Budget: <span>{trip.budget.total}</span>
                        </p>
                        <p>
                          Spent: <span>{trip.budget.spent}</span>
                        </p>
                      </CardContent>
                      <CardFooter>
                        {trip.destinations.map((destination) => {
                          return (
                            <span className="bg-amber-200 px-2 py-1 rounded-sm text-sm">
                              {destination}
                            </span>
                          );
                        })}
                      </CardFooter>
                    </Card>
                  );
                })
            }
          </div>
        </CardContent>

        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Trip