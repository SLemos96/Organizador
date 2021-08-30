export function minLengthValidation(minLength, value) {
    if (value.trim().length < minLength) {
      return `Este campo requer pelo menos ${minLength} caracteres`
    }
    return null
  }
  
  export function requiredIntervalValidation(min, max, value) {
    if(requiredNumericValidation(value)){ //conferindo se o valor é numérico
      return requiredNumericValidation(value)
    }
    if(value < min || value > max){
      return 'Este campo requer um valor entre 1 e 3'
    }
    return null
  }

  export function requiredNumericValidation(value) {
    if (value.trim() === '') {
      return 'Este campo é obrigatório'
    }
    if(!Number(value)){
      return 'Este campo requer apenas números maiores que zero'
    }
    return null
  }