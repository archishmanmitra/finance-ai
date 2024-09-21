"use client";
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { db } from '../../../../../../utils/dbConfig';
import { Budgets } from '../../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({budgetInfo, refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState()
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const { user } = useUser();
    useEffect(() => {
        if (budgetInfo) {
          setEmojiIcon(budgetInfo?.icon);
          setAmount(budgetInfo?.amount);
          setName(budgetInfo?.name);
        }
      }, [budgetInfo]);
    
    const onUpdateBudget = async ()=>{
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id)).returning();
        if(result){
            refreshData();
            toast('Budget Updated!');
        }
    }
    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className='flex gap-2 font-semibold'><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
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
                                    <Input onChange={(e) => setName(e.target.value)} placeholder='example: Electricity Bill' defaultValue={budgetInfo?.name}/>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-semibold my-1'>Budget Amount</h2>
                                    <Input type='number' onChange={(e) => setAmount(e.target.value)} defaultValue={budgetInfo?.amount} />
                                </div>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button onClick={() => onUpdateBudget()} disabled={!(name && amount)} className='w-full mt-5'>Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget