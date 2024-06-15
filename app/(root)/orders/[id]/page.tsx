"use client";

import Search from "@/components/shared/Search";
// import { getOrdersByEvent } from '@/lib/actions/order.actions'
import { formatDateTime, formatPrice } from "@/lib/utils";
import { getOrderDetails } from "@/store/slices/orderSlice";
import { SearchParamProps } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { IOrderItem } from '@/lib/database/models/order.model'

const Orders = ({ searchParams }: SearchParamProps) => {
  const { id }: any = useParams();
  console.log(id, "idparam");
  const paramId = id;
  const { User } = useSelector((state: any) => state.auth);
  const { orderStats } = useSelector((state: any) => state.orders);
  const userId = User?.userId;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const searchText = (searchParams?.query as string) || "";
  console.log(searchText, "searchText");

  useEffect(()=>{

  },[])

  useEffect(() => {
    dispatch(getOrderDetails({ paramId, onSuccess: () => {} }));
  }, []);
  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." type={"orders"} />
      </section>

      <section className="wrapper overflow-x-auto">
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
            {orderStats && orderStats.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orderStats &&
                  orderStats?.map((row: any) => (
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
                        {row?.fullName}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {moment
                          .unix(row?.createdAt?.seconds)
                          .format("DD-MMM-YYYY hh:mm A")}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {formatPrice(row?.ticket?.price)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
