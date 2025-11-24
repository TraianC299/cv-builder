import COLORS from '@/constants/COLORS'
import LANGUAGES from '@/constants/LANGUAGES'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import useRewrites from 'hooks/useRewrites'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import { GrFormClose } from 'react-icons/gr'
import styled from 'styled-components'
import logoSvg from "../../assets/svg/logo.svg"
import menuSvg from "../../assets/svg/menu.svg"
import { Button } from '../../styles/global'
import Collapse from '../ui/utilities/Collapse'
import DropdownButton from '../ui/utilities/DropdownButton'
import Image from 'next/image'



const Header = styled.nav`
width: 100%;
padding:1rem;
background: ${COLORS.WHITE};
max-width: 1400px;

@media ${MEDIAQUERIES.laptopSmall}{
    display: none;
}



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
display: flex;
align-items: center;
justify-content: center;
>svg{
    height: 2rem;
    width: auto;
}
`




const PhoneNav = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const router = useRouter();
    const [stuck, setStuck] = React.useState(false)
    const { t } = useTranslation("common")


    useEffect(() => {
        if (router.asPath === "/") {
            document.onscroll = (e) => {
                //@ts-ignore
                if (e.target.scrollingElement.scrollTop > 50) {
                    setStuck(true)
                    return
                }
                setStuck(false)

            }
        } else {
            setStuck(true)
        }

    }, [])


    useEffect(() => {
        if (openMenu) {
            setOpenMenu(previous => !previous);
        }
    }, [router.asPath]);


    return (
        <header className='w-full sticky flex items-center justify-center' style={{ background: "white", position: 'sticky', top: 0, zIndex: 999 }}>
            <Header
                id="header"
                className={stuck ? "stuck transition sectionPadding" : "not-stuck transition sectionPadding"}
            >
                <Container className='flex'>
                    <LogoContainer href="/" id="logo">
                    <Image src={logoSvg} alt="Logo"></Image>
                    </LogoContainer>
                    <MobileMenuButton onClick={() => setOpenMenu(previous => !previous)} className='flex justify-center items-center'><Image height={20} alt='menu button icon' src={menuSvg}/>Menu</MobileMenuButton>
                    <MobileMenuModal open={openMenu} setOpen={setOpenMenu}></MobileMenuModal>
                </Container>
            </Header>
        </header>
    )
}





















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


const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ open, setOpen }) => {
    const [openServices, setOpenServices] = React.useState(false)
    const { t } = useTranslation()
    const router = useRouter();
    const { rewrite } = useRewrites()


    return (
        <MobileMenuModalStyles className={open ? "open transition" : 'transition'} style={{ opacity: open ? 1 : 0, transform: `translateY(${open ? 0 : "-2rem"})` }}>
            <MobileMenuModalHeaderStyles style={{ position: "static" }} className='flex'>
                <LogoContainer aria-label={"Home"} href="/" id="logo">
                </LogoContainer>
                <Button onClick={() => setOpen(previous => !previous)} className='flex justify-center  items-center' style={{ columnGap: "10px", background: "white", color: COLORS.BLACKGREY }}>
                    {t("close")}<GrFormClose className='text-lg' />
                </Button>
            </MobileMenuModalHeaderStyles>
            <MobileLinkContainerStyles>
                <MobileLinkStyles>
                    <Link href="about-us" className='main-title'>
                        {t("about-us")}
                    </Link>
                </MobileLinkStyles>
                <MobileLinkStyles><Link href={rewrite("/blog")} className='main-title'>{t("blog")}</Link></MobileLinkStyles>
                <MobileLinkStyles onClick={() => setOpenServices(previous => !previous)}>
                    <div className='main-title'>{t("language")}
                        <DropdownButton open={openServices} /></div>
                    <Collapse on={openServices}>
                        <MobileSubMenuContainerStyle>
                            {LANGUAGES.map((el) => {
                                return (
                                    <Link href={router.pathname} locale={el.locale} key={el.locale}>
                                        {t(el.translationKey)}
                                    </Link>
                                )

                            })
                            }
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

const MobileLinkContainerStyles = styled.nav`
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



export default PhoneNav



