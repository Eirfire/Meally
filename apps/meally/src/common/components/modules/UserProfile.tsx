"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import useUser from "../../hooks/useUser";
import CreateRecipeDialog from "../elements/CreateRecipeDialog";
import {
  UserCircle2,
  Settings,
  Bookmark,
  ArrowUpRightSquare,
} from "lucide-react";

const UserProfile = () => {
  const { session, user } = useUser();

  if (!user) {
    return (
      <Link
        href={"/api/auth/signin"}
        className="rounded-md bg-yellow p-1 px-2 font-semibold text-black"
      >
        Login
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          width={42}
          height={42}
          src={
            user?.image ||
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="user profile picture"
          className="h-10 w-10 cursor-pointer rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-2">
        <Link href={`/${user?.id}`} className="flex flex-row gap-1">
          <UserCircle2 /> Profile
        </Link>
        <Link href={`/${user?.id}/bookmarks`} className="flex flex-row gap-1">
          {" "}
          <Bookmark />
          Bookmarks
        </Link>
        <CreateRecipeDialog />
        <Link
          href={`/${user?.id}/settings/profile`}
          className="flex flex-row gap-1"
        >
          {" "}
          <Settings />
          Settings
        </Link>
        <Link href={"/api/auth/signout"} className="flex flex-row gap-1">
          {" "}
          <ArrowUpRightSquare />
          Signout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
