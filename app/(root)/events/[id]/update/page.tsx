"use client";

import EventForm from "@/components/shared/EventForm";
import { getEventDetails } from "@/store/slices/eventSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UpdateEvent = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [eventData, setEventData] = useState(null);
  useEffect(() => {
    dispatch(
      getEventDetails({
        id,
        onSuccess: (res: any) => {
          setEventData(res);
        },
      })
    );
  }, [id, dispatch]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Tickets
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
