import React, { useState } from 'react'
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayETBCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
      }) => {
    const [editProduct,setEditProduct] = useState(false)

    const handleDeleteProduct = async (productId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            
            method: 'delete',
          });
    
          if (response.ok) {
            alert('Product deleted successfully');
            fetchdata(); // Call to refetch the data after deletion
          } else {
            alert('Failed to delete the product');
          }
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('An error occurred while deleting the product');
        }
      }
    };
    
  return (
    <div className='bg-white p-4 rounded '>
       <div className='relative w-40'>
            <div className=' relative w-32 h-32 flex justify-center items-center'> 
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <div
          className='absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity duration-300'
          onClick={() => handleDeleteProduct(data._id)}
        >
          <MdDelete size={20} />
        </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayETBCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct 
            productData={data} 
            onClose={()=>setEditProduct(false)} 
            fetchdata={fetchdata}/>
          )
        }
    
    </div>
  )
}

export default AdminProductCard