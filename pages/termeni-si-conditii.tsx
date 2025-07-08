import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import COLORS from '@/constants/COLORS'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
const TermsPage = () => {
    const { t } = useTranslation(["terms-and-conditions", "common"])
  return (
    <Container>
<div>
    <h1 className='text-4xl'>{t('terms-and-conditions')}</h1>
    <p className='p'>{t('terms-and-conditions-content')}</p>
</div>

<div>
    <h2 className='h3'>{t('agreement')}</h2>
    <p className='p'>{t('agreement-content')}</p>
</div>

<div>
    <h2 className='h3'>{t('intellectual-property')}</h2>
    <p className='p'>{t('intellectual-property-content')}</p>
</div> 

<div>
    <h2 className='h3'>{t('limitations-of-liability')}</h2>
    <p className='p'>{t('limitations-of-liability-content')}</p>
</div>

<div>
    <h2 className='h3'>{t('data-transmission')}</h2>
    <p className='p'>{t('data-transmission-content')}</p>
</div>

<div>
    <h2 className='h3'>{t('indemnification')}</h2>
    <p className='p'>{t('indemnification-content')}</p>
</div>
</Container>
  )
}


export const getStaticProps = async ({ locale }: {
    locale: string;
  }) => {
  
    return {
      props: {
        ...(await serverSideTranslations(locale, [ "common", "terms-and-conditions"])),
      },
    };
  };


export default TermsPage