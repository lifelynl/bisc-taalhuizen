import { FieldsetContentProps } from './useFieldsetContent'
import { FieldsetControlsProps } from './useFieldsetControl'

export interface ConnectedFieldsetProps<T extends string> extends FieldsetContentProps<T>, FieldsetControlsProps<T> {}
