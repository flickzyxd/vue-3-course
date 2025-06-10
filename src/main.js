import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router.js";
import VIntersection from "@/directives/VIntersection.js";
import directives from "@/directives";

const app = createApp(App)

components.forEach(component =>  {
    app.component(component.name, component)
    console.log(component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .mount('#app')
