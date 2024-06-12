"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { getAllCategories } from "@/lib/actions/category.actions";
// import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addCategory, getCategoryEvents } from "@/store/slices/eventSlice";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/nextjs";

const CategoryFilter = ({ existingCategory }: any) => {
  let arr;
  if (!existingCategory) {
    arr = ["cricket", "football", "transport"];
  } else {
    arr = existingCategory;
  }
  console.log(arr, "arrarr");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { User } = useSelector((state: any) => state.auth);
  const { user } = useUser();
  const userId = User?.userId;
  const ID = user?.id;
  const [newCategory, setNewCategory] = useState("");
  // const [categories, setCategories] = useState<any[]>(arr);
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   setCategories(arr);
  // }, [arr]);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
    dispatch(getCategoryEvents({ category }));
  };

  const handleAddCategory = () => {
    if (!ID) {
      return router.push("/signin");
    }
    const payload = {
      category: [newCategory],
      userId,
    };
    dispatch(
      addCategory({
        payload,
        onSuccess: () => {
          toast.success("Category Added sucessfully");
        },
      })
    );
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {arr?.map((category: any) => (
          <SelectItem
            value={category}
            key={category}
            className="select-item p-regular-14"
          >
            {category}
          </SelectItem>
        ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full reounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  startTransition(handleAddCategory);
                }}
              >
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
