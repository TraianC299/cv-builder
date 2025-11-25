import React from 'react'
import styled from 'styled-components';
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS';
import Link from 'next/link';
import LANGUAGES from '@/constants/LANGUAGES';
import { useRouter } from 'next/router';
import useRewrites from '@/hooks/useRewrites';



 const Box = styled.footer`
  padding: 80px 30px;
  background: ${COLORS.LIGHTGREY};
  width: 100%;

   
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
const {rewrite, rewriteQuery} = useRewrites()

    return (
      <Box>
        <Container id="footer">
          <Row>
            
         
            <Column>
              <Heading className='text-xl font-semibold'>{t("contact-us")}</Heading>
              <a className='p' href = "mailto: info@resumelio.com">traianciochina@gmail.com</a>
              <a className='p' href = "tel: +37369513786">Tel: +37369513786</a>
            </Column>
            <Column>
              <Heading className='text-xl font-semibold'>{t("language")}</Heading>
              {LANGUAGES.map(el=><Link className='p' 
              key={el.locale}
              href={{
                pathname: rewrite(router.pathname, el.locale),
                query: rewriteQuery(router.query, el.locale)
              }} locale={el.locale}>{el.emoji} {t(el.translationKey)}</Link>)}
            </Column>
            <Column>
            <Heading className='text-xl font-semibold'>{t("important")}</Heading>
              <Link className='p' href={rewrite(`/termeni-si-conditii`)}>{t("terms-and-conditions")}</Link>
              <Link className='p' href={rewrite(`/politica-de-confidentialitate`)}>{t("privacy-policy")}</Link>
              
            </Column>
            {/* // other */}
            <Column>
              <Heading className='text-xl font-semibold'>{t("other")}</Heading>
              <Link className='p' href={rewrite(`/blog`)}>{t("blog")}</Link>
              <Link className='p' href={rewrite(`/despre-noi`)}>{t("about-us")}</Link>
              <Link className='p' href={rewrite(`/contact`)}>{t("contact")}</Link>
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