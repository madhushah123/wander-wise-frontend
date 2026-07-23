import { Button } from '@/components/ui/button';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ItineraryDetails = () => {

    const { tripId } = useParams();
    const navigate = useNavigate();

  return (
    <div className='mt-40'>
        <Button onClick={()=>{navigate(`/itinerary/add/${tripId}`)}}>Add Itinerary</Button>
    </div>
  )
}

export default ItineraryDetails