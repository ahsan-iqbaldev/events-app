"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { handleUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Banner = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { User } = useSelector((state: any) => state.auth);
  const { user } = useUser();

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && !User) {
      const userId = user?.id;

      if (userId) {
        const payload = {
          userId: userId,
          profileImage: user?.imageUrl,
          userName: user?.username,
          email: user?.primaryEmailAddress?.emailAddress,
          verified: user?.primaryEmailAddress?.verification?.status,
        };

        dispatch(
          handleUser({
            payload,
            onSuccess: (res: string) => {
              toast.success(res);
            },
          })
        );

        console.log("User ID:", userId);
        console.log("User:", user);

        setInitialized(true);
      }
    }
  }, [initialized, user, dispatch]);

  //   useEffect(() => {

  //   }, [userId]);
  return (
    <>
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="h1-bold">
            Host,Connext Celebrate: your Events, Our Platform!
          </h1>
          <p className="p-regular-20 md:p-regular-24">
            Book and learn helpfull tips from 3,168+ mentors in world-class
            companies with our global community
          </p>
          <Button className="button w-full sm:w-fit" size="lg" asChild>
            <Link href="#events">Explore Now</Link>
          </Button>
        </div>
        <Image
          src="/assets/images/hero.png"
          alt="hero"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
        />
      </div>
    </>
  );
};

export default Banner;
