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
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { Budgets } from '../../../../../../utils/schema';
import { toast } from 'sonner';
import { db } from '../../../../../../utils/dbConfig';
import { DialogClose } from '@radix-ui/react-dialog';


const CreateBudget = ({refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState("😀")
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const { user } = useUser();
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData();
            toast('Budget Created Successfully')
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed hover:shadow-md cursor-pointer pb-[3.40rem]'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button className='text-lg' variant='outline' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                <div className='absolute z-10'>
                                    <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-semibold my-1'>Budget Name</h2>
                                    <Input onChange={(e) => setName(e.target.value)} placeholder='example: Electricity Bill' />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-semibold my-1'>Budget Amount</h2>
                                    <Input type='number' onChange={(e) => setAmount(e.target.value)} placeholder='example: 500' />
                                </div>
                                
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                        <Button onClick={() => onCreateBudget()} disabled={!(name && amount)} className='w-full mt-5'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateBudget