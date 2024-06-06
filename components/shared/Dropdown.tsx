import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "../ui/input";
import { addCategory } from "@/store/slices/eventSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
  existingCategory?: any;
};

const Dropdown = ({
  value,
  onChangeHandler,
  existingCategory,
}: DropDownProps) => {
  console.log(existingCategory, "existingCategory");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { User } = useSelector((state: any) => state.auth);
  const userId = User?.userId;
  // const [category, setCategory] = useState(existingCategory);
  // console.log(category, "category");
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
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

  // useEffect(() => {
  //   setCategory(existingCategory);
  // }, [onChangeHandler,existingCategory]);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {existingCategory?.length > 0 &&
          existingCategory?.map((category: any) => (
            <SelectItem
              key={category}
              value={category}
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

export default Dropdown;
