<template>
    <div
        class="content-input"
        :class="{ 'full-width': content }">

        <!-- With mroe time I would have also toggled the placeholder text based on size.. -->
        <div 
            :id="contentId"
            :contentEditable="edit"
            data-placeholder="ex. Fly to Mallorca, Wash your car, File a report.."
            class="input-line"
            :class="{ 'main-content' : (status == 'main'), 'other-content': (status == 'other') }"
            @keydown.enter.prevent="modifyItem(contentId)"
            @click="editCurrentTask()"
            @focus="showDelete = true"
            @blur="hideDelete">

            <p v-if="content">{{ content }}</p>
        </div>

        <checkbox
            v-if="content"
            :id="contentId" />

        <div
            class="deleted-icon"
            :class="{ 'other-delete': (status == 'other') }"
            @click="deleteItem(task)">
            <img v-if="content && showDelete" alt="delete" src="../assets/delete.svg">
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

import checkbox from './checkbox'
export default {
    props: [
        'id',
        'edit',
        'status',
        'task',
        'content'
    ],

    components: {
        checkbox
    },

    data() {
        return {
            showDelete: false
        }
    },

    computed: {
        contentId() {
            return this.id ? this.id : 'multilineinput'
        }
    },

    methods: {
        ...mapActions([
            'editTask',
            'deleteTask'
        ]),
        modifyItem(id) {
            (id === 'multilineinput') ? this.addTask(id) : this.saveEdittedTask(id)
        },
        createUuid() {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c=='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        },
        addTask(id) {
            const data = document.getElementById(id)
            const uuid = this.createUuid().toString()
            const newTask = {
                id: uuid,
                active: true,
                categories: [],
                content: data.innerText
            } 
            newTask.status = (this.status === 'create-main' || this.status === 'main') ? 'main' : 'other'
            this.$emit('addItem', newTask )
            data.innerHTML = ''
        },
        editCurrentTask() {
            if (this.contentId !== 'multilineinput') {
                const mainContent = document.getElementById(this.contentId)
                mainContent.contentEditable = true
                mainContent.focus()
            }
        },
        // I could have handled editting in numerous way, thought ENTER again is the simplest, no need for debounce etc..
        saveEdittedTask(id) {
            // NOTE: textContent won't work in IE.. aware of it, didn't want to spend time parsing innerText
            const data = {
                'id': id,
                'value': document.getElementById(id).textContent
            }
            this.editTask(data)
            document.activeElement.blur()
        },
        deleteItem(item) {
            this.deleteTask(item)
        },
        hideDelete() {
            setTimeout(() => {
                this.showDelete = false
            }, 500)
        }
    }
}
</script>
<style lang="stylus" scoped>
.content-input
    position relative
    display inline-block
    margin 0
    padding 0
    width 100%
    max-width 800px

    &:hover
        .round
            visibility visible

    .input-line
        position relative
        display inline-block
        padding 8px
        border 0
        border-bottom 1px solid #b7b7b7
        font-size 1.1em
        width 100%
        overflow auto
        color #282828
        line-height 1.6
        box-sizing border-box
        z-index 2
        transition all 0.3s ease
    
        &:focus
            outline none
            border-bottom 1px solid #484848

        &:empty:before
            content: attr(data-placeholder)

    .main-content
        width 100%
        margin auto
        border-radius 4px
        border-bottom 0
        padding 2em
        color #fffcf9
        background #6d435a
        box-shadow 0 3px 6px rgba(109, 67, 90,0.16), 0 3px 6px rgba(109, 67, 90,0.23)
        cursor pointer

        &:hover
            box-shadow: 0 14px 28px rgba(109, 67, 90,0.25), 0 10px 10px rgba(109, 67, 90,0.22)

    .other-content
        position relative
        left 10%
        margin auto
        margin-bottom 0.7em
        border-radius 4px
        border-bottom 0
        padding 1em
        font-size 0.8em
        color #6d435a
        background #fffcf9
        width 80%
        transition all 0.5s ease
        box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
        cursor pointer

        &:hover
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)

        ~ .round
            top 10px
            right calc(10% + 16px)

.full-width
    width 100%
    cursor pointer

.deleted-icon
    position relative
    top -48px
    left calc(100% + 8px)
    width 28px
    cursor pointer
    z-index 4

    img
        width 28px
        height 28px
        opacity 0.3
        transition all 0.5s ease

        &:hover
            opacity 1

.other-delete
    left calc(90% + 8px)

#multilineinput
    margin-left 24px

@media only screen and (max-width: 670px)
    .content-input .input-line
        font-size 1em

    .deleted-icon
        left calc(100% - 36px)

    .other-delete
        left calc(90% + 10px)

    #multilineinput
        box-sizing: border-box;
        max-width: calc(100% - 24px);
        margin-left: 12px;
</style>