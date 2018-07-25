import React from 'react'


export default class TextUtil {
    static isEmpty(text: string) {
        return text === undefined || text === null || text === ''
    }

    static isEmail(text: string) {
        if(this.isEmpty(text)){
            return false
        }
        let reg = new RegExp("[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" + "\\@"
            + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\."
            + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+");
        return reg.test(text)
    }

    static isPassword(text: string) {
        if(this.isEmpty(text)){
            return false
        }
        let reg = new RegExp("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\@\\#\\$\\%\\~\\!\\^\\&\\*\\(\\)_\\+]).{8,})");
        return reg.test(text)
    }
}