import SellForm from '@/components/sellForm';
import { MdSell } from "react-icons/md";


export default function AddItems() {
    return (
        <div className="page--wrapper">
            <h2 className='heading flex items-center gap-2'>Sell Your Things <MdSell className='text-warning' /></h2>
            <SellForm />
        </div>
    )
}