import {RuleItem} from 'async-validator/dist-types/index'

interface RuleItem extends RuleItem {
    trigger?: string;
    fullField?: string;
}
