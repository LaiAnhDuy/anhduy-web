import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM} from 'utilities/constants'


function Column(props) {

  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [ShowConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModa = () => setShowConfirmModal(!ShowConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModa()
   
  }

  const handleColumnTitleBlur = () => {
      const newColumn = {
        ...column,
        title: columnTitle
      }
      onUpdateColumn(newColumn)
  }


  return (
    <div className="column">
      <header className='column-drag-handle'>
        <div className="column-title">
            <Form.Control 
                size="sm" 
                type="text" 
                className='kanban-content-editable'
                value={columnTitle}
                onChange={handleColumnTitleChange}
                onBlur={handleColumnTitleBlur}
                onKeyDown={saveContentAfterPressEnter}    
                onClick={selectAllInlineText}
                onMouseDown={e => e.preventDefault()}
                spellCheck="false"
                
            />
        </div>

        <div className="column-dropdown-actions">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn"/>

                <Dropdown.Menu>
                  <Dropdown.Item >Add card....</Dropdown.Item>
                  <Dropdown.Item onClick={toggleShowConfirmModa}>Remove....</Dropdown.Item>
                  <Dropdown.Item >Move all cards in this column...</Dropdown.Item>
                  <Dropdown.Item >Làm mau lên, sắp deadline rồi</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
      </header>
      <div className="card-list">
      <Container               
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    // onDragEnter={() => {
                    //   console.log("drag enter:", column.id);
                    // }}
                    // onDragLeave={() => {
                    //   console.log("drag leave:", column.id);
                    // }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
                    groupName="Duy.la"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}                     
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"                  
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >                 
                    {cards.map((card, index) =>  (
                    <Draggable key ={index}>
                      <Card  card={card} />
                    </Draggable>
                    ))}                                      
                  </Container>
      </div>
      <footer>
        <div className="footer-actions">
        <i className="fa fa-plus icon" /> Add another card
        </div>
      </footer>

      <ConfirmModal 
        show={ShowConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}!</strong> <br /> All related cards will also be removed!`}
                      
      />
        
        
    </div>
  )
}

export default Column