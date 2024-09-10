"use client";
import React,{useState,useEffect} from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";


export default function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);

  // useEffect(() => {
  //   user && getBudgetlist()
  // }, [user]);
  
    return (
      <div className="p-8">
        <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
        <p className="text-gray-500"> Let's see what's happenning with your money!!</p>

        <CardInfo/>
      </div>
    );
  }