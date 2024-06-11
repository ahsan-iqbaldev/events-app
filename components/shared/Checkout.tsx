import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import CashDeliverModal from "./CashDeliverModal";
import CashOnDeliveryModal from "./CashDeliverModal";
import axios from "axios";
// import { checkoutOrder } from "@/lib/actions/order.actions";

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: any; userId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.ipify.org");
      const ipAddress = response.data;

      const countryDetail = await axios.get(
        `https://ipinfo.io/${ipAddress}/json?token=5a6086648352e7`
      );
      const { city } = countryDetail.data;
      setCountry(city);
    } catch (error) {
      console.error("Error fetching IP data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    console.log(order);

    // await checkoutOrder(order);
  };

  return (
    <>
      {/* // <form action={onCheckout} method="post"> */}
      <Button
        type="submit"
        role="link"
        size="lg"
        className="button sm:w-fit"
        onClick={() => openModal()}
      >
        {event?.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
      {isModalOpen && (
        <CashOnDeliveryModal
          onClose={closeModal}
          storeProductData={event}
          currentCity={country}
        />
      )}

      {/* // </form> */}
    </>
  );
};

export default Checkout;
