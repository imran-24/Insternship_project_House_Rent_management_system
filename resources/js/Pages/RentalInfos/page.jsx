import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RentalInfosClient from './components/client';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListingsBasedOnYears } from '@/actions/get-red-flag';

const RentalInfoPage = ({rental_infos, divisions, districts, upazilas}) => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const currentParams = Object.fromEntries(searchParams.entries());
  const [customListings, setCustomListings] = useState(rental_infos)

  useEffect(()=>{
    if ('Expired-Within' in currentParams) {
      const expiredWithinValue = currentParams['Expired-Within'];
      const response = getListingsBasedOnYears(rental_infos, Number(expiredWithinValue))
      setCustomListings(response)
    }
  },[])


  const customDivisions = divisions.map(item => ({
    value: item.id.toString(),
    label: item.name,
    title: 'division',
  }))
  const customDistricts = districts.map(item => ({
    value: item.id.toString(),
    division_id: item.division_id.toString(),
    label: item.name,
    title: 'district',
  }))
  const customUpazilas = upazilas.map(item => ({
    value: item.id.toString(),
    district_id: item.district_id.toString(),
    label: item.name,
    title: 'upazila',
  }))  

  return (
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />
        <div className='flex-col'>
          <div className='flex-1 space-y-4 overflow-y-hidden '>
            <RentalInfosClient data={customListings} divisions={customDivisions} districts={customDistricts} upazilas={customUpazilas}/>
          </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default RentalInfoPage