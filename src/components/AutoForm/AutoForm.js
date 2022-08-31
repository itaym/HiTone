import styles from './AutoForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const AutoForm = ({
    onSubmit,
    schema,
    submitText,
    ...rest
}) => {
    const { fields } = schema.describe()

    const fieldsKeys = Object.keys(fields)
    let columns = 0, rows = 0

    fieldsKeys.forEach((field) => {
        columns = Math.max(columns, fields[field].meta.where.column)
        rows = Math.max(rows, fields[field].meta.where.row)
    })
    columns *= 2
    rows *= 2 + 1

    let columnsTemplate = new Array(columns).fill('auto').join(' ')
    let rowsTemplate = new Array(rows).fill('auto').join(' ')

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: columnsTemplate,
        gridTemplateRows: rowsTemplate
    }
    return (
        <Formik
            {...rest}
            initialValues={schema.cast()}
            validationSchema={schema}
            onSubmit={onSubmit}>
            <Form className={styles.form} style={gridStyle}>
                {fieldsKeys.map((field, index) => {
                    const labelStyle = {
                        gridColumnStart: fields[field]?.meta.where.column * 2 - 1,
                        gridRowStart: fields[field].meta.where.row * 2 - 1,
                    }
                    const fieldStyle = {
                        gridColumnStart: labelStyle.gridColumnStart + 1,
                        gridRowStart: labelStyle.gridRowStart,
                    }
                    const errorStyle = {
                        gridColumnStart: labelStyle.gridColumnStart,
                        gridColumnEnd: labelStyle.gridColumnStart + 2,
                        gridRowStart: labelStyle.gridRowStart + 1,
                    }
                    return (
                        [
                            <label
                                htmlFor={field}
                                key={`label_${index}`}
                                style={labelStyle}>
                                {fields[field]?.label}
                            </label>,
                            <Field
                                id={field} name={field}
                                key={`field_${index}`}
                                style={fieldStyle}
                                type={fields[field]?.meta?.type}
                                {...(fields[field].meta?.props || {})}/>,
                            <div
                                key={`error_${index}`}
                                style={errorStyle}>
                                <ErrorMessage
                                    className={styles.form__error}
                                    component="div"
                                    name={field}/>&nbsp;</div>,
                        ])
                })}
                <button type="submit">{submitText}</button>
            </Form>
        </Formik>
    )
}
export default AutoForm
