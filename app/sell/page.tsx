import SellForm from '@/components/sellForm';
import { MdSell } from "react-icons/md";


export default function AddItems() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-white mt-3 px-10 py-5 gap-5">
            <h2 className='heading flex items-center gap-2'>Sell Your Things <MdSell className='text-warning' /></h2>
            <SellForm />
        </div>
    )
}