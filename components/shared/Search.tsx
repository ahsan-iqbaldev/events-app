"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getSearchEvents } from "@/store/slices/eventSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getOrderDetails,
  getSearchOrderEvents,
} from "@/store/slices/orderSlice";

const Search = ({
  placeholder = "Search title...",
  type,
}: {
  placeholder?: string;
  type?: string;
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { id }: any = useParams();
  console.log(id, "idparam");
  const paramId = id;
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);
    if (type == "Home") {
      dispatch(getSearchEvents({ query }));
    } else {
      if (query == "") {
        dispatch(getOrderDetails({ paramId, onSuccess: () => {} }));
      } else {
        dispatch(getSearchOrderEvents({ query }));
      }
    }

    console.log(query, "query");

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
