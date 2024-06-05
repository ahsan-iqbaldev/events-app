import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
// import { getEventsByUser } from '@/lib/actions/event.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
// import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
// import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

//   const orders = await getOrdersByUser({ userId, page: ordersPage})

//   const orderedEvents = orders?.data.map((order: any) => order.event) || [];
//   const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  const organizedEvents = {
    data: [
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
    ],
    totalPages: 1,
  };

  const orderedEvents = {
    data: [
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
    ],
    totalPages: 1,
  };

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={orderedEvents?.data}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orderedEvents?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage