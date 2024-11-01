import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  SidebarFormFieldItem,
  SidebarFormFieldItemProps,
} from "@/components/sidebar-form-field-item"

export const SortableSidebarFormFieldItem = React.memo(
  ({ formField }: SidebarFormFieldItemProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: formField.name,
    })

    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      transition,
    }

    return (
      <SidebarFormFieldItem
        formField={formField}
        ref={setNodeRef}
        style={style}
        isDragging={isDragging}
        {...attributes}
        {...listeners}
      />
    )
  }
)

SortableSidebarFormFieldItem.displayName = "SortableSidebarFormFieldItem"
