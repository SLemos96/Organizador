import React from 'react'
import Input from './forms/Input'
import { requiredValidation, minLengthValidation } from './forms/validations'

const validate = {
  statement: (value) => minLengthValidation(3, value),
  option1: requiredValidation,
  option2: requiredValidation
}

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: {
        statement: props.question.statement || '',
        option1: props.question.options[0] || '',
        option2: props.question.options[1] || '',
        option3: props.question.options[2] || '',
        option4: props.question.options[3] || ''
      },
      errors: {},
      touched: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onChange(event) {
    const { name, value } = event.target
    this.setState((state) => ({
      ...state,
      question: { ...state.question, [name]: value },
      touched: { ...state.touched, [name]: true }
    }))
  }

  onBlur(event) {
    const { name, value } = event.target
    const { [name]: removedError, ...rest } = this.state.errors
    const error = validate[name] ? validate[name](value) : null
    const nameError = this.state.touched[name] ? error : null

    this.setState((state) => ({
      ...state,
      errors: {
        ...rest,
        [name]: nameError
      }
    }))
  }

  onSubmit(event) {
    event.preventDefault()
    const question = this.state.question
    // percorre a questão validando todos os itens
    const validation = Object.keys(question).reduce((acc, key) => {
      const error = validate[key] && validate[key](question[key])
      return {
        errors: {
          ...acc.errors,
          ...(error && { [key]: error })
        },
        touched: {
          ...acc.touched,
          ...{ [key]: true }
        }
      }
    }, {})
    this.setState((state) => ({
      ...state,
      errors: validation.errors,
      touched: validation.touched
    }))

    const errorValues = Object.values(validation.errors)
    const touchedValues = Object.values(validation.touched)
    const errorsIsEmpty = errorValues.length === 0
    const touchedAll = touchedValues.length === Object.values(question).length
    const allTrue = touchedValues.every((t) => t === true)

    console.log(question)

    // se isso ocorrer, então pode atualizaros dados
    if (errorsIsEmpty && touchedAll && allTrue) {
      // transforma em aray novamente antes de enviar
      const options = [
        question.option1,
        question.option2,
        question.option3,
        question.option4
      ].filter((o) => o.trim() !== '')
      this.props.onUpdate({
        statement: question.statement,
        options
      })
    }
  }

  onCancel(event) {
    this.props.onCancel()
  }

  render() {
    const commonProps = {
      values: this.state.question,
      errors: this.state.errors,
      touched: this.state.touched,
      onChange: this.onChange,
      onBlur: this.onBlur
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Edita questão</h2>
        <Input
          type="textarea"
          label="Enunciado"
          name="atividade"
          placeholder="Digite o enunciado da questão"
          isRequired={true}
          {...commonProps}
        />
        <Input
          label="Opção 1"
          name="option1"
          placeholder="Digite a 1ª opção"
          isRequired={true}
          {...commonProps}
        />
        <Input
          label="Opção 2"
          name="option2"
          placeholder="Digite a 2ª opção"
          isRequired={true}
          {...commonProps}
        />
        <Input
          label="Opção 3"
          name="option3"
          placeholder="Digite a 3ª opção"
          {...commonProps}
        />
        <Input
          label="Opção 4"
          name="option4"
          placeholder="Digite a 4ª opção"
          {...commonProps}
        />
        <input type="submit" value="Atualizar" />
        <button onClick={this.onCancel}>Cancelar</button>
      </form>
    )
  }
}
