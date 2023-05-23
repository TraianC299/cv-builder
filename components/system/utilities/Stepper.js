import React from 'react'
import styled from 'styled-components';
import { MAINCOLOR, LIGHTGREY, device } from '../../styles/styles';
import CheckSvg from '../../assets/svg/check.svg'
import useDidMountEffect from '../../Hooks/useDidMountEffect';

const StepperContainer = styled.div`
position: relative;
grid-template-columns: repeat(${props=>props.steps} , 1fr);
grid-gap: 20px;
width: 100%;
display:flex;
align-items:center;
justify-content:space-between;
height:10vh;
background: transparent;
overflow: hidden;

@media ${device.mobileSmallPortrait}{
    overflow:scroll;
    ::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`


const Step = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-left: 10px;
padding-right: 10px;
z-index: 2;
background:#FAF9FB;
>p{
    width: calc(100% - 2rem);
    color: ${props=>props.selected?MAINCOLOR:props.previous?"#000":LIGHTGREY};
    font-size: 0.875rem;
    letter-spacing: 0.01071em;
    line-height: 1.43;
    text-align: left;
    font-weight: 500;
}

@media (orientation: landscape) and (min-width: 768px){
    >p{
    font-size: 0.9rem;
    max-width: 10ch;
}
}


@media (orientation: portrait) and (min-width: 768px){
    >p{
    font-size: 1.2rem;
    width: calc(100% - 3rem);
}
}

`


const StepNumber = styled.div`
border-radius:333px;
height:1.5rem;
width:1.5rem;
background: ${props=>props.selected? MAINCOLOR:props.previous? "#000" : LIGHTGREY};
display: flex;
align-items: center;
justify-content: center;
margin-right: 8px;

>p{
    color: ${props=>props.selected ?"#fff" : LIGHTGREY};
    font-size: 0.85rem;
    font-weight: 500;
}

>svg{
    width: 50% !important;
    height: 50% !important;
}


@media ${device.laptopSmall} {
    height:1.8rem;
    width:1.8rem;

}
@media (orientation: portrait) and (min-width: 768px){
    height:1.9rem;
    width:1.9rem;
    >p{
    color: ${props=>props.selected ?"#000" : LIGHTGREY};
    font-size: 1.4rem;
}
}
`

const Line = styled.div`
margin:auto;
flex-grow:0.8;
height:1px;
width:100%;
position: absolute;
background:${LIGHTGREY};
display: none;
@media (orientation: landscape) and (min-width: 768px){
    display: block;

}

@media (orientation: portrait) and (min-width: 768px){
    display: block;

}
`

const FlexCenterCenter = styled.div`
width: fit-content;
display:flex;
align-items:center;
justify-content:center;

`
const Stepper = ({activeStep, steps}) => {


    useDidMountEffect(()=>{
        document.getElementById("stepper "+activeStep).scrollIntoView({behavior:"smooth", block:"nearest"})
    },[activeStep])


    return (
        <StepperContainer steps={steps.length}>
            <Line></Line>
            {steps.map((label, index) => {
                return (
                    <FlexCenterCenter id={"stepper "+index} key={"stepper"+index} >
                    <Step selected={index==activeStep} previous={index<=activeStep} color="#000">
                        <StepNumber selected={index==activeStep} previous={index<=activeStep}>{activeStep>index?<CheckSvg/>:<p style={{color:index==activeStep?"white":index<activeStep?"white":"white"}}>{index+1}</p>}</StepNumber>
                        <p className="stepper-paragraph" >{label}</p>
                    </Step>
                    </FlexCenterCenter>
                );
            })}
        </StepperContainer>
    )
}

export default Stepper
