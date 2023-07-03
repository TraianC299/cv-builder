import React from 'react'
import styled from 'styled-components';
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS';
import Link from 'next/link';
import LANGUAGES from '@/constants/LANGUAGES';
import { useRouter } from 'next/router';



 const Box = styled.footer`
  padding: 80px 30px;
  background: ${COLORS.LIGHTGREY};
  width: 100%;
  margin-top: 5rem;

   
  @media (max-width: 1000px) {
    padding: 70px 30px;
    max-height: none;
  }
`;
   
 const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1300px;
    margin: auto ;
    /* background: red; */
`
   
 const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  >a{
    color: ${COLORS.BLACKGREY};
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: ${COLORS.MAINCOLOR};
      transition: 200ms ease-in;
  }
  }
`
   
 const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(300px, 1fr));
  grid-gap: 20px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
   

   
 const Heading = styled.p`
  color: ${COLORS.BLACKGREY};
  margin-bottom: 1.5rem;
`;
 
const Footer = () => {
const {t} = useTranslation()
const router = useRouter()
    return (
      <Box>
        {/* <h1 style={{ color: "green", 
                     textAlign: "center", 
                     marginTop: "-50px" }}>
          GeeksforGeeks: A Computer Science Portal for Geeks
        </h1> */}
        <Container id="footer">
          <Row>
            
            {/* <Column>
              <Heading>{"Legal Agreements"}</Heading>
              <Link href={`/termeni`}>{"Terms and Conditions"}</Link>
              <Link href={`/privacy-policy`}>{"Privacy Policy"}</Link>
            </Column> */}
            <Column>
              <Heading className='h6 font-semibold'>{t("contact-us")}</Heading>
              <a className='p' href = "mailto: info@resumelio.com">traianciochina@gmail.com</a>
              <a className='p' href = "tel: +37369513786">Tel: +37369513786</a>
            </Column>
            <Column>
              <Heading className='h6 font-semibold'>{t("language")}</Heading>
              {LANGUAGES.map(el=><Link className='p' href={router.pathname} locale={el.locale}>{el.emoji} {t(el.translationKey)}</Link>)}
            </Column>
            <Column>
            <Heading className='h6 font-semibold'>{t("important")}</Heading>
              <Link className='p' href={`/terms-and-conditions`}>{t("terms-and-conditions")}</Link>
              <Link className='p' href={`/privacy-policy`}>{t("privacy-policy")}</Link>
              
            </Column>
          
          </Row>
        </Container>
        {/* <Badges >
          <Badge>
            {<LogoSvg/>}
          </Badge>
        </Badges> */}
      </Box>
    );
  };



  export default Footer;