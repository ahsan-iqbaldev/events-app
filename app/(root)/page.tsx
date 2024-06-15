"use client";
import Banner from "@/components/shared/Banner";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getCategory, getEvents } from "@/store/slices/eventSlice";
import { SearchParamProps } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ searchParams }: SearchParamProps) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { User } = useSelector((state: any) => state.auth);
  const userId = User?.userId;
  const { events } = useSelector((state: any) => state.events);
  const [categorys, setCategory] = useState(null);
  console.log(categorys, "categorys");
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  useEffect(() => {
    dispatch(getEvents());
    if (userId) {
      dispatch(
        getCategory({
          userId,
          onSuccess: (res: any) => {
            setCategory(res);
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(
        getCategory({
          userId,
          onSuccess: (res: any) => {
            setCategory(res);
          },
        })
      );
    }
  }, [userId]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <Banner />
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Tickets
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search type={"Home"} />
          <CategoryFilter existingCategory={categorys} />
        </div>

        <Collection
          data={events}
          emptyTitle="No Ticket Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={1}
        />
      </section>
    </>
  );
}
