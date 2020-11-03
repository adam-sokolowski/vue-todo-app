import { 
    ADD_TASK,
    MARK_TASK,
    EDIT_TASK,
    DELETE_TASK
} from './mutations-types'

export default {
    addTask ({ commit }, payload) {
        commit(ADD_TASK, payload)
    },
    markTask ({ commit }, payload) {
        commit(MARK_TASK, payload)
    },
    editTask ({ commit }, payload) {
        commit(EDIT_TASK, payload)
    },
    deleteTask ({ commit }, payload) {
        commit(DELETE_TASK, payload)
    }
}
  