export default {
    submitText: '提交',
    cancelText: '取消',
    validator:{
        default: '字段%s验证错误',
        required: '字段%s必填',
        enum: '%只能是%其中之',
        whitespace: '%s不能为空',
        date: {
            format: '%s 日期 %s 格式错误 %s', //
            parse: '%s 无法解析日期 %s  ',
            invalid: '%s 日期 %s 为无效日期',
        },
        types: {
            string: '%s 不是 %s',
            method: '%s 不是 %s (function)',
            array: '%s 不是 %s',
            object: '%s 不是 %s',
            number: '%s 不是 %s',
            date: '%s 不是 %s',
            boolean: '%s 不是 %s',
            integer: '%s 不是 %s',
            float: '%s 不是 %s',
            regexp: '%s 不是有效的 %s',
            email: '%s 不是有效的 %s',
            url: '%s 不是有效的 %s',
            hex: '%s 不是有效的 %s',
        },
        string: {
            len: '%s 必须是 %s 个字符',
            min: '%s不能少于%s个字符',
            max: '%s不能多于%s个字符',
            range: '%s只能是输入%s到%s个字符',
        },
        number: {
            len: '%s 必须等于 %s',
            min: '%s 不能小于 %s',
            max: '%s 不能大于 %s',
            range: '%s 必须等于在 %s 和 %s 范围内',
        },
        array: {
            len: '%s 必须选择 %s 个',
            min: '%s 不能选择少于 %s 个',
            max: '%s 不能选择多于 %s 个',
            range: '%s 只能选择 %s 到 %s 个',
        },
        pattern: {
            mismatch: '%s 的值 %s 与正则 %s 不匹配',
        },
    }
}
