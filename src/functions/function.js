export const dinamicFieldTaker=(dinamicField, attrId)=>{

    const dinamicObj={}
    dinamicField.forEach(element => {
        if(element.attributeId==8){
            dinamicObj.Color=element.value
        }
 
        else if(element.attributeId==11){
            dinamicObj.Size=element.value
        }
        else if(element.attributeId==10020){
            dinamicObj.Discount=element.value
        }
  
        else if(element.attributeId==10047){
            dinamicObj.image2=element.value
        }
        else if(element.attributeId==10048){
            dinamicObj.image3=element.value
        }
        else if(element.attributeId==10049){
            dinamicObj.image4=element.value
        }
    

        else if(element.attributeId==10022){
             dinamicObj.creditId=element.value
        }

        else if(element.attributeId==9){
            dinamicObj.inSale=element.value
        }
        else if(element.attributeId==10){
            dinamicObj.material=element.value
        }
    });
    return dinamicObj
}