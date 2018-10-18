function isNativeStringType(type) {
    return (
        type === 'string' ||
        type === 'url' ||
        type === 'hex' ||
        type === 'email' ||
        type === 'pattern'
    )
}

function isEmptyValue(value, type = 'string') {
    if (value === undefined || value === null) {
        return true
    }
    if (type === 'array' && Array.isArray(value) && !value.length) {
        return true
    }
    if (isNativeStringType(type) && typeof value === 'string' && !value) {
        return true
    }
    return false
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0
}

export function checkEmpty(type = 'string', field, value, message) {
    const emptyErrorMessage = message || `${field}不能为空`
    if (type === 'object') {
        if (isEmptyObject(value)) {
            return emptyErrorMessage
        }
    } else if (isEmptyValue(value, type)) {
        return emptyErrorMessage
    }
}
