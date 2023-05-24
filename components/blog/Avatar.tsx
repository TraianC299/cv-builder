import React from 'react'
import styled from 'styled-components'
import { BLACKGREY } from '../../data/contants'
type Props = {
    name: string
    picture: string
  }
  

  const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  `
  const Avatar = ({ name, picture }: Props) => {
    return (
      <div className="flex ac">
        <Image style={{objectFit:"cover"}} src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
        <div className="h6 font-semibold" style={{color:BLACKGREY}}>{name}</div>
      </div>
    )
  }
  
  export default Avatar