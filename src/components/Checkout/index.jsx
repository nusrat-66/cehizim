import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import agent from "../../api/agent";
import UnvanForm from "./unvanForm";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { deleteAll } from "../../redux/actions";
import InputMask from 'react-input-mask';

 var decode = require('decode-html');

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

export const NewDateForInput=()=> {
    var now = new Date();
    var strDateTime = 
    now.getFullYear() + "-" +
    AddZero(now.getMonth() + 1) + "-" +
    now.getDate() + ("T") +
    now.getHours() + ":" +
    AddZero(now.getMinutes())
   return strDateTime
  }


export default function CheckoutComp() {
const navigate = useNavigate();  
const {paymantType, buckets, loginReducer}=useSelector(state=>state)
const userId=loginReducer.id
const {customerId}=loginReducer
const [products, setProducts] = useState([])
const [unvan, setUnvan] = useState([1])
const dispatch=useDispatch()


useEffect(() => {
     setMusteriMelumatiForm({
        ...musteriMelumatiForm, Ad:loginReducer.fullName.split(" ")[0], Soyad:loginReducer.fullName.split(" ")[1], Telefon:loginReducer.phoneNumber
    })
 }, [loginReducer])


const [musteriMelumatiForm, setMusteriMelumatiForm] = useState({
    Telefon:"",
    Ad:"",
    Soyad:"",
    FIN:"",
    Seriya:"",
    Email:"",
    Whatsapp:'',
    uygunGun:''
     })
     Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }
 
    const [unvanForm , setUnvanForm] = useState([{
        seher:"",
        rayon:"",
        unvan:"",
        tarix:"",
        elaveMelumat:"",
        productId:"",
        addressId:null
         }])


         const [unvanFormErrors , setUnvanFormErrors] = useState([{
            seher:"",
            rayon:"",
            unvan:"",
            tarix:"",
            elaveMelumat:"",
            productId:"",
            addressId:""
            }])

            
    const [Slide, setSlide] = useState({width: 350});
    const [monthForSlider, setMonthForSlider] = useState([])
    const [Installement, setInstallement] = useState(null);
    const [customerAdress, setCustomerAdress]=useState([])
    const [percent, setPercent]=useState(null)
    const [shertler, setShertler]=useState(false)
    const musteriMelumatChange=(e)=>{
    setMusteriMelumatiForm({... musteriMelumatiForm, [e.target.name]: e.target.value})
 }
 
  const unvanIncrease=()=> {
     const dumUnvan=unvan
     const {length}=dumUnvan
     const dumUnvanForm=unvanForm
     dumUnvanForm.push({
        seher:"",
        rayon:"",
        unvan:"",
        tarix:"",
        elaveMelumat:""
         })
 
      setUnvanForm([ ... dumUnvanForm])
      dumUnvan.push(dumUnvan[length-1]+1)
      setUnvan([... dumUnvan])
  }
 

 
 useEffect(() => {
   let dumProducts=[]
   let installmentMonth=[]
   if(paymantType=='credit'){
    dumProducts=buckets.filter((bucket, index) => {
        if(!installmentMonth.includes(bucket.installment)){
             installmentMonth.push(bucket.installment)
        }
          return bucket.installment!=null 
    });
 }else{
    dumProducts=buckets.filter(bucket =>{
         return bucket.installment==null
    })
 }
       setProducts(dumProducts)
     let dumProductsMonth=installmentMonth.sort((a, b)=>b-a).map((product, index)=>{
         const arrLength = installmentMonth.length
         const value=arrLength>1?((arrLength-1-index)/(arrLength-1))*100:0;
         return { value, label:product }
 }) 


 if(dumProductsMonth.length>0){
      setMonthForSlider(dumProductsMonth)
      setInstallement(dumProductsMonth[0].label)
    }
   }, [buckets, paymantType])
   
    
useEffect(async () => {
  if(customerId){
    const adresses=await agent.BucketRelated.getCustomerAddress(customerId)
 setCustomerAdress(adresses)
}
}, [customerId])

 
   const WholePrice=products.reduce(
    (previousValue, currentValue) =>{
       return previousValue + currentValue.price*currentValue.count
       },
    0
  )
 
  function valuetext(value) {
if(monthForSlider.find((marks)=> marks.value === value))
    return monthForSlider.find((marks)=> marks.value === value).label + " Ay";
}

 
function valueLabelFormat(value){
    if(monthForSlider.find((marks)=> marks.value === value)?.label)
    return  monthForSlider.find((marks)=> marks.value === value).label + " Ay";
}

 
const getSlideData = (event, newValue) => {
if (monthForSlider.length>0) {
    var slideValue = (monthForSlider.find((marks)=> marks.value === newValue).label);
     setInstallement(slideValue)
  }
}

     const submitFuncion= async (e)=>{
         e.preventDefault()
if(shertler){
    const adressIdArray=[]
    const unvanAddObject={}
    unvanForm.forEach(async (unvan, index, array)=>{
         if(unvan.addressId==null){
           const addressResponse=await agent.BucketRelated.postUserAdress({
            userId,
            "recordStatus": 0,
            "regionId": unvan.rayon?parseInt(unvan.rayon):parseInt(unvan.seher),
            "address": unvan.unvan,
            "description":unvan.elaveMelumat,
             customerId
          })
          adressIdArray.push(addressResponse.AddressId)
              unvan.productId.forEach(productId=>unvanAddObject[productId]={unvanId:addressResponse.AddressId, deliveryTime:unvan.tarix})
              

          }else {
             adressIdArray.push(unvan.addressId)
               unvan.productId.forEach(productId=> unvanAddObject[productId]={unvanId:unvan.addressId, deliveryTime:unvan.tarix} )
           }
          if(adressIdArray.length==array.length) {
                const proformaDetails=products.map((product)=>{
                 return  {
                            'productId': product.productId,
                            'productName': product.title,
                            'providerId': product.providerId,
                            'providerName': product.providerName,
                            'qty': +product.count,
                            'productPriceId': product.productPriceId,
                            'price': product.price,
                            'totalPrice': product.totalPrice,
                            'installmentMonthId': product.insallmentMonthId,
                            'month': Installement,
                            'percent': percent,
                            'deliveryDate': unvanAddObject[product.id].deliveryTime,
                            'deliveryTime': unvanAddObject[product.id].deliveryTime.split("T")[1],
                            'customerAddressId':  unvanAddObject[product.id].unvanId ? parseInt(unvanAddObject[product.id].unvanId):parseInt(adressIdArray[0])
              }})

        const sebetbadget= await agent.BucketRelated.CreateNewProforma({
            'type': paymantType=="incash"? false:true,
             customerId,
            'name': musteriMelumatiForm.Ad,
            'family': musteriMelumatiForm.Soyad,
            'code':musteriMelumatiForm.FIN,
            'idCardNumber': musteriMelumatiForm.Seriya,
            'cellPhone': musteriMelumatiForm.Telefon,
            'docDate':new Date().addHours(4),
            'saleYear': 0,
            'description': 'string',
            'validity': 0,
            'totalPrice': WholePrice,
            'totalNetPrice': WholePrice,
            'totalQty': products.length,
            'totalDiscount': 0,
            'discount': 0,
            'cargoId': 0,
            'currencyId': 0,
             userId,
            'callDate':musteriMelumatiForm.uygunGun,
            'callTime': musteriMelumatiForm.uygunGun.split("T")[1],
             proformaDetails
         })
          if(sebetbadget.Message.includes("succesfully!")){
               Swal.fire({
                title: 'Təbriklər sifarişiniz uğurla əlavə edildi!',
                icon: 'success',
                confirmButtonText: 'Çıxış'
              }).then((result) => {
                 if (result.isConfirmed) {
                     dispatch(deleteAll())
                     navigate(`/profil`)
                 }  
              })
         }
 
         }
      })
    }
  }
   useEffect(() => {
     products.forEach((product)=>{
        if(product.month==Installement){
            setPercent(product.percent)
        }
      })
}, [Installement])

  
const productPriceCalc=(product)=>{
    if(paymantType=="credit"){
       return  product.count * (product.price+(product.price*product.percent/100))
    }
    return product.price
}
           return(
         <form onSubmit={submitFuncion} className="checkout-sec wf-section">
            <div className="dv-wrapper">
                  <div className="w-layout-grid checkout-form">
                    <div id="w-node-_9e5d67c8-812c-c026-dcaa-a2112c7b6dc2-a834c1dd" className="check-left">
                    <div  className="order-itm-list">
                                <div className="block-header">
                                    <h4 className="checkout-heading">Sifarişdə olan məhsullar</h4>
                                </div>
                         {
                             products.map((product)=> {
                                 return <div key={product.id} className="block-content">
                                     <div className="order-item-list">
                                    <div className="item-block-list">
                                        <div className="order-itm-li">
                                        <div className="product-img-block">
                                             <img src={"https://cdn.otomall.az/"+product.image} loading="lazy" sizes="(max-width: 479px) 20vw, 96px"  alt="" className="product-image" />
                                        </div>
                                        <div className="order-itm-dtls">
                                            <div className="order-itm-name">{product.title}</div>
                                         </div>
                                        <div className="order-itm-price">{ productPriceCalc(product) } AZN </div>
                                        </div>
                                        <div className="order-item-divider"/>
                                        <div className="w-layout-grid product-details">
                                        <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5cf-a834c1dd" className="details">
                                            <div className="material">
                                            <div className="dtls-name">Material:</div>
                                            <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5d3-a834c1dd" className="dtls-value" dangerouslySetInnerHTML={{__html: decode(product.material)}}></div>
                                            </div>

                                            <div className="material">
                                            <div className="dtls-name">Ölçü:</div>
                                            <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5d3-a834c1dd" className="dtls-value">{product.size}</div>
                                            </div>


 
 
                                             <div className="dtls">
                                            <div className="dtls-name">Rəng:</div>
                                            <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5d8-a834c1dd" className="dtls-value">  <div style={{backgroundColor:"#"+product.color.split("#")[1]}} className="kvadrat"></div></div>
                                            </div>
                                            <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5da-a834c1dd" className="color w-form">
                                            <form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get" className="color-fm">
                                             </form>
                                            <div className="w-form-done" />
                                            <div className="w-form-fail" />
                                            </div>
                                            <div className="quantity-num-checkout">
                                            <div id="w-node-ce2d3b09-4799-19bc-034f-8c7c18bbf5ec-a834c1dd" className="quantity-bar">
                                                <div className="dtls-name">Say: </div>
                                                <div className="det-quantity w-embed">
                                                <input style={{paddingLeft: '1rem'}} pattern="^[0-9]+$" inputMode="numeric" className="crt-quantity"   disabled value={product.count} type="number" name="quantity" defaultValue={1} min={1} max={10} />
                                                 </div>
                                            </div>
                                        
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                              })
                         }
                </div>
 {paymantType!="credit" &&
                        <div className="customer-info">
                        <div className="block-header">
                            <h4 className="checkout-heading">Müştəri məlumatı </h4>
                            <div className="required">* Tələb olunur</div>
                        </div>
                        <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                            <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Telefon *</label>
                                <InputMask value={musteriMelumatiForm.Telefon} onChange={musteriMelumatChange} name="Telefon" className="form-log-inp w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" required />
                             </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Ad *</label>
                                <input type="text" name="Ad" value={musteriMelumatiForm.Ad} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity name-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Soyad *</label>
                                <input type="text" name="Soyad" value={musteriMelumatiForm.Soyad} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity last-lb" />
                            </div>
                            </div>
                            <div className="w-commerce-commercecheckoutrow block-row">
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">FIN</label>
                                <input type="text" name="FIN" value={musteriMelumatiForm.FIN} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Seriya nömrəsi</label>
                                <input type="text" name="Seriya"  value={musteriMelumatiForm.Seriya} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Email</label>
                                <input type="text" name="Email" value={musteriMelumatiForm.Email} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            </div>
                        </fieldset>
                        </div>

}
 
 {paymantType=="credit" &&
                         <div className="customer-info">
                        <div className="block-header">
                            <h4 className="checkout-heading">Müştəri məlumatı </h4>
                            <div className="required">* Tələb olunur</div>
                        </div>
                        <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                            <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Telefon *</label>
                                 <InputMask value={musteriMelumatiForm.Telefon} onChange={musteriMelumatChange} name="Telefon" className="form-log-inp w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" required />

                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Ad *</label>
                                <input type="text" name="Ad" value={musteriMelumatiForm.Ad} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity name-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Soyad *</label>
                                <input type="text"  name="Soyad" value={musteriMelumatiForm.Soyad} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity last-lb" />
                            </div>
                            </div>
                            <div className="w-commerce-commercecheckoutrow block-row gap-b-16">
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">FIN *</label>
                                <input type="text"  name="FIN" value={musteriMelumatiForm.FIN} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Seriya nömrəsi *</label>
                                <input type="text"  name="Seriya" value={musteriMelumatiForm.Seriya} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Email</label>
                                <input type="text"  name="Email" value={musteriMelumatiForm.Email} onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                            </div>
                            <div className="w-commerce-commercecheckoutrow block-row">
                            <div className="w-commerce-commercecheckoutcolumn block-column gap-b-16">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Whatsapp nömrəsi*</label>
                                 <InputMask name="Whatsapp" value={musteriMelumatiForm.Whatsapp} onChange={musteriMelumatChange} className="form-log-inp w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" required />
                            </div>
                            <div className="w-commerce-commercecheckoutcolumn block-column">
                                <label className="w-commerce-commercecheckoutlabel cs-label">Whatsapp zəngi üçün uyğun vaxt *</label>
                                <input type="datetime-local"   min={NewDateForInput()}  name="uygunGun" value={musteriMelumatiForm.uygunGun}  onChange={musteriMelumatChange} required className="w-commerce-commercecheckoutshippingcity dist-lb" />
                            </div>
                          
                            </div>
                        </fieldset>
                        </div>
 
 }
   {products.length>0 && unvan.map((element)=><UnvanForm key={element} setUnvanForm={setUnvanForm} products={products} unvanForm={unvanForm} element={element} unvanIncrease={unvanIncrease} customerAdress={customerAdress} setProducts={setProducts} unvan={unvan} setUnvan={setUnvan} />
  )
 }
                         </div>
                     <div id="w-node-c75e0096-0b9f-d7e9-ced1-6ff80f248fb7-a834c1dd" className="check-right">
                    {monthForSlider.length> 1 &&  <div id="w-node-_0a34a7a5-f4d3-868b-8f10-dbd2dc2e45e5-a834c1dd" className="credit-calc">
                         <label className="w-commerce-commercecheckoutlabel month-label">Ay *</label>
              
                           <Box sx={Slide}>
                                                <Slider
                                                    aria-label="Restricted values"
                                                    defaultValue={100}
                                                    valueLabelFormat={valueLabelFormat}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={null}
                                                    marks={monthForSlider}
                                                    onChange={getSlideData}
                                                />
                          </Box>
                        </div>}
                          <div className="discount">
                        <label className="w-commerce-commercecheckoutlabel cs-promo">Promokod *</label>
                        <input type="text" name="address_city"  className="w-commerce-commercecheckoutshippingcity cs-promo-input" />
                        <a href="#" className="diss-apply w-button">Daxil edin</a>
                        </div>
                        <div id="w-node-edbc360d-b954-77ec-8f19-7aa5cbdb411d-a834c1dd" className="order-summary">
                        <div className="block-header">
                            <h4 className="checkout-heading">Sifarişin detalları</h4>
                        </div>
                        <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                            <div className="summary-line">
                            <div className="sum-name">Məhsulların qiyməti</div>
                            <div className="sum-price">{WholePrice} AZN </div>
                            </div>
                             <div className="summary-line">
                            <div className="sum-name">Çatdırılma</div>
                            <div className="sum-price">Pulsuz</div>
                            </div>

 
                         {paymantType=="credit" && <div className="summary-line">
                            <div className="sum-name">Aylara bölünmə</div>
                            <div className="sum-price">{Installement} Ay</div>
                            </div>}

                            {  paymantType=="credit" &&  <div className="summary-line">
                            <div className="sum-name">Aylıq ödəniş </div>
                            <div className="sum-price">{WholePrice/Installement?((WholePrice+ WholePrice*percent/100)/Installement).toFixed(2):0} AZN</div>
                            </div>}
                            <div id="w-node-_36e6c2c7-a1d1-c9ca-1fe7-082266802aad-a834c1dd" className="sum-divider" />
                            <div className="total-line">
                            <div className="total-sum">Toplam qiymət:</div>
                            <div className="sum-price">{(WholePrice+ WholePrice*percent/100).toFixed(2) } AZN </div>
                            </div>
                        </fieldset>
                        </div>

                         <div className="istifadeci">
                          <input onChange={(e)=>setShertler(e.target.checked)} className="istifadeci__input" id="ist" required  type="checkbox" />
                        <label htmlFor="ist"> <a className="istShertleri" href="/sertler" target="_blank">İstifadəçi şərtləri</a> ilə tanış oldum</label>
                         </div>
                        <button type="submit"  id="w-node-_7f9fcd86-c814-4d8f-5549-60d08018fc84-a834c1dd"   className="sum-button w-button">Sİfarİşİ tamamla </button>
                    </div>
                    </div>
                </div>
            </form>
    )
}