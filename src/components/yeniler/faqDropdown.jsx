import React, {useState} from 'react'
import DownIMG from '../../assets/images/icon-down.svg';



function FaqDropdown({children, title}) {
    const [dropOn, setDropOn] = useState(false)

    const clickFucktion=()=>{
        setDropOn(!dropOn)
    }

  const dropNavClass=dropOn?"accordion__drNav accordion-content w-dropdown-list accordion__drNav_open":"accordion__drNav accordion-content w-dropdown-list" ;

  return (
    <div data-hover="false" data-delay={0} data-w-id="d0e0a2fe-3aa6-0137-09bc-90bece79b743" className="accordion w-dropdown" style={{}}>
                    <div onClick={clickFucktion} data-w-id="d0e0a2fe-3aa6-0137-09bc-90bece79b744" className="accordion-toggle w-dropdown-toggle" id="w-dropdown-toggle-15" aria-controls="w-dropdown-list-15" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                    <div className="icon-block">
                        <img src={DownIMG} loading="lazy" alt="" className="accord-icon" style={{transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}} />
                        <div style={{transform: 'translate3d(-101%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}} className="accord-line" />
                    </div>
                    <div className="accord-p" style={{transform: 'translate3d(0em, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}}>{title}</div>
                    </div>
                    <nav className={dropNavClass}  id="w-dropdown-list-15" aria-labelledby="w-dropdown-toggle-15">
                    <div className="accord-inner">
                        {children}
                    </div>
                    </nav>
                </div>
  )
}

export default FaqDropdown