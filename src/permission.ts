import router from './router'
import { ElMessage } from 'element-plus'

const whitelist: string[] = ['/login', '/404'];

router.beforeEach(async (to, from, next) => {  
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if(whitelist.includes(to.path)){
    next()
  }else {
    if(isAuthenticated == 'false'){
      ElMessage({
        message: 'token失效請重新登入。',
        type: 'warning',
      })
      next({ name: 'Login' })
    }else {
      next()
    }
  }
})



// else {
//   if (!loginSuccess.value) {
//     ElMessage({
//       message: 'token失效請重新登入。',
//       type: 'warning',
//     })
//     next({ name: 'Login' });
//   }else if(!isAuthenticated.value){
//     ElMessage({
//       message: 'token失效請重新登入。',
//       type: 'warning',
//     })
//     next({ name: 'Login' });
//   }else {
//     next()
//   }
// }