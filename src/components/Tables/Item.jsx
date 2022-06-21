import React, { useEffect } from 'react'
import { Checkbox, Td, Tooltip, Tr } from '@chakra-ui/react'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { removeDataSelected, setDataInfo, setDataSelected, setEditModal, updateStateModal } from '../../reducer/UiSlice'
import { useState } from 'react'
const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => props.direction};
  align-items: center;

  gap: 5px;
  & > svg:hover {
    color: green;
    cursor: pointer;
  }
`

const Item = ({ item, claves, edit = true}) => {
  const dispatch = useDispatch()

  const select = useSelector((state)=>state.UiSlice.modalAux.select)
  const data_selected = useSelector(state=> state.UiSlice.modalAux.data_selected)
  const updateAction = (item) => {
    dispatch(setEditModal({ edit: true, edit_object: item }))
    dispatch(updateStateModal(true))
  }

  const checkObject = (variable) => {
    if (typeof variable === 'object' && !Array.isArray(variable) && variable !== null) {
      return (
        select ? variable.nombre :   <Wrapper onClick={() => dispatch(setDataInfo({ data_info: variable, open: true }))}>
          {variable.nombre}
          <ViewIcon />
        </Wrapper>
      
      )
    } else if (Array.isArray(variable) && typeof variable[0] === 'object') {
      return (
        <Wrapper>
          <Wrapper direction='column'>
            {variable.map((item, index) => <span key={index}>{item.nombre}</span>)}
          </Wrapper>
        {select ? '' : <ViewIcon onClick={() => dispatch(setDataInfo({ data_info: variable, open: true }))} /> }
        </Wrapper>
      )
    }
    return variable
  }


  const setChecked =(e)=>{
    if(e.target.checked){
      dispatch(setDataSelected(item))
    }else{
      dispatch(removeDataSelected(item._id))
      setCheck(false)

    }
 }

const [check, setCheck] = useState(false)
useEffect(() => {
  let find =  data_selected.find(element => element._id === item._id)
  find !== undefined && setCheck(true)
  }
, [data_selected,item,setCheck])



  return (
    <Tr>
    {select ? <Td><Checkbox value={item}  isChecked={check} onChange={(e)=>{setChecked(e)}}></Checkbox></Td> : '' }
      
      {claves.map((clave, index) => (
        <Td key={index}>{checkObject(item[clave])}</Td>
      ))}

      <Td>
        {/* Panel de Edicion */}
        {edit ? (
          <IconWrapper>
            <Tooltip label={'Editar'} fontSize='xs'>
              <EditIcon
                focusable='true'
                cursor={'pointer'}
                onClick={() => {
                  updateAction(item)
                }}
              />
            </Tooltip>
          </IconWrapper>
        ) : (
          ''
        )}
      </Td>
    </Tr>
  )
}

export default Item
