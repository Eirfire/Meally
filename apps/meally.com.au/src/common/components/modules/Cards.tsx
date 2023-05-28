import React from 'react';
import Image from 'next/image';
import type { ImageProps } from 'libs/types';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CardProps {
  title: string;
  id: string;
  totalTime: string;
  handleClick: () => void;
  image: ImageProps;
}

const CardSquare = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  // const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-58 rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${id}`} className="text-center text-step--2">
        {title}
      </Link>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{totalTime}</h3>
        <button onClick={handleClick}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

const CardRectangleSmall = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  // const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-46 rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${id}`} className="text-center text-step--2">
        {title}
      </Link>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{totalTime}</h3>
        <button onClick={handleClick}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

const CardRectangle = ({
  title,
  id,
  totalTime,
  handleClick,
  image,
}: CardProps) => {
  // const time = totalTime < 60 ? `${totalTime} mins` : `${totalTime / 60} hrs`;
  return (
    <div className="relative flex flex-col p-2 items-center justify-between  h-64 w-[43.75rem] resize rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${id}`} className="text-center text-step1">
        {title}
      </Link>
      <button onClick={handleClick} className="absolute right-2 bottom-2">
        <HeartIcon className="w-8 h-8 cursor-pointer" />
        {/* Change width and height on different component types */}
      </button>
      <Image
        src={image.imgUrl}
        alt={image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

export { CardRectangleSmall, CardRectangle, CardSquare };
