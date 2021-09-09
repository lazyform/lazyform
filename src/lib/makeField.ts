class InputField {
    field: Field

    constructor(component: any, label = '') {
        this.field = {
            component,
            alias: '',
            pattern: null,
            label: label,
            value: '',
            placeholder: '',
            errorText: '',
            description: '',
            data: () => Promise.resolve([]),
            props: {
                // disabled : null //true|false|null
            },
            rules: [],
            disabled: false,
            required: false
        }
    }

    alias(alias: string | { prop: string; label: string } | [string | { prop: string; label: string }]) {
        this.field.alias = alias
        return this
    }

    value(val: any) {
        this.field.value = val
        return this
    }

    pattern(regExp: RegExp, errorText = '') {
        this.field.pattern = regExp
        this.field.errorText = errorText
        this.field.rules.push({pattern: regExp, message: errorText, trigger: 'input'})
        return this
    }

    label(label = '') {
        this.field.label = label
        return this
    }

    placeholder(placeholder = '') {
        this.field.props.placeholder = placeholder
        return this
    }

    description(description = '') {
        this.field.description = description
        return this
    }

    props(props: {} = {}) {
        this.field.props = props
        return this
    }

    rules(rules: Array<any> = []) {
        this.field.rules = rules
        this.field.required = this.field.rules.filter(item => item.required).length != 0
        return this
    }

    required(isRequired: boolean | string = true) {
        this.field.required = isRequired ? true : false
        const i = this.field.rules.findIndex(rule => rule.required || rule.required === false)
        const newRule = {required: true, trigger: 'blur', transform: (v: any) => `${v}`, message: ''}
        if (typeof isRequired == 'string') newRule.message = `${isRequired}`
        if (i == -1 && isRequired) this.field.rules.push(newRule)
        if (i !== -1 && !isRequired) this.field.rules.splice(i, 1)
        return this
    }

    disabled(isDisabled = true) {
        this.field.disabled = isDisabled
        return this
    }

    data(optData: any = []) {
        this.field.data = Object.prototype.toString.call(optData) == '[object Function]'
            ? optData
            : () => Promise.resolve(optData)
        return this
    }
}

export {InputField}

export default function (component: any, label = '') {
    return new InputField(component, label)
}
