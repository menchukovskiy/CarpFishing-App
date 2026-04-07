import { useEffect, useState } from "react"
import { LANG } from "../language/lang"
 
const useValidation = ( value, validations ) => {


    const [ isEmpty, setEmpty ] = useState(false)
    const [ minLength, setMinLength ] = useState(false)
    const [ maxLength, setMaxLength ] = useState(false)
    const [ isEmail, setEmail ] = useState(false)
    const [ isSame, setSame ] = useState(false)
    const [ err, setError ] = useState('')
    const [ inputValid, setInputValid ] = useState(false) 

    useEffect( () => {
        const nextIsEmpty = !!validations.isEmpty && !value
        const nextMinLength = validations.minLength ? value.length < validations.minLength : false
        const nextMaxLength = validations.maxLength ? value.length > validations.maxLength : false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nextIsEmail = validations.isEmail ? !(emailRegex.test(value) && value) : false
        const nextIsSame = validations.isSame ? value !== validations.isSame : false

        setEmpty(nextIsEmpty)
        setMinLength(nextMinLength)
        setMaxLength(nextMaxLength)
        setEmail(nextIsEmail)
        setSame(nextIsSame)

        if (nextIsEmpty) {
            setError(LANG('ERROR_TEXT_FIELD_IS_EMPTY'))
        } else if (nextMinLength) {
            setError(LANG('PASSWORD_ERROR_MIN_LENGTH'))
        } else if (nextMaxLength) {
            setError(LANG('ERROR_TEXT_MAX_LENGTH'))
        } else if (nextIsEmail) {
            setError(LANG('ERROR_TEXT_INVALID_EMAIL'))
        } else if (nextIsSame) {
            setError(LANG('ERROR_TEXT_DO_NOT_MATCH'))
        } else {
            setError('')
        }
    }, [value, validations] )

    useEffect( () => {
        if( isEmpty || minLength || isEmail || isSame || maxLength ){
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [ isEmpty, minLength, isEmail, isSame, maxLength  ] )

    return {
        isEmpty,
        minLength,
        isEmail,
        isSame,
        maxLength,
        err,
        inputValid
    }

}

export const useInput = ( initialValue, validations ) => {
    const [ value, setValue ] = useState( initialValue )
    const [isDirty,setDirty] = useState( false )
    const valid = useValidation( value, validations )


    const clearInput = () => {
        setValue('')
        setDirty(false)
    }
    

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    const set = (val) => {
        setValue(val)
    }

    const getError = () => {
        if( isDirty ){
            if( valid.err ){
                return valid.err
            }

            return false
            
        }
        

    }


    return {
        value,
        onChange,
        onBlur,
        getError,
        isDirty,
        clearInput,
        set,
        ...valid
    }

}

