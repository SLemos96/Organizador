import React from 'react'
import Input from './forms/Input'
import { requiredIntervalValidation, minLengthValidation, requiredNumericValidation } from './forms/validations'

const validate = {
  atividade: (value) => minLengthValidation(3, value),
  tempoMinutos: requiredNumericValidation,
  prioridade: (value) => requiredIntervalValidation(1, 3, value)
}

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tarefa: {
        atividade: props.tarefa.atividade || '',
        tempoMinutos: props.tarefa.tempoMinutos || '',
        prioridade: props.tarefa.prioridade || ''
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
      tarefa: { ...state.tarefa, [name]: value },
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
    const tarefa = this.state.tarefa
    // percorre a questão validando todos os itens
    const validation = Object.keys(tarefa).reduce((acc, key) => {
      const error = validate[key] && validate[key](tarefa[key])
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
    const touchedAll = touchedValues.length === Object.values(tarefa).length
    const allTrue = touchedValues.every((t) => t === true)

    console.log(tarefa)

    // se isso ocorrer, então pode atualizaros dados
    if (errorsIsEmpty && touchedAll && allTrue) {
      this.props.onUpdate({
        atividade: tarefa.atividade,
        tempoMinutos: tarefa.tempoMinutos,
        prioridade: tarefa.prioridade,
      })
    }
  }

  onCancel(event) {
    this.props.onCancel()
  }

  render() {
    const commonProps = {
      values: this.state.tarefa,
      errors: this.state.errors,
      touched: this.state.touched,
      onChange: this.onChange,
      onBlur: this.onBlur
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Edita tarefa</h2>
        <Input
          type="textarea"
          label="Título"
          name="atividade"
          placeholder="Digite título da tarefa"
          isRequired={true}
          {...commonProps}
        />
        <Input
          label="Tempo"
          name="tempoMinutos"
          placeholder="Digite o tempo em minutos"
          isRequired={true}
          {...commonProps}
        />
        <Input
          label="Prioridade"
          name="prioridade"
          placeholder="(1- Alta, 2- Média, 3- Baixa)"
          isRequired={true}
          {...commonProps}
        />
        <input type="submit" value="Atualizar" />
        <button onClick={this.onCancel}>Cancelar</button>
      </form>
    )
  }
}
