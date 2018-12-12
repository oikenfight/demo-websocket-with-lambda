require('./bootstrap');

import Vue from 'vue'
import IndexComponent from './components/Index'

import router from './router';

console.log('hoge')

new Vue({
    router,
    render: h => h(IndexComponent),
}).$mount('#app')

// window.onload = function () {
//     new Vue(IndexComponent).$mount('#app')
// }