

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");
    
    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter menu visibility

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName;
            }
            return null;
        }).filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        // Format for URL change when checkbox changes
        const urlFormat = arrayOfCategory.map((el, index) => {
            return `category=${el}` + (index < arrayOfCategory.length - 1 ? '&&' : '');
        });

        navigate("/product-category?" + urlFormat.join(""));
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;

        setSortBy(value);

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    // Toggle filter menu visibility
    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
      <div className='container ml-1 p-4'>
      {/* Toggle button for small devices */}
      <button 
          className='md:hidden bg-purple-500 text-white px-4 py-2 rounded-md mb-2'
          onClick={toggleFilterMenu}>
          {isFilterOpen ? 'Close Filters' : 'Show Filters'}
      </button>
  
      <div className='relative grid grid-cols-[200px,1fr]'>
          {/* Left side (filters) */}
          <div 
              className={`bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll 
              ${isFilterOpen ? 'block z-10 absolute left-0 top-12 w-48 md:w-auto' : 'hidden md:block'}`}>
              {/* Sort by */}
              <div className='ml-1'>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                      <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                          <label>Price - Low to High</label>
                      </div>
                      <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                          <label>Price - High to Low</label>
                      </div>
                  </form>
              </div>
  
              {/* Filter by */}
              <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                      {productCategory.map((categoryName) => (
                          <div className='flex items-center gap-3' key={categoryName?.value}>
                              <input 
                                  type='checkbox' 
                                  name={"category"} 
                                  checked={selectCategory[categoryName?.value]} 
                                  value={categoryName?.value} 
                                  id={categoryName?.value} 
                                  onChange={handleSelectCategory} 
                              />
                              <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                      ))}
                  </form>
              </div>
          </div>
  
          {/* Right side (products) */}
          <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
              <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                  {data.length !== 0 && !loading && (
                      <VerticalCard data={data} loading={loading} />
                  )}
              </div>
          </div>
      </div>
  </div>
  
    );
}

export default CategoryProduct;
