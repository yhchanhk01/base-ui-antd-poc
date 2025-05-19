import * as React from 'react';
import {Field} from '@base-ui-components/react/field';
import {Form} from '@base-ui-components/react/form';
import styles from './css/index.module.css';
import Select from "./components/Select.tsx";
import type {SelectProps as AntdSelectProps} from "antd/es/select";

export default function POCForm() {
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const options: AntdSelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }
    return (
        <Form
            className={styles.Form}
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                console.log(Array.from(formData.keys()))
                console.log(Array.from(formData.values()))
                const value = formData.get('url') as string;

                setLoading(true);
                const response = await submitForm(value);
                const serverErrors = {
                    url: response.error,
                };

                setErrors(serverErrors);
                setLoading(false);
            }}
        >
            <Field.Root name={'values'} className={styles.Field}>
                <Field.Label className={styles.Label}>Values</Field.Label>
                <Select
                    name="values"
                    fieldNames={{label:'label'}}
                    mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        options={options}/>
                <Field.Error className={styles.Error}/>
            </Field.Root>
            <Field.Root name="url" className={styles.Field}>
                <Field.Label className={styles.Label}>Homepage</Field.Label>
                <Field.Control
                    type="url"
                    required
                    defaultValue="https://example.com"
                    placeholder="https://example.com"
                    pattern="https?://.*"
                    className={styles.Input}
                />
                <Field.Error className={styles.Error}/>
            </Field.Root>
            <button disabled={loading} type="submit" className={styles.Button}>
                Submit
            </button>
        </Form>
    );
}

async function submitForm(value: string) {
    // Mimic a server response
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    try {
        const url = new URL(value);

        if (url.hostname.endsWith('example.com')) {
            return {error: 'The example domain is not allowed'};
        }
    } catch {
        return {error: 'This is not a valid URL'};
    }

    return {success: true};
}
