import classes from './icon.module.scss'

export type IconProps = {
    size? : "small" | "medium" | "large",
    class? : string
}

export const iconWrapper = (Component : (props : any) => JSX.Element) : (props : IconProps)=> JSX.Element => {
    return (props: IconProps) => {
        return (
            <svg
                viewBox="0 0 1024 1024"
                class={`${
                classes["icon-" + (props.size || "small")]
                } ${props.class || ''}`}
            >
                <Component />
            </svg>
        )
    }   
}