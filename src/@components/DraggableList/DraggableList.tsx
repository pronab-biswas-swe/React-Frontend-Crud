import './Draggable.scss'
import React, {ReactNode, useEffect} from 'react'

type DraggableProps = {
  data: any[]
  itemId: number | string
  itemText?: string
  renderItem?: (item: any, index?: number, dragHandler?: any) => ReactNode
  onOrderChange?: ([]: any[]) => void
}

const DraggableList = ({data, itemId, renderItem, onOrderChange}: DraggableProps) => {
  const [items, setItems] = React.useState<any>(data)
  const [draggedItem, setDraggedItem] = React.useState<any>(null)

  useEffect(() => {
    setItems(data)
  }, [data])

  const onDragStart = (e, index: number, id: any) => {
    const moveElement = document.getElementById(id)
    moveElement.classList.add('drag-element')
    setDraggedItem(items[index])
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', moveElement)
    e.dataTransfer.setDragImage(moveElement, 10, 10)
  }

  const onDragOver = (e, index) => {
    e.preventDefault()
    const draggedOverItem = items[index]

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return
    }

    // filter out the currently dragged item
    let reorderedItems = items.filter((item) => item !== draggedItem)

    // add the dragged item after the dragged over item
    reorderedItems.splice(index, 0, draggedItem)

    setItems(reorderedItems)
  }

  const onDragEnd = (id: string) => {
    const moveElement = document.getElementById(id)
    moveElement.classList.remove('drag-element')
    setDraggedItem(null)
    onOrderChange(items)
  }

  return (
    <section>
      <ul className='draggable' onDragOver={(e) => e.preventDefault}>
        {items?.map((item: any, idx: number) => {
          const id = item?.[itemId]
          if (!id) return null
          return (
            <li
              key={id}
              id={id}
              className='single-draggable-row'
              onDragOver={(e) => onDragOver(e, idx)}
            >
              {renderItem(item, idx, {
                draggable: true,
                onDragStart: (e) => onDragStart(e, idx, id),
                onDragEnd: () => onDragEnd(id),
              })}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default DraggableList
