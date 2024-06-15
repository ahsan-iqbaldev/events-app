"use client";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getMyEvents } from "@/store/slices/eventSlice";
import { getMyOrders } from "@/store/slices/orderSlice";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { ThunkDispatch } from "@reduxjs/toolkit";
import moment from "moment";
// import { auth } from '@clerk/nextjs'
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { myEvents } = useSelector((state: any) => state.events);
  const { myTickets, orderStats } = useSelector((state: any) => state.orders);
  const { User } = useSelector((state: any) => state.auth);
  // const { orderStats } = useSelector((state: any) => state.orders);
  const userId = User?.userId;
  const UserId = userId;

  console.log(myTickets, "myTicketsmyTickets");

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

      <section className="wrapper2 my-8">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Price</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {myTickets && myTickets.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Yuu canot find any tickets
                </td>
              </tr>
            ) : (
              <>
                {myTickets &&
                  myTickets?.map((row: any) => (
                    <tr
                      key={row.id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row.id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row?.ticket?.title}
                      </td>
                      <td className="min-w-[150px] py-4">
                        {formatPrice(row?.price)}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {moment
                          .unix(row?.createdAt?.seconds)
                          .format("DD-MMM-YYYY hh:mm A")}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className=" text-primary-500"
                        >
                          Download Ticket
                        </Button>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
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
