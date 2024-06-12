"use client";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getMyEvents } from "@/store/slices/eventSlice";
import { getMyOrders } from "@/store/slices/orderSlice";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { ThunkDispatch } from "@reduxjs/toolkit";
// import { auth } from '@clerk/nextjs'
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { myEvents } = useSelector((state: any) => state.events);
  const { myTickets } = useSelector((state: any) => state.orders);
  const { User } = useSelector((state: any) => state.auth);
  const userId = User?.userId;
  const UserId = userId;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  //   const orders = await getOrdersByUser({ userId, page: ordersPage})

  //   const orderedEvents = orders?.data.map((order: any) => order.event) || [];
  //   const organizedEvents = await getEventsByUser({ userId, page: eventsPage })


  useEffect(() => {
    dispatch(getMyEvents({ userId }));
    dispatch(getMyOrders({ UserId }));
  }, []);

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={myTickets}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={1}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Tickets Organized
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Ticket</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={myEvents}
          emptyTitle="No Tickets have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
