import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayETBCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 justify-center px-2 py-4'>
            {
                loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[200px] bg-white rounded-sm shadow-md transition-transform duration-300'>
                            <div className='bg-slate-200 h-36 flex justify-center items-center animate-pulse'></div>
                            <div className='p-3 grid gap-2'>
                                <h2 className='font-medium text-sm text-black p-1 py-1 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200'></p>
                                <div className='flex gap-2'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                </div>
                                <button className='text-xs text-white px-2 rounded-full bg-slate-200 py-1 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                     
                        <Link 
    to={`/product/${product?._id}`}
    key={product?._id}
    className='flex flex-col w-full min-w-[120px] max-w-[200px] bg-white rounded-md shadow-sm hover:shadow-md transition-transform duration-200'
    onClick={scrollTop}
>
    <div className='bg-slate-200 flex justify-center items-center h-24 sm:h-28'>
        <img 
            src={product?.productImage[0]} 
            className='object-contain h-full w-full transition-transform duration-200 hover:scale-105' 
            alt={product?.productName} 
        />
    </div>
    <div className='p-2 flex flex-col gap-1'>
        <h2 className='font-medium text-xs text-black line-clamp-1'>{product?.productName}</h2>
        <p className='capitalize text-slate-500 text-xs'>{product?.category}</p>
        <div className='flex gap-1'>
           <p className=' text-purple-600 font-medium text-md'>{displayETBCurrency(product?.price)}</p>
            <p className=' text-black font-medium text-md'>Stock: {product?.stockQuantity}</p>
        
        </div>
        <button 
            className='text-xs bg-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded-md transition-colors duration-200'
            onClick={(e) => handleAddToCart(e, product?._id)}
        >
            Add
        </button>
    </div>
</Link>


                    ))
                )
            }
        </div>
    );
};

export default VerticalCard;
