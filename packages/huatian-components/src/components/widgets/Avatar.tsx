import { StyleValue } from 'vue'
import classes from './widget.module.scss'

export const Avatar = ({ url, style, size='medium' } : { url: string, style?: StyleValue, size?: "small" | "medium" | "larget"}) => {
    return <img class={`${classes.avatar} ${classes[size]}`} style={style} src={url} alt='' />
}