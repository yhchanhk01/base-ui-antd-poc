import {Select as AntdSelect} from 'antd';
import type {SelectProps as AntdSelectProps} from 'antd';
import {Checkbox} from "@base-ui-components/react";
import {useState} from "react";

// interface SelectProps extends useRender.ComponentProps<'select', any,AntdSelectProps>


const CustomSelect = (props: AntdSelectProps & { name: string }) => {

    const [values, setValues] = useState<string[]>([])
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        setValues(value);
    };

    return <>
        <AntdSelect {...props} onChange={handleChange}/>
        <div style={{display: 'none'}}>
            {(props.options ?? []).map((option) => {
                return <label>
                    <Checkbox.Root value={option.value ?? ''}
                                   checked={values.includes((option.value ?? '').toString())}/>
                    {option.label}
                </label>
            })}
        </div>
    </>;
}

export default CustomSelect;