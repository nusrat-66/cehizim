import React, {useState} from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
 
function Input({value, onChange, type, name, }) {
const [seen, setSeen] = useState(false)

 
  return (
    <div className="w-commerce-commercecheckoutcolumn block-column relative">
        <label className="w-commerce-commercecheckoutlabel cs-label">Cari şifrə </label>
        <input value={value} onChange={onChange} type={seen?"text":"password"} name={name} required className="w-commerce-commercecheckoutshippingcity loc-lb" />
      {seen && <AiFillEye onClick={()=>setSeen(false)} className='passEyeIcon'/>}
      {!seen && <AiFillEyeInvisible onClick={()=>setSeen(true)} className='passEyeIcon'/>}
        </div>
  )
}

export default Input