import COLORS from '@/constants/COLORS'
import React from 'react'
import styled from 'styled-components'
type Props = {
    name: string
    picture: string,
    [x:string]:any
  }
  

  const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  `
  const Avatar = ({ name, picture, ...props }: Props) => {
    return (
      <div className="flex ac" {...props}>
        <Image style={{objectFit:"cover"}} src={picture} className="rounded-full mr-4" alt={name} />
        <div className="p font-light" style={{color:COLORS.BLACKGREY}}>{name}</div>
      </div>
    )
  }
  
  export default Avatar