"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function Hero() {
  return (
    (<div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold dark:text-white">
              Manage Your Daily Finances with an AI Powered <br />
              <span className="text-primary text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Expense Advisor
              </span>
            </h1>
          </>
        }>
        <Image
          src=''
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}

