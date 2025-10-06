const adicionar = document.querySelector('#adicionar')
const tarefa = document.querySelector('#tarefa')
const listaTarefas = document.querySelector('#listaTarefas')
adicionar.addEventListener('click', function(){
    if (tarefa.value === '')return
    adicionaTarefa(tarefa.value)
})
tarefa.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        if (tarefa.value === '')return
        adicionaTarefa(tarefa.value)
    }
})
document.addEventListener('click', function(e){
    const el = e.target
    if (el.classList.contains('apagar')){
    el.parentElement.remove()
    }
    if (el.classList.contains('realizar')) {
        el.parentElement.classList.toggle('feito')
    }
    salvaTarefa()
})

function  adicionaTarefa(input){
    const li = document.createElement('li')
    li.innerText = input
    listaTarefas.appendChild(li)
    limpaInput()
    criaBotoes(li)
    salvaTarefa()
}

function criaBotoes(li){
    li.innerText += ''
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    const botaoRealizar = document.createElement('button')
    botaoRealizar.innerText = 'Realizar'
    botaoRealizar.setAttribute('class', 'realizar')
    li.appendChild(botaoApagar)
    li.appendChild(botaoRealizar)
}

 function limpaInput(){
    tarefa.value = ''
    tarefa.focus()
 }

 function salvaTarefa(){
    const liTarefas = listaTarefas.querySelectorAll('li')
    const listTarefas = []
    for (let li of liTarefas){
        let tarefaTexto = li.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Realizar', '').trim()

        listTarefas.push(tarefaTexto)
    } 
    const tarefasJSON = JSON.stringify(listTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
 }
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listTarefas = JSON.parse(tarefas)
    for(let tarefa of listTarefas){
        adicionaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()
