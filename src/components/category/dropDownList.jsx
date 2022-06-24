import React, {useState, useEffect} from 'react'
import AddIcon from '../../assets/images/add.svg';
import { useNavigate, useParams } from 'react-router-dom';
  
function DropdownList({category, filterCategory, setFilterCategory, setCatName, setSubCatName}) {
const navigate=useNavigate()
const [dropDownOn, setDropDownOn]=useState(false)

const params=useParams()





const checkIfSubIn=(id, subs)=>{
  let returnValue=false
   subs.forEach(element => {
    if(element.id==id){
      returnValue=element.name
    }
  });
  return returnValue;
}

useEffect(() => {
  const id =params.cate.split("-")[1]
  const subName=checkIfSubIn(id, category.subCategories)
if((id==category.id) ||subName) {
   setCatName(category.name)    

   setDropDownOn(true)
   if(subName){
   setSubCatName(subName)}
   else{
    setSubCatName(null)
   }
   return
}
setDropDownOn(false)
 }, [params, category])


 const dropClick=()=>{
    setDropDownOn(!dropDownOn)
}
const filterCat=()=>{
    setFilterCategory({type:true, payload:category.id})
    navigate(`/category/cat-${category.id}`)
}

const filterSub=(id)=>{
    setFilterCategory({type:false, payload:id})
    navigate(`/category/sub-${id}`)
}

const categoryClass=filterCategory.payload==category.id?"fltr-item-h fltr-item-h_sp fltr-item-h_hover":"fltr-item-h fltr-item-h_sp"
const subCategoryClass= (id)=> filterCategory.payload==id?"pointer fltr-dp-list text-sm w-dropdown-link fltr-item-h_hover":"pointer fltr-dp-list text-sm w-dropdown-link"

const plusIconClass=dropDownOn?'SubCategoryExpanded':""
const subClass=dropDownOn?'fltr-drpdown fltr-drpdown_block w-dropdown-list':"fltr-drpdown w-dropdown-list"   
  return (
    <li className="fltr-item">
    <div data-hover="false" data-delay="{0}" className="fltr-drp w-dropdown">
        <div className="fltr-toggle w-dropdown-toggle">
            <div onClick={filterCat} className={categoryClass}>{category.name}</div>
             <div onClick={dropClick} className={plusIconClass}>
             <svg className="add-icon wh-24 " width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.43848 12.5469H18.8132" stroke="#383838" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.626 18.5469V6.54688" stroke="#383838" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
          </div>
        <nav className={subClass}>
    {category.subCategories.map((sub, index)=><a key={index} onClick={()=>filterSub(sub.id)} className={subCategoryClass(sub.id)}>{sub.name}</a>)}
         </nav>
    </div>
 </li>
  )
}

export default DropdownList;