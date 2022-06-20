import React, {useState} from 'react'
import AddIcon from '../../../assets/images/add.svg';

function RengDropDown() {
     const [dropDownOn, setDropDownOn]=useState(false)
     const dropClick=()=>{
        setDropDownOn(!dropDownOn)
    }
    const plusIconClass=dropDownOn?'SubCategoryExpanded':""
    const subClass=dropDownOn?'fltr-drpdown fltr-drpdown_block w-dropdown-list':"fltr-drpdown w-dropdown-list"   

  return (
    <li className="fltr-item">
    <div data-hover="false" data-delay="{0}" className="fltr-drp w-dropdown">
        <div className="fltr-toggle w-dropdown-toggle">
            <div className="fltr-item-h">Rəng</div>
            <div className={plusIconClass}>
              <svg onClick={dropClick} className="add-icon wh-24 " width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.43848 12.5469H18.8132" stroke="#383838" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.626 18.5469V6.54688" stroke="#383838" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
        </div>
        <nav className={subClass}>
            <a className="fltr-dp-list text-sm w-dropdown-link">Mavi</a>
            <a className="fltr-dp-list text-sm w-dropdown-link">Qırmızı</a>
        </nav>
    </div>
</li>
  )
}

export default RengDropDown