export default {
    mainTask: state => state.tasks.filter( task => {
        return (task.status === 'main' && task.active === true)
    }),
    otherTasks: state => state.tasks.filter( task => {
        return (task.status === 'other' && task.active === true)
    }),
    completedTasks: state => state.tasks.filter( task => {
        return (task.active === false)
    }),
    deletedTasks: state => state.deletedTasks
}