interface VFormatterOptions {
    fields: { [key: string]: Field };
    submitBtnClass: string | undefined;
    resetBtnClass: string | undefined;
    cancelBtnClass: string | undefined;
    submitText: string | undefined;
    resetText: string | undefined;
    cancelText: string | undefined;
    asyncValidatorI18n: any | undefined;
}
