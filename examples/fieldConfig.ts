import makeField from "../src/lib/makeField";
import SelectInput from './Components/Inputs/SelectInput.vue'
import checkboxInput from './Components/Inputs/checkboxInput.vue'
import radioInput from './Components/Inputs/radioInput.vue'

const sexOpt = [{label: '男', value: 1}, {label: '女', value: 0}]

const dataCity = (field: any) => {
    const a = [
        {value: 1, label: '上海'},
        {value: 2, label: '北京'}
    ]
    return Promise.resolve(a)
}
// eslint-disable-next-line
const emailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/


export default {
    username: makeField('input', '用户名称').alias({prop: 'oldname', label: '旧用户名'}).placeholder('请输入'),
    email: makeField('input', '邮箱').placeholder('请输入电子邮箱').pattern(emailRegExp, '请输入有效电子邮箱'),
    password: makeField('input', '密码').props({type: 'password'}).placeholder('请输入密码').rules([{min: 6, max: 30}]),
    introduction: makeField('textarea', '描述').props({cols: "20", rows: "5"}).placeholder('请输入'),
    city: makeField(SelectInput, '城市多选').placeholder('请选择').data(dataCity),
    city2: makeField(radioInput, '城市单选').placeholder('请选择').data(dataCity),
    isAccept: makeField(checkboxInput, ' ').description('复选框').props({
        'true-value': 'yes',
        'false-value': 'no'
    }),
    // SelectMultiple: new MakeField(SelectInput, '下拉项').placeholder('请选择').data(dataDemo)
    // sex: mField(DefaultInput, '性别').data(sexOpt).required().rules([{ min: 3 }]),
    // asynSex: mField(DefaultInput).data(asynSexOpt),
    // funSex: mField(DefaultInput).data(funSex)
}

// const confings: { [key: string]: Field } = {
//     username: new MakeField(DefaultInput, '名称'),
//     email: new MakeField(DefaultInput, '邮箱').pattern(regExp.email, '请输入电子邮箱').required(),
// }
// export default confings

