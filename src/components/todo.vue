<template>
    <div class="todo">
        <div 
            class="item-holder"
            v-if="mainTask.length">

            <contentInput 
                v-for="task in mainTask"
                :id="task.id"
                :key="task.id"
                :edit="false"
                :status="task.status"
                :task="task"
                :content="task.content"/>

        </div>
        <div
            class="item-holder"
            v-if="otherTasks.length">

            <contentInput
                v-for="task in otherTasks"
                :id="task.id"
                :key="task.id"
                :edit="false"
                :status="task.status"
                :task="task"
                :content="task.content"/>

        </div>

        <div v-if="mainTask.length || otherTasks.length">
            <contentInput 
                :edit="true"
                :status="'create-other'"
                @addItem="addNewTask" />
        </div>

        <div v-if="!mainTask.length && !otherTasks.length">
            <h1>What is the most important thing you want to do today?</h1>
            <div class="item-holder">
                <!--
                    Improvement:
                    I've added content editable holder instead of normal textarea/input for nicer multiline presence.

                    * there is a bug with it in this implementation that pasted rich text would overwrite styles
                    - This can be fixed with intercepting clipboard 
                -->
                <contentInput 
                    :edit="true"
                    :status="'create-main'"
                    @addItem="addNewTask" />
            </div>
        </div>

        <!--
        
        -->

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import contentInput from './content-input'

export default {
    name: 'todo',

    components: {
        contentInput
    },

    computed: {
        ...mapGetters({
            mainTask: 'mainTask',
            otherTasks: 'otherTasks',
            doneTasks: 'completedTasks',
            deletedTasks: 'deletedTasks'
        }),
    },

    data() {
        return {
            showMain: true,
            showOther: false
        }
    },

    methods: {
        ...mapActions([
            'addTask',
        ]),
        addNewTask(value) {
            this.markAddedItem(value.status)
            this.addTask(value)
        },
        markAddedItem(status) {
            if (status === 'main') {
                this.showMain = false
                this.showOther = true
            }
        }
    }
}
</script>
<style lang="stylus">
@media only screen and (max-width: 670px)
    .todo
        margin-top 60px
</style>

