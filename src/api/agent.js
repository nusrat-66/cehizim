import axios from "axios";
import jwt_decode from "jwt-decode";
 
  axios.defaults.baseURL = "https://apis.digimall.az/api";
    
 const BucketRelated = {
   getCities: (id) => {
    let endPoint=''
   if(id){
       endPoint=`?parentId=${id}`
   }
 return  axios.get(`Customers/GetRegions`+endPoint,  
    {headers: { 'api-key': "e4246c59-4357-4c5e-a5a9-af4307c4f751"}})
  .then((responseBody=>{
       if(responseBody.status==200){
           return responseBody.data
      } 
  }))
},
 postUserAdress:(data)=>{
       return axios.post(`Customers/NewCustomerAddress`, data, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`}})
     .then((data)=>{
        return data.data
 
     })
 },

 getCustomerAddress:(id) =>{
   return axios.get(`/Customers/GetCustomerAddressByCustomerId?customerId=${id}`, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
  .then((data)=>{
        return data.data
  })
},
deleteCustomerAddress:(id) =>{
  return axios.delete(`https://apis.digimall.az/api/Customers/DeleteCustomerAddress/${id}`, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},

 CreateNewProforma:(data) =>{
  return axios.post(`/Customers/CreateNewProformaForCehizim`,data, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},

 getCreditSettingsById:(id) =>{
  return axios.get(`/Cehizim/GetCreditSettingMonthByCreditSettingId/${id}`, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},
 
getCustomerProducts:(customerId) => {
  return axios.get(`https://apis.digimall.az/api/Customers/GetCustomersRequestReport/${customerId}`, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},

getCustomerAddressForCehizim:(id) =>{
  return axios.get(`/Customers/GetCustomerAddressesByCustomerIdForCehizim?customerId=${id}`, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},

updateAdressStatus:(body) =>{
  return axios.put(`/Customers/UpdateCustomerAddressStatus`,body, {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B",  'Authorization' : `Bearer ${localStorage.getItem('token')}`,}})
 .then((data)=>{
       return data.data
 })
},


 }



const WishListRelated = {
  getelementById: (id) => {
 return  axios.post(`Queries/ProductFieldSearchForCehizim`, {productsId:id, languageId:19},
   {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
 .then((responseBody=>{
      if(responseBody.status==200){
          return responseBody.data
     } 
 }))
}



 }


const ProfilRelated = {
  changePassword: (body) => {
 return  axios.post(`https://identity.digimall.az/api/Password/ResetPasswordByUser`, body,
   {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
 .then((responseBody=>{
      if(responseBody.status==200){
          return responseBody.data
     } 
 }))
},
 loginVerify: (body) => {
  return  axios.post(`https://identity.digimall.az/api/loginWithVerify`, body,
    {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
  .then((responseBody=>{
       if(responseBody.status==200){
           return responseBody.data
      } 
  }))
 },

}




const ProductRelated = {
  advanceSearch: (body) => {
 return  axios.post(`https://apis.digimall.az/api/Queries/CehizimAdvanceSearch`, body,
   {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
 .then((responseBody=>{
      if(responseBody.status==200){
          return responseBody.data
     } 
 }))
},

relatedProducts: (body) => {
  return  axios.post(`/Queries/CehizimRelatedProducts`, body,
    {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B", 'Authorization' : `Bearer ${localStorage.getItem('token')}`}})
  .then((responseBody=>{
       if(responseBody.status==200){
           return responseBody.data
      } 
  }))
 }
 }



 const CampaniyaRelated = {
  getCampaign: (id) => {
 return  axios.get(`https://apis.digimall.az/api/Products/GetCampaignItemsByCampaignId?campaignId=${id}`,
   {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
 .then((responseBody=>{
      if(responseBody.status==200){
          return responseBody.data
     } 
 }))
},
 
getNewest: (id) => {
  return  axios.get(`https://apis.digimall.az/api/Cehizim/GetNewestProductById/${id}`,
    {headers: { 'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B"}})
  .then((responseBody=>{
       if(responseBody.status==200){
           return responseBody.data
      } 
  }))
 },
 
}

const UserNotifications = {
  listAll: () => {
    var token = jwt_decode(localStorage.getItem("token"));
    var lastVersionOfToken = token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return axios({
      method: 'post',
      baseURL: `https://apis.digimall.az/api/Cehizim/GetCustomerNotifications`,
      data: {
        skip : 0,
        take: 10,
        destinationUserId: lastVersionOfToken
      },
      headers: {
        'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B", 
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((responseBody=> {
      if(responseBody.status==200){
        return responseBody.data
      } 
    }))
  },
  read: (id) => {
    var token = jwt_decode(localStorage.getItem("token"));
    var lastVersionOfToken = token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return axios({
      method: 'put',
      baseURL: `https://apis.digimall.az/api/Cehizim/UpdateCustomerNotificationView`,
      data: {
        id : id,
        destinationUserId: lastVersionOfToken
      },
      headers: {
        'api-key': "620C471E-05CC-4D90-9817-B7A3EED57E1B", 
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((responseBody=> {
      if(responseBody.status==200){
        return responseBody.data
      } 
    }))
  },

}
  
  
const agent = {
    BucketRelated,
    WishListRelated,
    ProfilRelated,
    ProductRelated,
    CampaniyaRelated,
    UserNotifications
   };

export default agent;
 