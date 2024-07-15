import Swal from 'sweetalert2'

const alertError = (errorMsg = '有某個地方出錯了！') => {
  Swal.fire({ text: errorMsg, icon: 'error', position: 'top-end', timer: 1500 })
}

export { alertError }
