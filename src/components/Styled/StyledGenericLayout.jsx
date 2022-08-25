import styled from "styled-components";

export const Container = styled.div`
    padding: 0px 20px;
`
export const WrapperFlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
margin-bottom:20px;
`

export const WrapperFlexRowMin = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
margin-bottom:20px;
max-width: 50%;
`

export const UniqueFlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
margin-bottom:20px;
max-width: 30%;
`


export const IconWrapper = styled.div`
display: flex;
gap: 5px;
justify-content: end;
`

export const Title = styled.h1`
text-align: left;
font-size: 1.2rem;
text-transform: capitalize;
`

export const FiltersContainer = styled.div`
display: flex;
justify-content: flex-end;
gap: 10px;
padding: 10px 0px;
margin-bottom: 20px;
`

export const ColumnFlexItems = styled.div`
display:flex;
flex-direction: column;
gap:10px;
`