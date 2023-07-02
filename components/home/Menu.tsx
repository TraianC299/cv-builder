import React, { useEffect } from 'react'
import styled from 'styled-components'
import LogoSvg from "../../assets/svg/logo.svg"
import MenuSvg from "../../assets/svg/menu.svg"
import MenuLogo from "../../assets/svg/menuLogo.svg"
import Link from 'next/link'
import { useRouter } from "next/router";
import { Button } from '../../styles/global'
import { useTranslation } from 'next-i18next'
import {GrFormClose} from 'react-icons/gr'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import COLORS from '@/constants/COLORS'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'
import Collapse from '../system/utilities/Collapse'
import OptionSelector from '../system/input/OptionSelector'
import useDidMountEffect from 'hooks/useDidMountEffect'
import LANGUAGES from '@/constants/LANGUAGES'



const Header = styled.nav`
width: 100%;
padding:1rem;
background: ${COLORS.WHITE};
max-width: 1400px;



`

const Container = styled.div`
width: 100%;
margin:auto;
display: flex;
align-items: center;
justify-content: space-between;`

const MobileMenuButton = styled(Button)`
column-gap: 8px;
line-height: 1;
@media ${MEDIAQUERIES.laptopSmall}{
    display: none;
}
`


const LogoContainer = styled(Link)`
>svg{
    height: 2rem;
    width: auto;
}
`

const DesktopMenuLinksContainerStyles = styled.div`
display: none;
@media ${MEDIAQUERIES.laptopSmall}{
margin: auto;
margin-left:3rem;
display: flex;
align-items: center;
justify-content: flex-start;
column-gap: 2rem;
width: 100%;
}`


const Menu = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const router = useRouter();
    const [stuck, setStuck] = React.useState(false)
    const {t} = useTranslation()


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
    <div className='w-full sticky flex ac jc' style={{background:"white", position: 'sticky', top:0, zIndex:999}}>
        <Header
        id="header"
        className={stuck?"stuck transition sectionPadding":"not-stuck transition sectionPadding"}
        >
            <Container   className='flex'>
               <LogoContainer href="/" id="logo">
                       <LogoSvg style={{cursor:"pointer"}} ></LogoSvg>
               </LogoContainer>
               <DesktopMenuLinksContainerStyles>
                <DesktopMenuItem  link="/about-us">{t("about-us")}</DesktopMenuItem>
                <DesktopMenuItem link="/blog">{t("blog")}</DesktopMenuItem>
                <DesktopMenuItem link="/services" submenu={
                    <>
                    {LANGUAGES.map(language=>(
                    <Link key={language.locale} className={router.locale === language.locale ? "active" : ""} href={router.pathname} locale={language.locale}>{language.emoji}  {t(language.translationKey)}</Link>
                    ))}
                    </>
                }>
                   {t("language")}
                </DesktopMenuItem>
            
                <div className='flex-1'></div>
                {/* <div style={{
                    maxWidth: "200px",
                }}>
                    <OptionSelector
                  value={"ro"}
                    options={LANGUAGES.map(el=>({
                        value: el.locale,
                        label: `${el.emoji} ${el.label}`
                    }))}></OptionSelector>
                </div> */}
                <Link href={"/create-cv"}><Button >{t("start-now")}</Button></Link>
        
               </DesktopMenuLinksContainerStyles>
                <MobileMenuButton onClick={()=>setOpenMenu(previous=>!previous)} className='flex center'><MenuSvg/>Menu</MobileMenuButton>
                   <MobileMenuModal open={openMenu} setOpen={setOpenMenu}></MobileMenuModal>
            </Container>
        </Header>
    </div>
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
     
        <MenuItem  className={!submenu && router.pathname.includes(link) ? 'active desktop-link': "desktop-link"} >
            <Link className={router.pathname.includes(link) ? 'active desktop-link': "desktop-link"} href={submenu?"":link}>{children}</Link>
        {submenu && <SubMenuContainer className='shadow-md'>
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
transform: translateY(-10%);
transition: all 0.15s ease-in-out;
pointer-events: none;
border-radius: 0.5rem;

>a{
padding-left: 0.75rem;
display: flex;
align-items: center;
justify-content: flex-start;
font-size: 0.9rem;
margin:auto;
width: 100%;
cursor:pointer;
@media ${MEDIAQUERIES.laptopSmall}{
    height:3rem;
    :hover{
    background: ${COLORS.MAINCOLOR}10;
}
}
}

`



const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height:2.5rem;
    padding: 0 1rem;
    cursor: pointer;
    position: relative;
    border-radius: 0.25rem;

    ::after{
        content: "";
        position: absolute;
        top:100%;
        left: 0;
        width:100%;
        height:2rem;
    }
    :hover{
        background: ${COLORS.MAINCOLOR}10;
        color: ${COLORS.MAINCOLOR};

        >div{
            opacity:1;
            transform: translateY(0%);
            pointer-events: all;
        }
        >svg{
            transform: scale(1.1);

        }
    }
    a{
        border-radius: 0.25rem;
        color: ${COLORS.BLACKGREY};
    }
    &.active, .active{
        position: relative;
        background: ${COLORS.MAINCOLOR};
        color: ${COLORS.WHITE} !important;
        overflow: hidden;
        :hover{
            background: ${COLORS.MAINCOLOR};
            color: ${COLORS.WHITE};
        }

    }
`












const MobileMenuModalHeaderStyles = styled(Container)`
margin:0;
position: auto;
background: transparent;
padding:0.75rem 1rem;
>svg{
    cursor: pointer;
}`

interface MobileMenuModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
} 


const  MobileMenuModal:React.FC<MobileMenuModalProps> = ({open, setOpen}) => {
    const [openServices, setOpenServices] = React.useState(false)
    const {t} = useTranslation()

    
    return(
        <MobileMenuModalStyles className={open? "open transition" : 'transition'} style={{opacity: open? 1 : 0, transform: `translateY(${open?0:"-2rem"})`}}>
            <MobileMenuModalHeaderStyles style={{position: "static"}} className='flex'>
           <LogoContainer aria-label={"Home"} href="/" id="logo">
               <MenuLogo />
           </LogoContainer>
       <Button onClick={()=>setOpen(previous=>!previous)} className='flex center' style={{columnGap:"10px", background:"white", color:COLORS.BLACKGREY}}>
        {("Close")}<GrFormClose className='h6'/>
        </Button>
    </MobileMenuModalHeaderStyles>
    <MobileLinkContainerStyles>
        <MobileLinkStyles>
            <Link href="about-us" className='main-title'>
                {("About us")}
            </Link>
        </MobileLinkStyles>
        <MobileLinkStyles><Link href="/blog" className='main-title'>{("Blog")}</Link></MobileLinkStyles>
        <MobileLinkStyles onClick={()=>setOpenServices(previous=>!previous)}>
            <div className='main-title'>{t("language")}{openServices?<BiChevronUp/>:<BiChevronDown/>}</div>
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
background: ${COLORS.MAINCOLOR};
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
padding: 1rem;
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



