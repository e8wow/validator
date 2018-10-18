## class Validator 策略对象

该对象用来校验数据是否匹配

### constructor：传入一个options对象

> options对象的每个字段都代表一个校验字段  key为需要校验的对象的字段名,value则是rules(规则集,包含多个rule)

> rules中每一个rule会按顺序循环执行，如果不符合该规则则停止循环，不会继续匹配剩余的rule

rule选项参数 : 

- required: boolean 是否必填
- pattern: Regex 使用正则表达式校验
- validator: Function 自定义校验方法，如果该自定义方法返回错误信息则不通过校验，不返回信息则通过校验
- message: string 如果数据不通过该条rule则返回该message,否则返回系统默认提示语

example demo:

```javascript
const validator = new Validator({
    mobile: [
        {
            required: true,
            message: '请填写手机号'
        },
        {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确'
        }
    ],
    email: [
        {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确'
        }
    ],
    telephone: [
        {
            pattern: /^\d{2,4}-\d{7,8}$/,
            message: '固话格式不正确'
        }
    ]
})
```

### 共有属性：

- options: object 该验证对象创建时传入的规则集

### 私有方法：

- validate: Function：根据规则集进行数据校验的方法

需要传入一个数据源对象，该方法会校验该对象是否符合rules。

example demo:

```javascript
const validator = new Validator({
    mobile: [
        {
            required: true,
            message: '请填写手机号'
        },
        {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确'
        }
    ],
    email: [
        {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确'
        }
    ],
    telephone: [
        {
            pattern: /^\d{2,4}-\d{7,8}$/,
            message: '固话格式不正确'
        }
    ]
})
const source = {
    mobile: 'abcdefg',
    email: '353742991@qq.com',
    telephone: '0756-8888888'
}
validator.validate(source) // 将需要验证的数据源传入校验方法中进行校验
```

## class ValidatorErrors 校验后返回的错误对象

### 共有属性：

- errors: Array<string>
- fields: Object

### 私有方法：

- addError: Function
- isEmpty: Function

example demo:

```javascript
const validator = new Validator({
    mobile: [
        {
            required: true,
            message: '请填写手机号'
        },
        {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确'
        }
    ],
    email: [
        {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确'
        }
    ],
    telephone: [
        {
            pattern: /^\d{2,4}-\d{7,8}$/,
            message: '固话格式不正确'
        }
    ]
})
const source = {
    mobile: 'abcdefg',
    email: '353742991@qq.com',
    telephone: '0756-8888888'
}
const error = validator.validate(source) // 将需要验证的数据源传入校验方法中进行校验
if (!error.isEmpty()) {
    console.error(error.errors[0]) // 输出第一条错误信息
    return
}
```