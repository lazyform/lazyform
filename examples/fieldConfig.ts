import makeField from "../src/lib/makeField";
import SelectInput from './Components/Inputs/SelectInput.vue'

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
    checkbox: makeField('input', '复选框').props({type: 'checkbox'}).description('是否接受'),
    description: makeField('textarea', '描述').props({cols: "30", rows: "5"}).placeholder('请输入'),
    city: makeField(SelectInput, '城市').placeholder('请选择').data(dataCity),
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

