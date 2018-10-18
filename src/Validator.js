import { checkEmpty } from './Util'

class ValidatorErrors {
    constructor() {
        this.errors = []
        this.fields = {}
    }

    addError(field, message) {
        if (message) {
            this.errors.push(message)
            if (!this.fields[field]) {
                this.fields[field] = []
            }
            this.fields[field].push(message)
        }
    }

    isEmpty() {
        return Object.keys(this.errors).length === 0
    }
}

class Validator {
    constructor(options) {
        // TODO 需要判断判断条件的参数与输入值是否匹配，例如pattern必须传正则表达式
        this.options = options
    }

    validate(source) {
        let errors = new ValidatorErrors()
        Object.entries(this.options).forEach(([field, rules]) => {
            const value = source[field]
            for (let i = 0; i < rules.length; i++) {
                const rule = rules[i]
                const emptyErrorMessage = checkEmpty(
                    rule.type,
                    field,
                    value,
                    rule.message
                )
                // 该字段是必填的
                if (rule.required === true) {
                    if (emptyErrorMessage) {
                        errors.addError(field, emptyErrorMessage)
                        break
                    }
                }
                // 该字段需要用正则表达式判断
                if (rule.pattern) {
                    if (!rule.pattern.test(value) && !emptyErrorMessage) {
                        errors.addError(
                            field,
                            rule.message || `${field}格式错误`
                        )
                        break
                    }
                }
                if (rule.validator) {
                    errors.addError(field, rule.validator(rule, value, source))
                    break
                }
            }
        })
        return errors
    }
}

export default Validator
