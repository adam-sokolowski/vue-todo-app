import Vue from 'vue'
import { 
    ADD_TASK,
    MARK_TASK,
    EDIT_TASK,
    DELETE_TASK
} from './mutations-types'

export default {
    [ADD_TASK](state, payload) {
        state.tasks.push(payload)
        // Vue.set(state.tasks, id, value)
        
    },
    [MARK_TASK](state, payload) {
        const i = state.tasks.map(task => task.id).indexOf(payload.id)
        Vue.set(state.tasks[i], 'active', !payload.value)
    },
    [EDIT_TASK](state, payload) {
        const i = state.tasks.map(task => task.id).indexOf(payload.id)
        Vue.set(state.tasks[i], 'content', payload.value)
    },
    [DELETE_TASK](state, payload) {
        const i = state.tasks.map(task => task.id).indexOf(payload.id);
        state.deletedTasks.push(payload)
        state.tasks.splice(i, 1);
    }
} 