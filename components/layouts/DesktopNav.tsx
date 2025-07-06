import React, { useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Button } from '../../styles/global'
import { useTranslation } from 'next-i18next'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import COLORS from '@/constants/COLORS'
import LANGUAGES from '@/constants/LANGUAGES'
import OptionSelector from '../ui/input/OptionSelector'
import useRewrites from 'hooks/useRewrites';
import { LanguageType } from 'interfaces/lang.types';



const Header = styled.header`
width: 100%;
padding:1rem;
background: ${COLORS.WHITE};
max-width: 1400px;
margin:auto;
display: flex;
align-items: center;
justify-content: space-between;
@media ${MEDIAQUERIES.mobileSmallPortrait}{
    display: none;
}
`



const LogoContainer = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
min-width: 6rem;
font-weight: 600;
font-size: 1.2rem;
p{

    font-style: monospace !important;
}
>svg{
    height: 2rem;
    width: auto;
}
`

const DesktopMenuLinksContainerStyles = styled.nav`
display: none;
@media ${MEDIAQUERIES.laptopSmall}{
margin: auto;
margin-left:3rem;
display: flex;
align-items: center;
justify-content: flex-start;
width: 100%;
}`


const DektopNav = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const router = useRouter();
    const { t } = useTranslation("common")
    const { rewrite } = useRewrites();


    useEffect(() => {
        if (openMenu) {
            setOpenMenu(previous => !previous);
        }
    }, [router.asPath]);





    return (
        <Header id="header">
            <LogoContainer href="/" id="logo">
                {/* <LogoSvg style={{ cursor: "pointer" }} ></LogoSvg> */}
                <p className='w-full'>CV Builder</p>
            </LogoContainer>
            <DesktopMenuLinksContainerStyles>
                <div className='flex ac jc gap-8'>
                    <DesktopMenuItem link={"/about-us"}>{t("about-us")}</DesktopMenuItem>
                    <DesktopMenuItem link="/blog">{t("blog")}</DesktopMenuItem>
                </div>
                <div className='flex-1'></div>
                <div className='flex ac jc gap-4'>
                    <DesktopLanguageSelector />
                    <Link href={rewrite("/creeaza-cv")}><Button>{t("start-now")}</Button></Link>
                </div>
            </DesktopMenuLinksContainerStyles>
        </Header>
    )
}




type DesktopMenuItemProps = {
    children: React.ReactNode,
    link: string,
    submenu?: React.ReactNode
}

const DesktopLanguageSelector = () => {
    const router = useRouter();
    const { t } = useTranslation("common")
    const { rewrite } = useRewrites();
    const onChange = (v: LanguageType) => {
        router.push(rewrite(router.pathname as LanguageType, v), rewrite(router.pathname as LanguageType, v), {
            locale: v,
        })
    }
    return (
        <div style={{
            width: "fit-content",
        }}>
            <OptionSelector
                className='small'
                onChange={onChange}
                value={router.locale} label=''
                options={LANGUAGES.map(el => ({ value: el.locale, label: `${el.emoji} ${t(el.translationKey)}` }))} />
        </div>
    )
}



const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({ children, link, submenu }) => {
    const router = useRouter();
    const { rewrite } = useRewrites();

    return (
        <MenuItem className={`desktop-link p font-regular ${!submenu && router.pathname.includes(link) ? 'active' : ''}`} >
            <Link className={router.pathname.includes(link) ? 'active desktop-link' : "desktop-link"} href={submenu ? "" : rewrite(link)}>{children}</Link>
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
    cursor: pointer;
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
     

        >div{
            opacity:1;
            transform: translateY(0%);
            pointer-events: all;
        }
        >svg{
            transform: scale(1.1);

        }
    }
    
    &.active{
        color: ${COLORS.MAINCOLOR};
        position: relative;
        border-bottom: 2px solid ${COLORS.MAINCOLOR};
        overflow: hidden;
    
    }
`


export default DektopNav