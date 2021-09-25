import Vue from 'vue';

export class VueComponent {
    static name: string;
    static install(vue: typeof Vue): void;
}
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
    interface Vue {
        $lazyformConfig: VFormatterOptions;
    }
}
