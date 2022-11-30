import { ReactNode } from 'react'
import styled from 'styled-components'
import { DARKGREY } from '../../data/contants'
import { Button } from '../../styles/global'





const Header = styled.div`
  margin-bottom: 1rem;
`
const Section = ({children, title, subtitle, onClick}:{children:ReactNode, title?:string, subtitle?: string, onClick?:Function}) => {
    return(
      <section>
        <Header className='flex jsb ac'>
          <div>
            <h3 className='h5'>{title}</h3>
            <p style={{color: DARKGREY}} className='sp'>{subtitle}</p>
          </div>
          {onClick && <Button className='small' onClick={e=>{e.preventDefault();onClick()}}>+ add new</Button>}
        </Header>
        {children}
      </section>
    )
  }

  export default Section