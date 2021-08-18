const roomIdInput = document.getElementById('copyRoomId')
const roomIdButton = document.querySelector('header .buttons div.outlined')

roomIdButton.addEventListener('click', function () {
  roomIdInput.select()
  document.execCommand('copy')
  alert('Copiado para a área de transferência')
})
