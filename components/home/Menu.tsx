import React, { useEffect } from 'react'
import styled from 'styled-components'
import LogoSvg from "../../assets/svg/logo.svg"
import MenuSvg from "../../assets/svg/menu.svg"
import MenuLogo from "../../assets/svg/menuLogo.svg"
import CloseSvg from "../../assets/svg/close.svg"
import ArrowSvg from "../../assets/svg/arrowDown.svg"
import Link from 'next/link'
import { useRouter } from "next/router";
import { BLACKGREY, device, shadow600, WHITE, MAINCOLOR } from '../../data/contants'
import { Button } from '../../styles/global'
import Collapse from '../general/utilities/Collapse'

const Header = styled.nav`
width: 100%;
position: fixed;
top:0;
z-index: 10;
left:0;
padding:0.75rem 1.5rem;
background: ${WHITE};

&.not-stuck{
    background: transparent;
    
    a, button{
        opacity:0;
    }
    #logo{
        opacity: 1;
    }
}

@media ${device.laptopSmall}{
    &.not-stuck{
    background: transparent;
    a, button{
        opacity:0;
    }
    #logo{
        opacity: 1;
    }
}
}
`

const Container = styled.div`
width: 100%;
max-width: 1300px;
margin:auto;
display: flex;
align-items: center;
justify-content: space-between;






.desktop-contact-us-button{
        display: none;
    }
   
@media ${device.laptopSmall} {
    #logo{
    max-width: 15rem !important;
}
    
    .desktop-contact-us-button{
        display: block;
    }
}`

const MobileMenuButton = styled(Button)`
column-gap: 8px;
line-height: 1;
@media ${device.laptopSmall}{
    display: none;
}
`


const DesktopMenuLinksContainerStyles = styled.div`
display: none;
@media ${device.laptopSmall}{
    margin: auto;
    margin-right:3rem;
    display: flex;
align-items: center;
justify-content: space-between;
column-gap: 2rem;

}`


const Menu = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const router = useRouter();
    const [stuck, setStuck] = React.useState(false)


    useEffect(() => {
        if(router.asPath==="/"){
            document.onscroll = (e) => {
                //@ts-ignore
                if(e.target.scrollingElement.scrollTop>50){
                    setStuck(true)
                    return
                }
                setStuck(false)
    
            }
        }else{
            setStuck(true)
        }
        
}, [])


    useEffect(() => {
        if (openMenu) {
            setOpenMenu(previous => !previous);
        }
      }, [router.asPath]);



  return (
    <Header
    id="header" 
    className={stuck?"stuck transition":"not-stuck transition"}

    >
        <Container   className='flex'>
           <Link href="/" id="logo">
                   <LogoSvg style={{cursor:"pointer"}} ></LogoSvg>
           </Link>
           <DesktopMenuLinksContainerStyles>
            <DesktopMenuItem  link="/about-us">{"About us"}</DesktopMenuItem>
            <DesktopMenuItem link="/blog">{"Blog"}</DesktopMenuItem>
            <DesktopMenuItem link="/services" submenu={
                <>
                <Link className={router.locale === "ro" ? "active" : ""} href="/" locale="ro">{"Romanian"}</Link>
                <Link className={router.locale === "en" ? "active" : ""} href="/" locale="en">{"English"}</Link>
                <Link className={router.locale === "ru" ? "active" : ""} href="/" locale="ru">{"Russian"}</Link>
             
                </>
            }>
                {"Language"}
            </DesktopMenuItem>
        
           </DesktopMenuLinksContainerStyles>
           <a href="https://admin.beelocals.com/login"><Button  className='desktop-contact-us-button'>{"Log in"}</Button></a>
           <MobileMenuButton onClick={()=>setOpenMenu(previous=>!previous)} className='flex center'><MenuSvg/>Menu</MobileMenuButton>
               <MobileMenuModal open={openMenu} setOpen={setOpenMenu}></MobileMenuModal>
        </Container>
    </Header>
  )
}




type DesktopMenuItemProps = {
    children: React.ReactNode,
    link: string,
    submenu?: React.ReactNode
}

const DesktopMenuItem:React.FC<DesktopMenuItemProps> = ({children,link,  submenu}) => {
    const router = useRouter();

    
    return(
     
        <MenuItem  className={router.pathname.includes(link) ? 'active desktop-link': "desktop-link"}><Link href={submenu?"":link}>{children}</Link>
        {submenu && <SubMenuContainer>
            {submenu}
         
        </SubMenuContainer>}
        </MenuItem>
    )
}

const SubMenuContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 200px;
height: fit-content;
position: absolute;
padding:0.5rem;
top: calc(100% + 1rem);
left: 0;
opacity:0;
background-color: white;
box-shadow:${shadow600};
transform: translateY(-10%);
transition: all 0.15s ease-in-out;
border-radius: 1rem;
pointer-events: none;


>a{
padding-left: 0.75rem;
display: flex;
align-items: center;
justify-content: flex-start;
font-weight: 600;
font-size: 0.9rem;
border-radius: 0.5rem;
margin:auto;
width: 100%;
color: ${MAINCOLOR};
cursor:pointer;

@media ${device.laptopSmall}{
    height:3rem;
    :hover{
    background: ${MAINCOLOR}10;
}
}
}

`



const MenuItem = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    height:2.5rem;
    padding: 0 1.5rem;
    color: ${MAINCOLOR};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    position: relative;
::after{
    content: "";
    position: absolute;
    top:100%;
    left: 0;
    width:100%;
    height:2rem;
}
:hover{
    background: ${MAINCOLOR}10;
    color: ${MAINCOLOR};

    >div{
        opacity:1;
        transform: translateY(0%);
        pointer-events: all;
    }
    >svg{
        transform: scale(1.1);

    }
}


&.active, .active{
    position: relative;
    ::before{
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        right:10px;
        background-color: ${MAINCOLOR};

        border-radius: 5px;

    }
}

    `












const MobileMenuModalHeaderStyles = styled(Container)`
margin:0;
position: auto;
background: transparent;
padding:0.75rem 1.5rem;
>svg{
    cursor: pointer;
}`

interface MobileMenuModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
} 


const  MobileMenuModal:React.FC<MobileMenuModalProps> = ({open, setOpen}) => {
    const [openServices, setOpenServices] = React.useState(false)


    
    return(
        <MobileMenuModalStyles className={open? "open transition" : 'transition'} style={{opacity: open? 1 : 0, transform: `translateY(${open?0:"-2rem"})`}}>
            <MobileMenuModalHeaderStyles style={{position: "static"}} className='flex'>
       <Link aria-label={"Home"} href="/">
           <MenuLogo />
       </Link>
       <Button onClick={()=>setOpen(previous=>!previous)} className='flex center' style={{columnGap:"10px", background:"white", color:BLACKGREY}}>
        {("Close")}<CloseSvg/>
        </Button>
    </MobileMenuModalHeaderStyles>
    <MobileLinkContainerStyles>
        <MobileLinkStyles><div className='main-title'>{("About us")}</div></MobileLinkStyles>
        <MobileLinkStyles><Link href="/blog" className='main-title'>{("Blog")}</Link></MobileLinkStyles>
        <MobileLinkStyles onClick={()=>setOpenServices(previous=>!previous)}>
            <div className='main-title'>{("language")}<ArrowSvg/></div>
            <Collapse on={openServices}>
            <MobileSubMenuContainerStyle>
                <Link href="/" locale="ro">{("Romanian")}</Link>
                <Link href="/" locale="en">{("English")}</Link>
                <Link href="/" locale="ru">{("Russian")}</Link>
            </MobileSubMenuContainerStyle>

            </Collapse>
        </MobileLinkStyles>
     
    </MobileLinkContainerStyles>
        </MobileMenuModalStyles>
    )
}






const MobileSubMenuContainerStyle = styled.div`
padding-left:1rem;
display: flex;
flex-direction: column;
row-gap: 1rem;
margin-top:0.5rem;
>a{
    color: white;
}`
const MobileMenuModalStyles = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: ${MAINCOLOR};
z-index: 2;
flex-direction: column;
align-items: center;
justify-content: flex-start;
opacity: 0;
transform: translateY(-2rem);
pointer-events: none;
&.open{
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
}
`

const MobileLinkContainerStyles = styled.div`
padding: 1.5rem;
display: flex;
flex-direction: column;
width: 100%;
row-gap: 1rem;
align-items: flex-start;
justify-content: flex-start;`

const MobileLinkStyles = styled.div`
border-bottom: 1px solid white;
width: 100%;
display: flex;
flex-direction: column;
padding-bottom: 1rem;
>.main-title{
display: flex;
align-items: center;
justify-content: space-between;
color: white;
font-size: 1.5rem;
font-weight: 500;
>svg{
    height: 20px;
}
}
`



export default Menu



