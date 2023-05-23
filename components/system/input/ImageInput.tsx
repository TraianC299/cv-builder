import React, {  useRef } from 'react'



// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(datas:string, widthSize:number) {
  return new Promise(async function (resolve, reject) {

    // We create an image to receive the Data URI
    var img = document.createElement('img');
    let newWidth = 0
    let newHeight = 0

    // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
      let totalPixels = 300001
      // We create a canvas and get its context.
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const newImage = document.createElement('img');
      newImage.src = datas
      newWidth = newImage.width
      newHeight = newImage.height
      const proportion= newHeight/newWidth
     
      while(totalPixels>300000){
        newWidth = widthSize
        newHeight = widthSize* proportion
        totalPixels = newWidth*newHeight
      }
      // We set the dimensions at the wanted size.
     
      canvas.width = newWidth ;
      canvas.height = newHeight ;

      // We resize the image with the canvas method drawImage();
      if(ctx)
      ctx.drawImage(newImage, 0,0, newWidth, newHeight );

      const dataURI = canvas.toDataURL();

      // This is the return of the Promise
      resolve(dataURI);
    };

    // We put the Data URI in the image's src attribute
    img.src = datas;

  })
}// Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);

export function dataURLtoFile(dataurl:string, filename:string) {
 
      var arr = dataurl.split(','),
      // @ts-ignore
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}



const fileToDataUri = (image:Blob) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        res(reader.result)
    });
    reader.readAsDataURL(image);
  })
}

const ImageInput = ({children, loading, setLoading, setImageUrl, resize}:{imageUrl:string, setImageUrl:Function, children:React.ReactNode, resize?:number, loading:boolean, setLoading:React.Dispatch<boolean>}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);


  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(hiddenFileInput.current){
      hiddenFileInput.current.click();
    }
  };



 
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
      // @ts-ignore
  const handleChange = async (e) => {
    if (e.target.files.length > 0) {
      setLoading(true)
      const file = e.target.files[0];
      try{
        
        const dataUri = await fileToDataUri(e.target.files[0])
        // @ts-ignore
        const resizedImage = await resizedataURL(dataUri, resize) 
        // @ts-ignore
        const resizedFile =  dataURLtoFile(resizedImage, file.name) 
        const formData = new FormData();
        formData.append('file', resizedFile);
    
        await fetch(`http://localhost:3000/api/image/upload`, {
          method: 'POST',
          body: formData,
        })
        .then((res) => res.json())
        .then((jsonRes) => {
            setLoading(false)
            setImageUrl(jsonRes.data.url)
          })
      }catch(e){
        console.log(e)
      }

    }
  };



  return(
    <>
    <div style={{width:"100%"}} onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>handleClick(e)}>{children}</div>
    
    <input
      type="file"
      ref={hiddenFileInput}
      onChange={(e)=>handleChange(e)}
      style={{display: 'none'}}
    />
  </>
  )
}


export default ImageInput