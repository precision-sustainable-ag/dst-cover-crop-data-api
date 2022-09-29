import Validator from 'validatorjs'
import { UnprocessableEntity } from '../../exceptions/UnprocessableEntity.js';


export function Validate({data, rules, messages}){

    const validator = new Validator(data,rules);

    if(validator.fails()){
        const errors = validator.errors.errors;
        throw new UnprocessableEntity({data, errors});
    }

    return data;

}