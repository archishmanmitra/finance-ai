"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { db } from '../../../../../../utils/dbConfig';
import { Income } from '../../../../../../utils/schema';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CreateIncome = ({refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState("😀");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
  
    const { user } = useUser();

    const onCreateIncomes = async () => {
        const result = await db
          .insert(Income)
          .values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon,
          })
          .returning({ insertedId: Income.id });
    
        if (result) {
          refreshData();
          toast("New Income Source Created!");
        }
      };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-7 rounded-md
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Create New Income Source</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-semibold my-1">Source Name</h2>
                  <Input
                    placeholder="example: Job"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-semibold my-1">Montly Amount</h2>
                  <Input
                    type="number"
                    placeholder="example: 500"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateIncomes()}
                className="mt-5 w-full rounded-full"
              >
                Create Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateIncome