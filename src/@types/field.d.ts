
interface Field {
    component: VueComponent;
    alias: string | { prop: string; label: string } | [string | { prop: string; label: string }];
    pattern: null | string | RegExp;
    label: string;
    value: any;
    placeholder: string;
    errorText: string;
    description: string;
    data(field: Field): Promise | Array<any>;
    rules: Array<any>;
    props: any;
    disabled: boolean;
    required: boolean;
}
