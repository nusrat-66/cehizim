import SliderImage from 'react-zoom-slider';
import React from 'react'

function Index({images}) {

 

 

 
  return (
    <div className='detailedSlider'>

  {images.length>0 &&    <SliderImage 
      data={images} 
      width="500px" 
      showDescription={true} 
      direction="right" 
    />}
    </div>
   )
}

export default Index










