'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      console.log(response)
      let filteredData = response.data.products;

      if (filters.search) {
        filteredData = filteredData.filter(item =>
          item.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.category) {
        filteredData = filteredData.filter(item =>
          item.category.toLowerCase().includes(filters.category.toLowerCase())
        );
      }

      if (filters.price) {
        const priceValue = Number(filters.price);
        filteredData = filteredData.filter(item => item.price === priceValue);
      }

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className='w-full'>
     <div  className='flex flex-col w-full items-center justify-center'>
     <h1 className="text-3xl font-bold mb-6 mt-7">This is Products Dashboard</h1>

<div className="mb-4 flex gap-4">
  <input
    type="text"
    name="search"
    value={filters.search}
    onChange={handleInputChange}
    placeholder="Search by title"
    className="p-2 border rounded-full"
  />

  <select
    name="category"
    value={filters.category}
    onChange={handleInputChange}
    className="p-2 border rounded-full"
  >
    <option value="">All Categories</option>
    <option value="beauty">Beauty</option>
    <option value="fragrances">Fragrances</option>
    <option value="furniture">Furniture</option>
    <option value="groceries">Groceries</option>
  </select>

  <select
    name="price"
    value={filters.price}
    onChange={handleInputChange}
    className="p-2 border rounded-full"
  >
    <option value="">All Prices</option>
    <option value="9.99">$9.99</option>
    <option value="12.99">$12.99</option>
    <option value="19.99">$19.99</option>
    <option value="49.99">$49.99</option>
    <option value="1899.99">$1899.99</option>
  </select>
</div>
     </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-white border rounded shadow">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}