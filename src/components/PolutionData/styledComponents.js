import styled from 'styled-components'

export const PolutionDataContainer = styled.div`
 min-height:100vh;
 background:#1e1c1c;
 display:flex;
 flex-direction:column;
 align-items :center;
 padding:20px;
`
export const Heading = styled.h1`
 font-size:36px;
 color:#ffff;
 font-family:'Roboto';
 @media screen and (max-width: 576px){
    font-size:24px;
 }
`
export const InputContainer = styled.div`
    display:flex;
    margin-top:20px;
   justify-content:space-around;
    align-items:flex-start;
    width:70%;
    margin-bottom:20px;
`
export const Input = styled.input`
   height:40px;
   margin-bottom:20px;
`

export const UnitContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    width:70%;
`

export const DetailsContainer = styled.div`
    border:5px solid #ffff;
    padding:30px;
    width:70%;
    margin-top:40px;
    display:flex;
    justify-content:space-between;
    @media screen and (max-width: 576px){
        margin-top:20px;
     }
`

export const Detail = styled.div`
   color:#ffff;
   font-size:24px;
   margin-bottom:20px;
   @media screen and (max-width: 576px){
    font-size:16px;
 }
`

export const LoaderSpinnerContainer = styled.div`
 height:90vh;
 display:flex;
 justify-content:center;
 align-items:center;
`

export const Failure = styled.h1`
color:#ff7300;
`