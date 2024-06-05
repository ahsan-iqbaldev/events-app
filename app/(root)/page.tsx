import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = {
    data: [
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
      {
        organizer: {
          _id:"92389489i239",
          firstName: "Waseem",
          lastName: "sajjad",
        },
        category: {
          _id: "73847827",
          name: "Collection 1",
        },
        title: "Ahsaniqbal",
        description:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        location: "Faisalabad",
        imageUrl: "/assets/images/test.png",
        startDateTime: "2024-06-04T22",
        startEndTime: "2024-06-23T22",
        categoryId: "2",
        price: "300",
        isFree: false,
        url: "http://localhost:3000/static/media/71YXzeOuslL._AC_UY879_.746b26761fd8addf8ad8.jpg",
        _id: "9283840928203234",
      },
    ],
    totalPages: 2,
  };
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
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
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
