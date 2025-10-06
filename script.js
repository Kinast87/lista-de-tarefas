const adicionar = document.querySelector('#adicionar')
const tarefa = document.querySelector('#tarefa')
const listaTarefas = document.querySelector('#listaTarefas')
//captura o evento tecla enter pressionada e se o input não estiver vazio, chama a função adicionaTarefa, passando como parâmetro o valor do input
tarefa.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        if (tarefa.value === '')return
        adicionaTarefa(tarefa.value)
    }
})
//recebe o evento click da página e de acordo com a classe do botão clicado chama a respectiva função, no caso do botão adicionar antes de chamar a função verifica se o input não está vazio. Chama também a função salvaTarefa
document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('botao')){
        if (tarefa.value === '')return
        adicionaTarefa(tarefa.value)
    }
    if (el.classList.contains('apagar')){
    el.parentElement.remove()
    }
    if (el.classList.contains('realizar')) {
        el.parentElement.classList.toggle('feito')
    }
    salvaTarefa()
})
//função recebe como parâmetro o valor do input, cria um li e o adiciona na lista html
function  adicionaTarefa(input){
    const li = document.createElement('li')
    li.innerText = input
    listaTarefas.appendChild(li)
    //chama as funções
    limpaInput()
    criaBotoes(li)
    salvaTarefa()
}
//cria os botões apagar e realizar, passando para cada um uma classe específica
function criaBotoes(li){
    li.innerText += ''
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    const botaoRealizar = document.createElement('button')
    botaoRealizar.innerText = 'Realizar'
    botaoRealizar.setAttribute('class', 'realizar')
    //adiciona os botõe ao li, da lista html
    li.appendChild(botaoApagar)
    li.appendChild(botaoRealizar)
}
//limpa o input após enter ou click em adicionar
function limpaInput(){
    tarefa.value = ''
    //mantém o cursor dentro do input
    tarefa.focus()
 }
//salva cada tarefa em um arquivo JSON no modo localStorage
 function salvaTarefa(){
    const liTarefas = listaTarefas.querySelectorAll('li')
    const listTarefas = []
    for (let li of liTarefas){
        let tarefaTexto = li.innerText
        //elimina do arquivo salvo os botões e os espaços
        tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Realizar', '').trim()

        listTarefas.push(tarefaTexto)
    } 
    const tarefasJSON = JSON.stringify(listTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
 }
 //carrega na página as tarefas que estão salvas no arquivo JSON, chama a função adicionaTarefa e passa pra ela cada tarefa armazenada no arquivo
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listTarefas = JSON.parse(tarefas)
    for(let tarefa of listTarefas){
        adicionaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()
