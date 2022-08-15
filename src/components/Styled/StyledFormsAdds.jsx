import styled from 'styled-components'

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
`