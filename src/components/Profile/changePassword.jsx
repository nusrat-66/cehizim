import React, {useState, useEffect} from 'react'
import agent from '../../api/agent'
import { useSelector } from 'react-redux'
function ChangePassword() {
const [codes, setCodes]=useState({
    current:'',
    new:"",
    repeatNew:''
})
const [error, setError]=useState("")
const [success, setSuccess]=useState("")

const {phoneNumber}=useSelector(state=>state.loginReducer)

 
const inputChange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    const mockCodes=codes
    codes[name]=value
    setCodes({...mockCodes})
}

const onSubmit= async (e)=>{
e.preventDefault()

if(codes.new!=codes.repeatNew){
    setError("şifrələr uygun deyil!")
    return
}else{
    setError("")
}




const verifyResponse =await agent.ProfilRelated.loginVerify({
    "userName":phoneNumber,
    "password":codes.current
  })
 if(!verifyResponse.hasError){
const response =await agent.ProfilRelated.changePassword({
    "userName":phoneNumber,
    "password":codes.repeatNew
 })
if(!response.hasError){
setSuccess("Parol müvəffəqiyyətlə dəyişildi")
setCodes({
    current:'',
    new:"",
    repeatNew:''
})
setTimeout(() => {
    setSuccess("")
}, 3000);
}
 
}else{
    setError("Səhvlik baş verdi")
}

  }


  return (
    <form onSubmit={onSubmit} className="w-commerce-commercecheckoutblockcontent block-content">
    <div className="w-commerce-commercecheckoutrow block-row">
        <div className="w-commerce-commercecheckoutcolumn block-column">
        <label className="w-commerce-commercecheckoutlabel cs-label">Cari şifrə </label>
        <input value={codes.current} onChange={inputChange} type="password" name="current" required className="w-commerce-commercecheckoutshippingcity loc-lb" />
        </div>
    </div>
    <div className="w-commerce-commercecheckoutrow block-row">
        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
        <label className="w-commerce-commercecheckoutlabel cs-label">Yeni şifrə</label>
        <input value={codes.new} onChange={inputChange} type="password" name="new" required className="w-commerce-commercecheckoutshippingcity dist-lb" />
        </div>
        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
        <label className="w-commerce-commercecheckoutlabel cs-label">Təkrar Yeni şifrə</label>
        <input value={codes.repeatNew} onChange={inputChange} type="password" name="repeatNew" required className="w-commerce-commercecheckoutshippingcity dist-lb" />
        </div>
    </div>
    <p className={success?'resetError resetError__success':'resetError'}>{error} {success}</p>
    <button href="#" className="save-button w-button w-100">YADDA&nbsp;SAXLA</button>
    </form>
  )
}

export default ChangePassword