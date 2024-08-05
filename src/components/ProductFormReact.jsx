import React ,{useState} from 'react'
import "../styles/input.css";
import ErrorField  from './ErrorField'
import LoaderButton from './LoaderButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


// export default function ProductFormReact({responseData , productPrice}) {
export default function ProductFormReact({ responseData , productPrice ,productTitle}) {
  const [isDropOrderDetailsOpen , setIsDropOrderDetailsOpen] = useState(false);
  const [selectedWilaya , setSelectedWilaya]=useState('');
  const [shippingPrice , setShippingPrice]=useState('');
  const [selectedColor, setSelectedColor]=useState('');
  const [loading, setLoading] = useState(false);
  const [isError , setIsError] = useState({
    'name':false,
    'phone':false,
    'address':false,
    'wilaya':false,
    'color':false
  })
  const toggleDropdownOrderDetails = () => {
    event.preventDefault(); 
    setIsDropOrderDetailsOpen(!isDropOrderDetailsOpen);
  };
  const [formData , setFormData]=useState({
    fullName : '',
    phoneNumber: '',
    address: '',
  })

  const handleChangeFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }
  const handleColorChange = (event)=>{
    setSelectedColor(event.target.value)
  }
const handleWilayaChange = ( event )=>{
    console.log('handleChange event:', event); // Debug log
   const selectedWilaya = responseData.find(wilaya=>wilaya?.attributes?.name === event.target.value)
   setSelectedWilaya(selectedWilaya?.attributes?.name)
   setShippingPrice(selectedWilaya?.attributes?.shippingPrice)
}

const totalPrice = shippingPrice + productPrice
const handleSubmit = async (event)=>{
    event.preventDefault();
    setLoading(true);
    const submittedData = {
      'name':formData.fullName,
      'phone':formData.phoneNumber,
      'wilaya':selectedWilaya,
      'address':formData.address,
      'color':selectedColor
    }
    let newErrors = { ...isError };
    let hasError = false
    Object.entries(submittedData).forEach(([key, value]) => {
      if(value === ''){
        newErrors[key] = true
        console.log( key + ' يرجى منكم ملأ ');
        hasError = true
        setLoading(false)
      }
      else {
        newErrors[key] = false
      }
    });

    // console.log(newErrors);
    setIsError(newErrors)
    if(hasError){
      console.log(newErrors)
      console.log('Please fill out all required fields.');
      return; // Exit the function to prevent submission
    }
    // console.log(submittedData)
    // console.log('Form submitted:', formData);
    const data = new FormData();
    data.append('الاسم و اللقب', formData.fullName);
    data.append('رقم الهاتف', formData.phoneNumber);
    data.append('الولاية', selectedWilaya);
    data.append('العنوان', formData.address);
    data.append('اللون المفضل',selectedColor),
    data.append('سعر المنتج',productPrice);
    data.append('سعر التوصيل',shippingPrice);
    data.append('السعر الإجمالي',totalPrice)
  //  // your URL.
  //  // Hash the name and phone number
  //  const hashedName = SHA256(formData.fullName).toString();
  //  const hashedPhone = SHA256(formData.phoneNumber).toString();
  //  const hashedWilaya = SHA256(selectedWilaya).toString();

   
    const Sheet_Url="https://script.google.com/macros/s/AKfycbwBw1D7Ilc31bUiiNSCMPTra2j57ucLvyPrCawwkY73WrSWvGimGjEsenaWa04dSuxfGg/exec"
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
        address:'',
      });
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
     window.location.href = '/thank-you';

    }

}
 

  return (
    <div>
        <form   onSubmit={handleSubmit}   className="mt-4">
        <p className='mb-4 text-slate-500'>  أضف معلوماتك في الأسفل للطلب 👇</p> 
        <div className="mb-4">
            <input type="text" id="name" name="fullName" value={formData.fullName} onChange={handleChangeFormData} placeholder='الاسم و اللقب'  className="styled-input no-spinner block w-full rounded-md border border-gray-200 py-3 px-4  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
            {
              isError.name && (<ErrorField errorMsg={`املأ الإسم و اللقب من فضلك`} />)
            }
        </div>

        <div className="mb-4">
            <input type="number" name="phoneNumber"  id="number" value={formData.phoneNumber} onChange={handleChangeFormData} placeholder='رقم الهاتف'  className="styled-input block no-spinner w-full rounded-md border border-gray-200 py-3 px-4  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
            {
              isError.phone && (<ErrorField errorMsg={`املأ رقم الهاتف من فضلك`} />)
            }
        </div>
        <div className="mb-4 ">    
            <div className="flex flex-col sm:col-span-3">
                <select  className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="wilaya" id="wilaya" value={selectedWilaya}  onChange={handleWilayaChange}>
                <option value="" disabled selected='selected'>
                  ولاية الإقامة
                  </option>
                  {responseData.map(data=>(
                  <option  key={data?.id} value={data?.attributes?.name}>{data?.attributes?.name}</option>
                  ))}
                </select>
                {
              isError.wilaya && (<ErrorField errorMsg={`املأ ولاية الإقامة من فضلك`} />)
            }
            </div>
        </div>
        <div className="mb-4">
            <input type="text" name="address"  value={formData.address} onChange={handleChangeFormData} placeholder='العنوان : "لا تنس ذكر اسم البلدية "'   className="styled-input block no-spinner w-full rounded-md border border-gray-200 py-3 px-4  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
            {
              isError.address && (<ErrorField errorMsg={`املأ عنوان إقامتك من فضلك`} />)
            }
        </div>
        <div className="mb-4 ">    
            <div className="flex flex-col sm:col-span-3">
                <select  className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="color" id="color" onChange={handleColorChange}>
                  <option value="" disabled selected='selected'>
                  اختر لونك المفضل
                  </option>
                  <option value="رمادي - Gris">رمادي - gris</option>
                  <option value="أزرق - Bleu">أزرق - Bleu</option>
                  <option value="وردي- Rose">وردي- Rose</option>
                </select>
                {
              isError.color && (<ErrorField errorMsg={`اختراللون من فضلك`} />)
            }
            </div>
        </div>
        
        <p className='py-3 px-4 text-[14px] border-dashed border-b-2 border-cyan-300 '>{productTitle} :  <span className='text-cyan-500'>{productPrice || '--'} دج</span></p>
          <p className='py-3 px-4 text-[14px] border-dashed border-b-2 border-cyan-300 '>سعر التوصيل :  <span className='text-cyan-500'>{shippingPrice || 'اختر ولايتك -'} دج</span></p>
          <p className='py-3 font-semibold px-4'>السعر الإجمالي : <span className='text-cyan-500'>{totalPrice || '--'} دج</span></p>
        <button type="submit" disabled={loading}   className="rounded-sm w-full mb-4 flex items-center justify-center gap-4 text-[16px] font-semibold p-2 bg-cyan-500 uppercase tracking-wide text-white  transition duration-150 ease-in-out hover:translate-y-1 hover:bg-cyan-400">
             {loading ?
             (
                <LoaderButton text='تتم معالجة معلوماتك اللآن ...'/>
             ) 
             :
             (
              <>
              <span>👈</span>
              <span className='text-[18px] font-bold'>أنقر هنا لتأكيد الطلبية</span>
              </>
             )
              }
              
           </button>
      
        <div className="dropdown-container">
      {/* <button type='input' onClick={toggleDropdownOrderDetails} className=" flex items-center justify-between bg-cyan-50 w-full font-semibold  text-right rounded-sm px-4 py-3 border-b-2 border-cyan-300">
        <div className='flex items-center '>
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ملخص الطلبية  
        </div>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isDropOrderDetailsOpen && (
        <ul className="bg-cyan-50 ">
          <li className='py-3 px-4 text-[14px] border-dashed border-b-2 border-cyan-300 '>{productTitle} :  {productPrice || 'غير محدد بعد اعد تحميل الموقع'} دج</li>
          <li className='py-3 px-4 text-[14px] border-dashed border-b-2 border-cyan-300 '>سعر التوصيل :  {shippingPrice || 'اختر ولايتك'} دج</li>
          <li className='py-3 font-semibold px-4'>السعر الإجمالي :  {totalPrice || 'غير محدد بعد'} دج</li>
        </ul>
      )} */}
    </div>
        
    </form>
    </div>
  )
}
