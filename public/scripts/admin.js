// Importação do Modulo que abre e fecha a Modal
import Modal from './modal.js'
const modal = Modal()

// Pega todos elementos necessários
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButtonClass = document.querySelector('.modal .button:nth-child(2)')
const modalButton = document.querySelector('.modal button')
const modalInput = document.querySelector('.modal form input')
const modalForm = document.querySelector('.modal form')

// Botões das ações de Admin

// Database Actions
const dbReset = document.querySelector('.dbReset')
const viewTableRooms = document.querySelector('.viewTableRoom')
const viewTablequestions = document.querySelector('.viewTablequestions')
const viewAllTables = document.querySelector('.viewAllTables')

// Rooms Actions
const roomPass = document.querySelector('.getRoomPass')
const deleteRoom = document.querySelector('.deleteRoom')
const deleteRoomQuestions = document.querySelector('.deleteRoomQuestions')
const getQuestionsRoom = document.querySelector('.getQuestionsRoom')

// Database Actions
dbReset.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Restaurar Banco de Dados'
  modalDescription.innerHTML =
    'Tem certeza que deseja restaurar o banco de dados? <strong>Todos dados serão deletados!</strong> Essa ação é irreversível'

  // Configura Botões da Modal
  modalButton.innerHTML = 'Sim, restaurar'
  modalButtonClass.classList.add('none')
  modalButton.classList.remove('none')
  modalButton.classList.add('red')
  modalButton.removeAttribute('disabled')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
  modalInput.setAttribute('type', 'password')

  // Setar action do Form
  modalForm.setAttribute('action', '/admin/db-reset')

  // Abre Modal
  modal.open()
})
viewTableRooms.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Ver Tabela de Salas'
  modalDescription.innerHTML =
    'Digite a senha de administrador para ver a tabela de salas'

  // Configura Botões da Modal
  modalButton.innerHTML = 'Sim, ver Tabela'
  modalButtonClass.classList.add('none')
  modalButton.classList.remove('none')
  modalButton.classList.remove('red')
  modalButton.removeAttribute('disabled')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
  modalInput.setAttribute('type', 'password')

  // Setar action do Form
  modalForm.setAttribute('action', '/admin/tables/rooms')

  // Abre Modal
  modal.open()
})
viewTablequestions.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Ver Tabela de Questões'
  modalDescription.innerHTML =
    'Digite a senha de administrador para ver a tabela de questões'

  // Configura Botões da Modal
  modalButton.innerHTML = 'Sim, ver Tabela'
  modalButtonClass.classList.add('none')
  modalButton.classList.remove('none')
  modalButton.classList.remove('red')
  modalButton.removeAttribute('disabled')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
  modalInput.setAttribute('type', 'password')

  // Setar action do Form
  modalForm.setAttribute('action', '/admin/tables/questions')

  // Abre Modal
  modal.open()
})
viewAllTables.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Ver todas Tabelas'
  modalDescription.innerHTML =
    'Digite a senha de administrador para ver as tabelas'

  // Configura Botões da Modal
  modalButton.innerHTML = 'Sim, ver Tabelas'
  modalButtonClass.classList.add('none')
  modalButton.classList.remove('none')
  modalButton.classList.remove('red')
  modalButton.removeAttribute('disabled')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
  modalInput.setAttribute('type', 'password')

  // Setar action do Form
  modalForm.setAttribute('action', '/admin/tables/all')

  // Abre Modal
  modal.open()
})

// Room Actions
deleteRoom.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Excluir Sala'
  modalDescription.innerHTML = 'Coloque o código da sala que você quer excluir'

  // Configura Botões da Modal
  modalButtonClass.classList.remove('none')
  modalButton.classList.add('none')
  modalButtonClass.classList.remove('red')
  modalButtonClass.innerHTML = 'Confirmar'
  modalButton.setAttribute('disabled', '')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Código da sala')
  modalInput.setAttribute('type', 'number')

  // Abre Modal
  modal.open()

  // Ao Clicar no Botão da Modal "Obter senha de Sala"
  modalButtonClass.addEventListener('click', function () {
    const roomId = modalInput.value
    if (roomId === '') {
      alert('Preencha o Campo')
    } else {
      // Reseta Input
      modalInput.value = ''

      // Muda Informações da Modal
      modalTitle.innerHTML = 'Excluir Sala'
      modalDescription.innerHTML = `Digite a senha de Admin para excluir a sala <b>${roomId}</b>`

      // Configurações do Input
      modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
      modalInput.setAttribute('type', 'password')

      // Configura Botões
      modalButtonClass.classList.add('none')
      modalButton.classList.remove('none')
      modalButton.classList.add('red')
      modalButton.innerHTML = 'Excluir sala'
      modalButton.removeAttribute('disabled')

      // Seta Action do Form
      modalForm.setAttribute('action', `/admin/delete-room/${roomId}`)
    }
  })
})
roomPass.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Obter senha de Sala'
  modalDescription.innerHTML =
    'Coloque o código da sala que você quer obter a senha'

  // Configura Botões da Modal
  modalButtonClass.classList.remove('none')
  modalButton.classList.add('none')
  modalButtonClass.classList.remove('red')
  modalButtonClass.innerHTML = 'Confirmar'
  modalButton.setAttribute('disabled', '')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Código da sala')
  modalInput.setAttribute('type', 'number')

  // Abre Modal
  modal.open()

  // Ao Clicar no Botão da Modal "Obter senha de Sala"
  modalButtonClass.addEventListener('click', function () {
    const roomId = modalInput.value
    if (roomId === '') {
      alert('Preencha o Campo')
    } else {
      // Reseta Input
      modalInput.value = ''

      // Muda Informações da Modal
      modalTitle.innerHTML = 'Obter senha de Sala'
      modalDescription.innerHTML = `Digite a senha de Admin para Obter a senha da sala <b>${roomId}</b>`

      // Configurações do Input
      modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
      modalInput.setAttribute('type', 'password')

      // Configura Botões
      modalButtonClass.classList.add('none')
      modalButton.classList.remove('none')
      modalButton.classList.remove('red')
      modalButton.innerHTML = 'Obter Senha'
      modalButton.removeAttribute('disabled')

      // Seta Action do Form
      modalForm.setAttribute('action', `/admin/get-room-pass/${roomId}`)
    }
  })
})
deleteRoomQuestions.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Excluir questões de uma Sala'
  modalDescription.innerHTML =
    'Coloque o código da sala que você quer excluir as questões'

  // Configura Botões da Modal
  modalButtonClass.classList.remove('none')
  modalButton.classList.add('none')
  modalButtonClass.classList.remove('red')
  modalButtonClass.innerHTML = 'Confirmar'
  modalButton.setAttribute('disabled', '')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Código da sala')
  modalInput.setAttribute('type', 'number')

  // Abre Modal
  modal.open()

  // Ao Clicar no Botão da Modal "Obter senha de Sala"
  modalButtonClass.addEventListener('click', function () {
    const roomId = modalInput.value
    if (roomId === '') {
      alert('Preencha o Campo')
    } else {
      // Reseta Input
      modalInput.value = ''

      // Muda Informações da Modal
      modalTitle.innerHTML = 'Excluir questões de uma Sala'
      modalDescription.innerHTML = `Digite a senha de Admin para excluir as questões da sala <b>${roomId}</b>`

      // Configurações do Input
      modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
      modalInput.setAttribute('type', 'password')

      // Configura Botões
      modalButtonClass.classList.add('none')
      modalButton.classList.remove('none')
      modalButton.classList.add('red')
      modalButton.innerHTML = 'Excluir questões'
      modalButton.removeAttribute('disabled')

      // Seta Action do Form
      modalForm.setAttribute('action', `/admin/delete-room-questions/${roomId}`)
    }
  })
})
getQuestionsRoom.addEventListener('click', function () {
  // Reseta Input
  modalInput.value = ''

  // Muda Informações da Modal
  modalTitle.innerHTML = 'Ver tabela de questões de uma Sala'
  modalDescription.innerHTML =
    'Coloque o código da sala que você quer ver a tabela de questões'

  // Configura Botões da Modal
  modalButtonClass.classList.remove('none')
  modalButton.classList.add('none')
  modalButtonClass.classList.remove('red')
  modalButtonClass.innerHTML = 'Confirmar'
  modalButton.setAttribute('disabled', '')

  // Configurações do Input
  modalInput.setAttribute('placeholder', 'Código da sala')
  modalInput.setAttribute('type', 'number')

  // Abre Modal
  modal.open()

  // Ao Clicar no Botão da Modal "Obter senha de Sala"
  modalButtonClass.addEventListener('click', function () {
    const roomId = modalInput.value
    if (roomId === '') {
      alert('Preencha o Campo')
    } else {
      // Reseta Input
      modalInput.value = ''

      // Muda Informações da Modal
      modalTitle.innerHTML = 'Ver tabela de questões de uma Sala'
      modalDescription.innerHTML = `Digite a senha de Admin para ver a tablea de questões da sala <b>${roomId}</b>`

      // Configurações do Input
      modalInput.setAttribute('placeholder', 'Digite a Senha de Admin')
      modalInput.setAttribute('type', 'password')

      // Configura Botões
      modalButtonClass.classList.add('none')
      modalButton.classList.remove('none')
      modalButton.classList.remove('red')
      modalButton.innerHTML = 'Ver tabela'
      modalButton.removeAttribute('disabled')

      // Seta Action do Form
      modalForm.setAttribute('action', `/admin/tables/${roomId}`)
    }
  })
})
