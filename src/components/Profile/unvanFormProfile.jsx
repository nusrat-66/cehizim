import React, {useState, useEffect} from 'react'
import agent from "../../api/agent"
import { useSelector } from 'react-redux'
function UnvanFormProfile() {
const {customerId, userId}=useSelector(state=>state.loginReducer)
const [listRegionItems, setListRegionItems] = useState([])
const [listCityItems, setListCityItems] = useState([])
const [errorMessage, setErrorMessage] = useState("")
const [successMessage, setSuccessMessage] = useState("")

const sortFunction= function(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}
const submitEvent=async (e)=>{
    e.preventDefault()
const form=e.target
    const data= {
        address: form.unvan.value,
        customerId,
        description:  form.qeydler.value,
        recordStatus:  0,
        regionId: form.address_city?.value? parseInt(form.address_city.value):parseInt(form.address_country.value),
        userId
    }
    const submiteResponse=await agent.BucketRelated.postUserAdress(data)
   if(submiteResponse.Message.includes("succesfully!")){
setSuccessMessage('Müvəffəqiyyətlə əlavə olundu')
   }else{
    setErrorMessage('Xəta baş verdi')
   }
   setTimeout(() => {
    setErrorMessage("")
    setSuccessMessage("")
    window.location.reload();
   }, 3000);
   }
const selectChange= async(e)=>{
     if(e.target.value){
  const regionResponse=await  agent.BucketRelated.getCities(e.target.value)
   setListRegionItems(regionResponse)
   return
}
setListRegionItems([])
}

 
useEffect(async () => {
    const cityResponse=await agent.BucketRelated.getCities()
     setListCityItems(cityResponse)
}, [])


    return (
    <form onSubmit={submitEvent} className="w-commerce-commercecheckoutblockcontent block-content">
    <div className="w-commerce-commercecheckoutrow block-row">
        <div className="w-commerce-commercecheckoutcolumn block-column">
        <label className="w-commerce-commercecheckoutlabel cs-label">Şəhər </label>
        <select required onChange={selectChange} name="address_country" className="w-commerce-commercecheckoutshippingcountryselector city-lb"> 
        <option value=''>Şəhər seç</option>
       {listCityItems.sort(sortFunction).map(city=> <option value={city.id}>{city.name}</option> )}
        </select>
        </div>
        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
        {listRegionItems.length>0 &&  <> 
        <label className="w-commerce-commercecheckoutlabel cs-label">Rayon</label>
        <select required name="address_city" className="w-commerce-commercecheckoutshippingcountryselector city-lb">
        <option value="">Rayon seç</option>
        { listRegionItems.map(region=> <option value={region.id}>{region.name}</option> )}
        </select>
          </>}
         </div>
    </div>
    <div className="w-commerce-commercecheckoutrow block-row">
        <div className="w-commerce-commercecheckoutcolumn block-column">
        <label className="w-commerce-commercecheckoutlabel cs-label">Çatdırılma ünvanı </label>
        <input type="text" name="unvan" required className="w-commerce-commercecheckoutshippingcity loc-lb" />
        </div>
    </div>
    <div className="w-commerce-commercecheckoutrow block-row">
        <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
        <label className="w-commerce-commercecheckoutlabel cs-label import">Əlavə qeydlər</label>
        <input type="text" name="qeydler" required className="w-commerce-commercecheckoutshippingcity notes-lb" />
        </div>
    </div>
    <p className=  {errorMessage?'message':'message message__success'}> {errorMessage} {successMessage} </p>
    <button   className="save-button w-button w-100">YADDA&nbsp;SAXLA</button>
    </form>
  )
}

export default UnvanFormProfile