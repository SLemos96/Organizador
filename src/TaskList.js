import React from 'react'
import TaskForm from './TaskForm'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        tarefas: props.tarefas,
      mode: 'view',
      current: null
    }
  }

  render() {
    if (this.state.mode === 'view') {
      const tarefas = this.state.tarefas.map((q, i) => (
        <p key={i}>
          <b>Tarefa: </b>
          {q.atividade}
          <br />
          <b>Tempo previsto: </b>
          {q.tempoMinutos} minutos
          <br />
          <b>Prioridade </b>
          {q.prioridade}
          <br/>
          <button className="m5" onClick={() => this.editTask(i)}>
            Editar
          </button>
          <button className="m5" onClick={() => this.removeTask(i)}>
            Remover
          </button>
          <br/>
        </p>
      ))
      return (
        <>
          <h2>Lista de Atividades</h2>
          <button onClick={() => this.addTask()}>Adicionar Tarefa </button>
          {tarefas}
        </>
      )
    } else {
      return (
        <TaskForm
          tarefa={this.state.tarefas[this.state.current]}
          onUpdate={(tarefa) => this.updateChanges(tarefa)}
          onCancel={() => this.cancelChanges()}
        />
      )
    }
  }

  addTask() {
    const newTask = { atividade: '', tempoMinutos: 0, prioridade: 0 }
    const tarefas = [...this.state.tarefas, newTask]
    this.setState({
        tarefas,
      mode: 'add',
      current: tarefas.length - 1
    })
  }

  editTask(index) {
    this.setState({ mode: 'edit', current: index })
  }

  removeTask(index) {
    const tarefas = [...this.state.tarefas]
    tarefas.splice(index, 1)
    this.setState({ tarefas })
  }

  updateChanges(task) {
    const tarefas = [...this.state.tarefas]
    tarefas[this.state.current] = { ...task }
    this.setState({ mode: 'view', tarefas })
  }

  cancelChanges() {
    if (this.state.mode === 'add') {
      this.removeTask(this.state.tarefas.length - 1)
    }
    this.setState({ mode: 'view' })
  }
}
