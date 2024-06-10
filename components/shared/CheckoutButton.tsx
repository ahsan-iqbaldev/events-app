"use client";

// import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { useSelector } from "react-redux";

const CheckoutButton = ({ event }: { event: any }) => {
  console.log(event, "chekcutevent");
  // const {userIdTects}=useSelector(state)
  const { User } = useSelector((state: any) => state.auth);
  const ID = User?.userId;
  const Creater = event?.userId == ID;

  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const eventEndTime = new Date(event?.startEndTime?.seconds * 1000);
  const hasEventFinished = eventEndTime < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full " size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {Creater ?"": <Checkout event={event} userId={userId}/>
         
            }
        
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
