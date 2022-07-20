import * as types from "./actionType";
import axios from "axios"
// ELAN DISPATCH

export const insertItem = (badgetData) => ({
  type: types.INSERT_ITEM,
  payload: badgetData,
});

export const deleteItem = (id) => ({
  type: types.DELETE_ITEM,
  payload: id,
});

export const deleteAll = () => ({
  type: types.DELETE_ALL,
});

export const increaseItem = (id, installment, quantity) => ({
  type: types.INCREASE_ITEM,
  payload:{ id, installment, quantity},
});

export const decreaseItem = (id) => ({
  type: types.DECREASE_ITEM,
  payload: id,
});

export const takeItemsFromStorage = () => ({
  type: types.TAKE_ITEMS_FROM_STORAGE,
});

export const countChange = (data) => ({
  type: types.COUNT_CHANGE,
  payload: data,
});
 
 
export const insertItemApi = (productId, userId) => {
  return function (dispatch){
     fetch('https://apis.digimall.az/api/Customers/CreateNewCustomerBasket',{
         method:"GET",
    
     })
     .then(res=>res.json()).then((data)=>{
          dispatch({
           type: types.ADD_WISHLIST_TO_API,
           payload:productId
          })
     })
 }
}

 


export const login = (data) => ({
    type: types.LOGIN,
    payload: data,
  });
  
  export const unLog = () => ({
    type: types.UNLOG
   });
 
   export const addWishListStorage = (id) => ({
    type: types.ADD_WISHLIST_TO_STORAGE,
    payload:id
   });
  
   export const deleteWishListStorage = (id) => ({
    type: types.DELETE_WISHLIST_FROM_STORAGE,
    payload:id
   });
  
   
   export const takeWishlistFromStorage = (id) => ({
    type: types.TAKE_WISHLIST_FROM_STORAGE,
    });

    export const addWishListApi = (body) => {
     return function (dispatch){
        fetch('https://otomallbusiness.digimall.az/api/Providers/GetProvidersForOtomall?skip=0&take=100',{
            method:"GET",
            body: JSON.stringify(body)
        })
        .then(res=>res.json()).then((data)=>{
             dispatch({
              type: types.ADD_WISHLIST_TO_API,
              payload:data.productId
             })
        })
    }
}

 export const deleteWishListApi=(productId, userId) => {
  return function (dispatch){
     fetch('https://otomallbusiness.digimall.az/api/Providers/GetProvidersForOtomall?skip=0&take=100',{
         method:"GET",
         headers:{
              'api-key':'e4246c59-4357-4c5e-a5a9-af4307c4f751',
         }
     })
     .then(res=>res.json()).then((data)=>{
          dispatch({
            type: types.DELETE_WISHLIST_FROM_API,
            payload:productId
           })
     })
 }
}


export const takeWishlistFromApi = () => ({
  type: types.TAKE_WISHLIST_FROM_API,
  });



   const getCategoriesAction = (categories) => ({
    type: types.GET_CATEGORIES,
    payload:categories
    });

    const getNotificationAction = (noteArray) => ({
      type: types.GET_NOTIFICATION,
      payload:noteArray
      });

 
  export const getCategories = () => {
    return function (dispatch){
      axios({
        method: "GET",
        baseURL: "https://apis.digimall.az/api/Cehizim/GetCategoriesWithCreditSettings",
        headers: {
            'Content-Type': 'application/json',
            'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
        },
    }).then( function(response) {
          dispatch(getCategoriesAction(response.data));
    });
   }
  }
  


  export const getNotification = (body) => {
    return function (dispatch){
 
    
    
    axios.post("https://apis.digimall.az/api/Cehizim/GetCustomerNotifications", body,  {headers: {
      'Content-Type': 'application/json',
      'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
  }}).then( function(response) {
          dispatch(getNotificationAction(response.data));
    });
   }
  }





  export const makeCredit = () => ({
    type: types.CREDIT
   });
  export const makeCash = () => ({
    type: types.INCASH 
   });
     


  export const addUnvanId = (ids) => ({
    type: types.UNVAN_ID_ADD,
    payload:ids
    });

 





//  export const getCreditMuracietler = () => {
//     var token = localStorage.getItem('token');
//     let array:any = []
//     return function(dispatch:any){
//         fetch('https://otomallbusiness.digimall.az/api/CustomerConnection/GetAllConnection',{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Bearer':String(token),
//                 'api-key': 'e4246c59-4357-4c5e-a5a9-af4307c4f751'
//             }
//         }).then(res=>res.json()).then(data=>{
//             // console.log(data, 'data kreditlere gelen');

//             for (const i of data) {
//                 if (i.connectType == 0) {
//                     array.push(i)
//                 }
//             }
//             dispatch(getCustomerConnect(array))
//         })
//     }
// }
