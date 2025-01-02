"use client";
import { Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { PantryContext, TPantryContext } from "@/contexts/PantryContext";
import { useContext } from "react";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Loader from "@/components/Loader"

export default function Pantry({ handleClickOpen }: { handleClickOpen: () => void }): JSX.Element {
    const { itemsToRender, loading, deleteItem, increaseQuantityByOne, decreaseQuantityByOne } = useContext(PantryContext) as TPantryContext

    if (!itemsToRender && loading) {
        return <Loader message="Getting the items in your pantry" />
    }

    if (!itemsToRender || itemsToRender.length === 0) {
        return <NoPantryItems />
    }

    function NoPantryItems(): JSX.Element {
        return (
            <Box className="flex justify-center items-center w-full h-full">
                <section className="flex flex-col gap-6 w-[70%] md:w-fit p-5 rounded-lg border border-zinc-800">
                    <p className="flex-none w-fit font-manrope font-medium text-base md:text-lg tracking-wide">There is nothing in your pantry.</p>
                    <button className="py-2 px-6 text-base md:text-lg !leading-none font-manrope tracking-wide font-bold bg-cta-primary hover:animate-cta-gradient text-zinc-900 rounded-lg"
                        onClick={handleClickOpen}>
                        Add
                    </button>
                </section>
            </Box>

        )
    }

    return (
        <main className="w-full py-10 grid grid-cols-1 auto-rows-auto gap-5 md:grid-cols-3 lg:grid-cols-4">
            {itemsToRender.map((item) => (
                <section key={item.docId} className="w-full p-5 rounded-lg border border-zinc-800">
                    {item.imageSrc ?
                        <img className="block object-cover object-center rounded-lg w-full h-72 md:h-[200px] border border-zinc-800" src={item.imageSrc} alt={item.name} />
                        :
                        <div className="relative flex w-full bg-[#99999920] rounded-lg border border-zinc-800 h-72 md:h-[200px]">
                            <ImageNotSupportedIcon fontSize='large' sx={{
                                position: 'absolute', display: 'block', zIndex: 0, inset: 0, margin: 'auto', fill: '#b3b3b350',
                            }} />
                        </div>
                    }
                    <div className="flex flex-col gap-3 mt-5">
                        <h2 className="w-full text-base md:text-lg tracking-wide font-manrope capitalize font-semibold break-words" >{item.name}</h2>
                        <div className='flex justify-between w-full'>
                            <div className='flex gap-1 items-center'>
                                <button onClick={() => increaseQuantityByOne(item.docId, item.quantity)}>
                                    <Add className="text-orange-primary hover:text-green-700" />
                                </button>
                                <p className="font-manrope text-zinc-900 font-medium text-base md:text-lg" >{item.quantity}</p>
                                <button onClick={() => decreaseQuantityByOne(item.docId, item.quantity)}>
                                    <Remove className="text-orange-primary hover:text-red-700" />
                                </button>
                            </div>

                            <button onClick={() => deleteItem(item.docId)} className="grid place-content-center w-10 aspect-square rounded-full">
                                <DeleteOutlineOutlinedIcon className="text-orange-primary hover:text-red-700" />
                            </button>
                        </div>
                    </div>
                </section>
            ))
            }
        </main >
    );
}
