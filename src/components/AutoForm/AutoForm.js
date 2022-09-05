import styles from './AutoForm.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
/*
----------------------------------------------------------------------------------
AutoForm - Automatically generate a Formik out of Yup Schemas
----------------------------------------------------------------------------------
A YUP schema that wishes to automatically generate a form **MUST** have a "meta"
property on each field of the schema. The structure of the meta tag must be an
object with the following properties:
direction   -   Optional    -   Like flex: column / row, default: column
id          -   Mandatory   -   The id of the field.
name        -   Mandatory   -   The name of the field.
type        -   Optional    -   The field type (text, email etc.), else is 'text'
where       -   Mandatory   -   An object describing the position of the field:
    column  -   Mandatory   -   The column number in which fo place the field.
    row     -   Mandatory   -   The row number in which to place the field.
props       -   Optional    -   An object with props to spread on the field.
----------------------------------------------------------------------------------
Example:
{ id: 'phone-no',
  name: 'phone-no',
  type: 'tel',
  where: {
    column: 3,
    row: 1
  },
  props: {
    placeholder: '052-1234567'
  }
}
----------------------------------------------------------------------------------
 */
const AutoForm = ({
    onSubmit,
    schema,
    submitText,
    ...rest
}) => {
    const { fields } = schema.describe()
    const fieldsKeys = Object.keys(fields)

    const addOrSub = 0 || schema?.spec?.meta?.direction === 'row'

    let columns = 0, rows = 0

    fieldsKeys.forEach((field) => {
        columns = Math.max(columns, fields[field].meta.where.column)
        rows = Math.max(rows, fields[field].meta.where.row)
    })
    columns *= 2               /* Each column has two elements */
    rows *= (2 + addOrSub) + 1 /* Each row has one for the elements and one for the error.
                                  The extra row is for the button */

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
                        gridColumnEnd: fields[field]?.meta.where.column * 2 + addOrSub,
                        gridRowStart: fields[field].meta.where.row * (2 + addOrSub) - 1 - addOrSub,
                        gridRowEnd: fields[field].meta.where.row * (2 + addOrSub)  - addOrSub,
                    }
                    const fieldStyle = {
                        gridColumnStart: labelStyle.gridColumnEnd - addOrSub * 2,
                        gridColumnEnd: labelStyle.gridColumnEnd + 1 - addOrSub,
                        gridRowStart: labelStyle.gridRowStart + addOrSub,
                    }
                    const errorStyle = {
                        gridColumnStart: labelStyle.gridColumnStart,
                        gridColumnEnd: labelStyle.gridColumnStart + 2,
                        gridRowStart: fieldStyle.gridRowStart + 1,
                    }
                    return (
                        [
                            <label
                                htmlFor={fields[field].id}
                                key={`label_${index}`}
                                style={labelStyle}>
                                {fields[field]?.label}
                            </label>,
                            <Field
                                id={fields[field].meta.id}
                                key={`field_${index}`}
                                name={fields[field].meta.name}
                                style={fieldStyle}
                                type={fields[field].meta?.type || 'text'}
                                {...(fields[field].meta?.props || {})}/>,
                            <div
                                key={`error_${index}`}
                                style={errorStyle}>
                                {/* todo: Need to understand this shit */}
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
