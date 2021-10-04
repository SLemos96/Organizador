import React from 'react'
import TaskForm from './TaskForm'

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    //colocar a primeira chamada da sugestão aqui
    this.state = {
      suggestion: { activity: '', tempoMinutos: 0, prioridade: 0 },
      tarefas: props.tarefas,
      mode: 'view',
      current: null
    }
    this.preencherSuggestion();
    this.fall(); //alala, ta vindo :D
  }

  render() {
    if (this.state.mode === 'view') {
      const tarefas = this.state.tarefas
      .map((q, i) => (
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
          <button  className="m5" onClick={() => this.addTask()}>Adicionar Tarefa </button>
          <button  className="m5" onClick={() => this.receiveSuggestion()}>Receber sugestão de Tarefa </button>
          <button  className="m5" onClick={() => this.orderTask()}>Ordenar Tarefas </button>
          {tarefas}
        </>
      )
    } else if (this.state.mode === 'add' || this.state.mode === 'edit') {
      return (
        <TaskForm
          tarefa={this.state.tarefas[this.state.current]}
          onUpdate={(tarefa) => this.updateChanges(tarefa)}
          onCancel={() => this.cancelChanges()}
        />
      )
    } else {
      const tarefas = this.state.tarefas
      .sort((a, b) => a.prioridade > b.prioridade ? 1 : -1)
      .map((q, i) => (
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
          <h2>Tarefas Ordenadas</h2>
          <button  className="m5" onClick={() => this.addTask()}>Adicionar Tarefa </button>
          <button  className="m5" onClick={() => this.receiveSuggestion()}>Receber sugestão de Tarefa </button>
          <button  className="m5" onClick={() => this.orderTask()}>Ordenar Tarefas </button>
          {tarefas}
        </>
        // <TaskForm
        //   tarefa={this.state.tarefas[this.state.current]}
        //   onUpdate={(tarefa) => this.updateChanges(tarefa)}
        //   onCancel={() => this.cancelChanges()}
        // />
      )
    }
  }

  // preenchendo o suggestion com informações para o primeiro clique.
  preencherSuggestion(){
    const urlRequest = 'https://www.boredapi.com/api/activity/';
    fetch(urlRequest)
    .then((res) => res.json())
    .then((repos) => {
      this.setState({
        suggestion: repos
      })
      console.log(suggestion)
    });
    const suggestion = this.state.suggestion;
  }

  receiveSuggestion(){
    this.preencherSuggestion();
    // const urlRequest = 'https://www.boredapi.com/api/activity/';
    // fetch(urlRequest)
    // .then((res) => res.json())
    // .then((repos) => {
    //   this.setState({
    //     suggestion: repos
    //   })
    //   console.log(suggestion)
    // });
    const suggestion = this.state.suggestion;
    const newTask = { atividade: suggestion.activity, tempoMinutos: 0, prioridade: 0 }
    const tarefas = [...this.state.tarefas, newTask]
    this.setState({
      tarefas,
    mode: 'add',
    current: tarefas.length - 1
  })
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

  orderTask(){
    const tarefas = [...this.state.tarefas]
    this.setState({
      tarefas,
      mode: 'order'
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

  fall() {
    const tarefas = [...this.state.tarefas]
    tarefas.add({ activity: 'Garotão ta vindo :D satisfação aspira', tempoMinutos: 60, prioridade: 99 })
    this.setState({ tarefas })

    this.wait("outono");
  }

  wait(estacao, tempo = -1) {
    // ia fazer um bagulho recursivo mas zzz
    let cons;

    if(tempo = -1){

      if(estacao == "verão"){
        tempo = 1;
        cons = "É verão o ano todo";
      }
      if(estacao == "inverno"){
        tempo = 9999;
        cons = ":3 diliça";
      }
      if(estacao == "outono"){
        tempo = 60;
        cons = "Logo logo é inverno hehe buoy";
      }
      if(estacao == "primavera"){
        tempo = 60;
        cons = "esquece dessa merda de verão ai, porra";
      }
    }
    const clock = setInterval(()=> {
      if(tempo > 0){
        console.log(`${estacao}: ${tempo}s - ${cons}`)
        tempo-=1;
      }
      else
        clearInterval(clock);
    }, 1000);
  }
}
