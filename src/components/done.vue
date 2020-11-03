<template>
    <div class="done">
        <div 
            class="item-holder"
            v-if="doneTasks.length">
            <div 
                v-for="task in doneTasks"
                :key="task.id"
                :title="task.status"
                class="done-item">

                <div 
                    class="ball"
                    :class="{ 'other-ball': task.status !== 'main' }">
                    &nbsp;
                </div>
                <p class="done-tasks">
                    {{ task.content }}
                </p>
                <div class="undone" @click="returnToList(task)">
                    Undone
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'todo',

    computed: {
        ...mapGetters({
            doneTasks: 'completedTasks'
        }),
    },

    methods: {
        ...mapActions([
            'markTask',
        ]),
        returnToList(task) {
            const data = {
                'id': task.id,
                'value': false
            }
            this.markTask(data)
        }
    }
}
</script>
<style lang="stylus" scoped>
.done-item > * 
    display inline-block
    margin 8px
    vertical-align middle

.ball
    width 28px
    height 28px
    border-radius 50%
    background #6d435a

.other-ball
    background #fffcf9
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)

.done-tasks
    text-decoration line-through

.undone
    border 1px solid #6d435a
    border-radius 4px
    background lighten(#6d435a, 80%)
    color #6d435a
    padding 4px 8px
    font-size 12px
    font-weight 600
    cursor pointer
    text-transform uppercase

@media only screen and (max-width: 670px)
    .done
        margin-top 60px
</style>