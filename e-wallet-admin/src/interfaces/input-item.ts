import React, { ComponentType } from "react"

export interface InputProps {
    icon: ComponentType<{className?:string}>
    type: 'text' | 'password'
    name: string,
    value: string
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}