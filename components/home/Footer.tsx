import React from 'react'
import styled from 'styled-components';
import { DARKGREY, MAINCOLOR } from '../../data/contants';
   
const Badge = styled.div`
width: 150px;
>img{
  height: 50px;
  width:auto;
}`

const Badges = styled.div`
  max-width: 1000px;
  margin:auto;
`


 const Box = styled.footer`
  padding: 80px 30px;
  background: ${DARKGREY};
  width: 100%;
  margin-top: 5vh;

   
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
    color: #ffffff80;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: ${MAINCOLOR};
      transition: 200ms ease-in;
  }
  }
`
   
 const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 20px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
   

   
 const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 25px;
  font-weight: bold;
`;
 
const Footer = () => {

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
              <Heading>{"Contact"}</Heading>
              <a href = "mailto: info@easttranslator.com">info@easttranslators.com</a>
              <a href = "tel: +37369513786">Tel: +37369513786</a>
            </Column>
            {/* <Column>
              <Heading>{"Blog"}</Heading>
              <Link href={`/creeazaBoxulDorit`}>{"Success Stories"}</Link>
              <Link href={`/blogs`}>{"Interpreting Analytics"}</Link>
              <Link href={`/catering`}>{"Being Nice"}</Link>
            </Column> */}
            {/* <Column>
              <Heading>{"Take Action"}</Heading>
              <Link href="/" locale="ro">Romana</Link>
              <Link href="/" locale="en">Engleza</Link>
              <Link href="/" locale="ru">Rusa</Link>
            </Column> */}
            {/* <Column>
              <Heading>{"Take Action"}</Heading>
              <Link href="/create"><Button>Create Store</Button></Link>
              <Link href="/logIn"><Button className='text'>Log In</Button></Link>
            </Column> */}
          
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