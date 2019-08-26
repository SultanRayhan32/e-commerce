import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';
import router from './router'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        message : 'hello',
        data : '',
        email : '',
        password : '',
        username : '',
        cartList : {},
        TotalHarga : 0,
        checkAdmin : null
    },
    mutations: {
        increment (state) {
            state.count++
        },
        change (state , payload){
            state.data = payload
        },
        LOGIN (state , payload){
            state.email = payload.email
            state.password = payload.password
        },
        REGISTER (state , payload){
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
        },
        CARTCHANGE (state, payload){
            payload.cartList.forEach(el=>{
                state.TotalHarga+= (el.Product.price * el.quantity) 
                console.log(el.Product.price ,  'dari store , commits')
            })
            state.cartList = payload
        },
        AFTERCHECKOUT (state , payload){
            state.cartList = {}
        },
        INCREMENT (state , payload){
            state.TotalHarga+= payload
        },
        DELETECART (state ,  payload){
            state.cartList =  state.cartList.forEach(el=> el.Product._id != payload)
        },
        LOGOUT (state ,  payload){
            state.checkAdmin = null
        },
        ADMIN (state , payload){
            state.checkAdmin = localStorage.getItem('admin')
        }
    },
    actions : {
        getData ({commit , state}){
            axios.get('http://localhost:3000/')
            .then(({data})=>{
                commit('change' ,  data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        Login ({commit , state}){
            let { email , password}  = state
            axios.post('http://localhost:3000/user/login',{
                email , password
            })
            .then(({data})=>{
                console.log(data ,  ' berhasil login')
                if(data.admin){
                    localStorage.setItem('token' , data.token)
                    localStorage.setItem('admin' , 'yes') 
                    commit('ADMIN' , '')
                    router.push({ path: "/admin1" });
                }else {
                    localStorage.setItem('token' , data.token)
                    router.push({ path: "/" });
                }
                // localStorage.setItem('token' , data.token)
                // router.push({ path: "/" });
            })
            .catch(err=>{
                $swal('gagal')
                console.log(err.message , ' =====')
            })
        },
        Register ({commit ,  state}){
            let {  username ,email , password} = state
            axios.post('http://localhost:3000/user/register',{
                email , password , username
            })
            .then(({data})=>{
                localStorage.setItem('token' , data.token)
                router.push({ path: "/" });
            }).catch(err=>{
                console.log(err.message , ' =====')
            })
        },
        GetCart ({commit ,  state}){
            axios({
                url : 'http://localhost:3000/cart',
                method : 'GET',  
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log('skdmfnjdsonfjodsfndsjkfndskjfndskj', data)
                commit('CARTCHANGE' , data)
            }).catch(err=>{
                console.log(err.message , ' =====')
            })
        }
    }
})

export default store