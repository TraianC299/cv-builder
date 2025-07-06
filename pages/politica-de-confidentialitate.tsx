import COLORS from "@/constants/COLORS"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import styled from "styled-components"



const Container = styled.main`
padding: 0 1rem;
max-width: 1400px;
display: flex;
flex-direction: column;
gap: 2rem;
margin:auto;
    
    p, li, div{
        line-height: 1.8rem;
        letter-spacing: 0.02em;
        }
        li{
            margin-bottom: 8px;
            }
            h1, h2, h3{
                color: ${COLORS.BLACKGREY};
                }
                *{
                    color: ${COLORS.GREY};
                    }
                    `
const PrivacyPolicyPage = () => {
    const {t} = useTranslation("privacy-policy")
    return (
<>
<Head>
  <title>{t("privacy-policy-title")}</title>
    <meta name="description" content={t("privacy-policy-content") as string} />
</Head>
<Container>

<div>
    <h1 className="h3">{t("privacy-policy-title")}</h1>
    <p className="p">{t("privacy-policy-content")}</p>
</div>

<div>
    <h2 className="h4">{t("privacy-policy-information-collection")}</h2>
    <p className="p">{t("privacy-policy-information-collection-content")}</p>
</div>

<div>
    <h2 className="h4">{t("privacy-policy-data-security")}</h2>
    <p className="p">{t("privacy-policy-data-security-content")}</p>
</div>

<div>
    <h2 className="h4">{t("privacy-policy-third-party-services")}</h2>
    <p className="p">{t("privacy-policy-third-party-services-content")}</p>
</div>

<div>
    <h2 className="h4">{t("privacy-policy-changes-to-this-policy")}</h2>
    <p className="p">{t("privacy-policy-changes-to-this-policy-content")}</p>
</div>

<div>
    <h2 className="h4">{t("privacy-policy-contact-us")}</h2>
    <p className="p">{t("privacy-policy-contact-us-content")}</p>
</div>

<p className="p">{t("privacy-policy-last-updated")}</p>
</Container>
</>)


}


//getServeSideProps wors too
export const getStaticProps = async ({ locale }: {
    locale: string;
  }) => {
  
    return {
      props: {
        ...(await serverSideTranslations(locale, [ "common", "privacy-policy"])),
      },
    };
  };
export default PrivacyPolicyPage