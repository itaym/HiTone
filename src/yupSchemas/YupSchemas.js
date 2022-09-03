import * as Yup from 'yup'
import { format as formatDate } from 'date-fns'

const originalToString = Date.prototype.toString
Date.prototype.setFormat = function(format) {
    this.format = format
}
Date.prototype.toString = function () {
    if (this.format) {
        try {
            return formatDate(this, 'yyyy-MM-dd')
        } catch {
            return originalToString.call(this)
        }
    }
    return originalToString.call(this)
}
function getDate({addYears = 0, addDays = 0, addMonths = 0, addHours = 0, addMinutes = 0, addSeconds = 0, format}) {
    let date = new Date()
    if (format) date.format = format
    date.setFullYear(date.getFullYear() + addYears)
    date.setMonth(date.getMonth() + addMonths)
    date.setDate(date.getDate() + addDays)
    date.setHours(date.getHours() + addHours)
    date.setMinutes(date.getMinutes() + addMinutes)
    date.setSeconds(date.getSeconds() + addSeconds)
    return date
}
const format = 'yyyy-MM-dd'
// noinspection JSUnresolvedVariable
Yup.oneOfSchemas = () => {}
Yup.addMethod(Yup.MixedSchema, 'oneOfSchemas', function (schemas) {
    const oneOfSchemasTestOptions = {
        name: 'one-of-schemas',
        message: '',
    }
    oneOfSchemasTestOptions.test = ( value) => {
        let result = ''
        schemas.forEach((schema) => {
            try {
                result = schema.validateSync(value)
            }
            catch (e) {
                result += e.message
                oneOfSchemasTestOptions.message = result
            }
        })
        return schemas.reduce((bool, schema) => bool || schema.isValidSync(value, {strict: true}), false)
    }
    return this.test(oneOfSchemasTestOptions)
})

export const _yupLoginSchema = (t) => (Yup.object().shape({
    email: Yup.string()
        .email(t('yup.invalid_email'))
        .label(t('yup.email'))
        .meta({ id: 'email', name: 'email', type: 'email', where: { column: 1, row: 1 }})
        .required(t('yup.email_is_required')),
    password: Yup.string()
        .label(t('yup.password'))
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/, 'yup.password_rules')
        .max(24, t('yup.password_too_long'))
        .meta({ id: 'password', name: 'password', type: 'password', where: { column: 1, row: 2 } })
        .min(8, t('yup.password_too_short'))
        .required(t('yup.password_is_required')),
}))

export const _yupResetPasswordSchema = (t) => {
    const verifyField = Yup.object().shape({
        passwordConfirmation: Yup.string()
            .default('')
            .label(t('yup.password_verify'))
            .meta({ id: 'passwordConfirm', name: 'passwordConfirm', type: 'password', where: { column: 1, row: 3 }})
            .oneOf([Yup.ref('password'), null], t('yup.password_must_match')),
    })
    return verifyField.concat(_yupLoginSchema(t))
}

export const _yupRegistrationSchema = (t) => (Yup.object().shape({
    email: Yup.string()
        .default('')
        .email(t('yup.invalid_email'))
        .label(t('yup.email'))
        .meta({ id: 'email', name: 'email', type: 'email', where: { column: 1, row: 1 }})
        .required(t('yup.email_is_required')),
    password: Yup.string()
        .default('')
        .label(t('yup.password'))
        .min(8, t('yup.password_too_short'))
        .max(24, t('yup.password_too_long'))
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/, 'yup.password_rules')
        .meta({ id: 'password', name: 'password', type: 'password', where: { column: 1, row: 2 }})
        .required(t('yup.password_is_required')),
    passwordConfirmation: Yup.string()
        .default('')
        .label(t('yup.password_verify'))
        .meta({ id: 'passwordConfirm', name: 'passwordConfirm', type: 'password', where: { column: 1, row: 3 }})
        .oneOf([Yup.ref('password'), null], t('yup.password_must_match')),
    firstName: Yup.string()
        .default('')
        .label(t('yup.first_name'))
        .max(24, t('yup.field_is_the_most', { number: 24}))
        .meta({ id: 'firstName', name: 'firstName', type: 'text', where: { column: 2, row: 1 }})
        .min(2, t('yup.field_is_at_least', { number: 2 }))
        .required(t('yup.field_is_required')),
    middleName: Yup.string()
        .default('')
        .label(t('yup.middle_name'))
        .meta({ id: 'middleName', name: 'middleName', type: 'text', where: { column: 2, row: 2 }})
        .oneOfSchemas([
            Yup.string()
                .max(24, t('yup.field_is_the_most', { number: 24}))
                .min(2, t('yup.field_is_at_least', { number: 2 })),
            Yup.string()
                .max(0, ''),
        ])
    ,
    lastName: Yup.string()
        .default('')
        .label(t('yup.last_name'))
        .max(24, t('yup.field_is_the_most', { number: 24}))
        .meta({ id: 'lastName', name: 'lastName', type: 'text', where: { column: 2, row: 3 }})
        .min(2, t('yup.field_is_at_least', { number: 2 }))
        .required(t('yup.field_is_required'))
        .trim(),
    birthDate: Yup.date()
        .default(getDate({}))
        .label(t('yup.birth_date'))
        .max(getDate({ addYears: -18, format }), t('yup.maximum_date', { date: getDate({ addYears: -18, format }).toLocaleDateString()}))
        .meta({ id: 'birthDate', name: 'birthDate', type: 'date', where: { column: 3, row: 1 }, props: {placeholder: t('globals.date_format')}})
        .min(getDate({ addYears: -120, format }), t('yup.minimum_date', { date: getDate({ addYears: -120, format }).toLocaleDateString()}))
        .required(t('yup.field_is_required'))
        //.transform(parseI18nDate(t)),
}))
