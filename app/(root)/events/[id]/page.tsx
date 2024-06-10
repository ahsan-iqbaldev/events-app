"use client";
import CheckoutButton from "@/components/shared/CheckoutButton";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCategoryEvents, getEventDetails } from "@/store/slices/eventSlice";
import { useParams } from "next/navigation";
import moment from "moment";
import Collection from "@/components/shared/Collection";

const EventDetails = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { id }: any = useParams();
  const { eventDetail, events } = useSelector((state: any) => state.events);
  console.log(eventDetail, "eventDetail");
  const category = eventDetail?.eventDetail?.categoryId;

  useEffect(() => {
    dispatch(getCategoryEvents({ category }));
    dispatch(getEventDetails({ id, onSuccess: () => {} }));
  }, [dispatch, id, category]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-20">
        <div className="flex justify-center">
          <div className=" grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
            <img
              src={eventDetail?.eventDetail?.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-full min-h-[300px] object-cover object-center"
            />
            <div className="flex w-full flex-col gap-8 p-5 md:p-10">
              <div className="flex flex-col gap-6">
                <h2 className="h2-bold">{eventDetail?.eventDetail?.title}</h2>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                      {eventDetail?.eventDetail?.isFree
                        ? "FREE"
                        : `$${eventDetail?.eventDetail?.price}`}
                    </p>
                    <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                      {eventDetail?.eventDetail?.categoryId}
                    </p>
                  </div>

                  <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                    by{" "}
                    <span className="text-primary-500">
                      @{eventDetail?.organizer?.userName}
                    </span>
                  </p>
                </div>
              </div>

              <CheckoutButton event={eventDetail?.eventDetail} />

              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="calendar"
                    width={32}
                    height={32}
                  />
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                    <p>
                      {moment
                        .unix(eventDetail?.eventDetail?.startDateTime?.seconds)
                        .format("DD-MMM-YYYY hh:mm A")}{" "}
                      &nbsp;/ &nbsp;
                      {moment
                        .unix(eventDetail?.eventDetail?.startEndTime?.seconds)
                        .format("DD-MMM-YYYY hh:mm A")}
                    </p>
                  </div>
                </div>

                <div className="p-regular-20 flex items-center gap-3">
                  <Image
                    src="/assets/icons/location.svg"
                    alt="location"
                    width={32}
                    height={32}
                  />
                  <p className="p-medium-16 lg:p-regular-20">
                    {eventDetail?.eventDetail?.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-600">
                  What About this Event:
                </p>
                <p className="p-medium-16 lg:p-regular-18">
                  {eventDetail?.eventDetail?.description}
                </p>
                <a
                  href={eventDetail?.eventDetail?.url}
                  target="_blank"
                  className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer"
                >
                  {eventDetail?.eventDetail?.url}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <section className="wrapper overflow-x-auto mt-10">
            <table className="w-full border-collapse border-t">
              <thead>
                <tr className="p-medium-14 border-b text-grey-500">
                  <th className="min-w-[250px] py-3 text-left">Order ID</th>
                  <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                    Event Title
                  </th>
                  <th className="min-w-[150px] py-3 text-left">Buyer</th>
                  <th className="min-w-[100px] py-3 text-left">Created</th>
                  <th className="min-w-[100px] py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="p-regular-14 lg:p-regular-16 border-b "
                  style={{ boxSizing: "border-box" }}
                >
                  <td className="min-w-[250px] py-4 text-primary-500">
                    809380918381
                  </td>
                  <td className="min-w-[200px] flex-1 py-4 pr-4">
                    Ahsan Iqbal
                  </td>
                  <td className="min-w-[150px] py-4">
                    Hamza
                  </td>
                  <td className="min-w-[100px] py-4">
                    0309810
                  </td>
                  <td className="min-w-[100px] py-4 text-right">
                    03912093
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Tickets</h2>

        <Collection
          data={events}
          emptyTitle="No Tickets Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={1}
          totalPages={1}
        />
      </section>
    </>
  );
};

export default EventDetails;
