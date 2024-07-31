import React ,{useState} from 'react'


// export default function ProductFormReact({responseData , productPrice}) {
export default function ProductFormReact({ productPrice}) {
  // const [selectedWilaya , setSelectedWilaya]=useState('choose');
  // const [shippingPrice , setShippingPrice]=useState(1200);
  
  const [formData , setFormData]=useState({
    fullName : '',
    phoneNumber: '',
    address: ''
  })

  const handleChangeFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }
  
const handleWilayaChange = ( event )=>{
    console.log('handleChange event:', event); // Debug log
   const selectedWilaya = responseData.find(wilaya=>wilaya?.attributes?.wilayaname === event.target.value)
   setSelectedWilaya(selectedWilaya?.attributes?.wilayaname)
   setShippingPrice(selectedWilaya?.attributes?.shippingprice)
}

// const totalPrice = shippingPrice + productPrice
const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log('Form submitted:', formData);
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('address', formData.address);
    data.append('productPrice',productPrice);
    // data.append('shippingPrice',shippingPrice);
    // data.append('totalPrice',totalPrice)
   // your URL.

    const Sheet_Url="https://script.google.com/macros/s/AKfycbxBRdIYO2ko3CAy6u5B63WG-hmr0xB4ygmqgp_-fXCAQCpt80ePTqhV1jpdNoWZ4GX3qg/exec"
    try {
      await fetch(Sheet_Url, {
        method: 'POST',
        body: data,
        muteHttpExceptions: true,
      });
     console.log('fetch is here')
      setFormData({
        fullName: '',
        phoneNumber: '',
        address:''
      });
    } catch (error) {
      console.log(error);
    }

}
 

  return (
    <div>
        <form   onSubmit={handleSubmit}  className="mt-4">
        
        <div className="mb-4">
            <label htmlFor="number" className="mb-2 block text-sm font-medium">Name</label>
            <input type="text" id="name" name="fullName" value={formData.fullName} onChange={handleChangeFormData}  className=" no-spinner block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
            <label htmlFor="number" className="mb-2 block text-sm font-medium">Phone Number</label>
            <input type="number" name="phoneNumber"  id="number" value={formData.phoneNumber} onChange={handleChangeFormData}   className="block no-spinner w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* <div className="mb-4 ">    
            <div className="flex flex-col sm:col-span-3">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="wilaya">Choose Your Wilaya : </label>
                <select  className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="wilaya" id="wilaya" value={selectedWilaya} onChange={handleWilayaChange}>
                  {responseData.map(data=>(
                  <option  key={data?.id} value={data?.attributes?.wilayaname}>{data?.attributes?.wilayaname}</option>
                  ))}
                </select>
            </div>
        </div> */}
        <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">Address</label>
            <input type="text" name="address"  value={formData.address} onChange={handleChangeFormData}    className="block no-spinner w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        {/* <p className='my-3'>Shipping price :  {shippingPrice || 'choose your wilaya before ..'}</p>
        <p className='my-3'>Total price :  {totalPrice}</p> */}
        <button type="submit"   className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Buy now
        </button>
    </form>
    </div>
  )
}
