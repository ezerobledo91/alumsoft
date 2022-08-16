import styled from 'styled-components'


export const Container = styled.form`
padding: 0px 20px;
` 

export const MutedText = styled.div`
  color: darkgray;
  font-weight: 300;
`
export const AreaAdds = styled.div`
  max-height: 200px;
  overflow: auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: solid lightgray 1px;
  border-top: solid lightgray 1px;
  padding: 10px;
  margin: 15px 0px;
`

export const ButtonAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding: 5px;
  border-radius: 50%;
  background: #319795;
  color: white;
  cursor: pointer;
  &:hover{
    transform: scale(1.2);
    transition: 300ms;
  }
`
export const ButtonRemove = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 20px;
height: 20px;
font-size: 10px;
padding: 5px;
border-radius: 50%;
background: #af3929;
color: white;
cursor: pointer;
&:hover{
    transform: scale(1.2);
    transition: 300ms;
  }
`
export const WrapperItem = styled.span`
display: flex;
justify-content: space-between;
gap: 20px;
align-items: center;
font-size: 14px;
border: solid lightgray 1px;
padding: 10px;
`
export const TitleGroupInput = styled.div`
  font-size: large;
  margin-bottom: 10px;
  color:#319795;
`

export const RequiredAsterisk = styled.span`
  color: #e53e3e;
  content: '*';
`

export const ErrorMsg = styled.div`
  color:#e53e3e;
  font-size: 12px;
  font-weight: 300;

`