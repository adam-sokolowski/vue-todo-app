<template>
    <div class="round" @click="toggleCheckbox()">
        <input
            :id="checkboxId"
            type="checkbox"/>
        <label for="checkbox"></label>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    props: [
        'id'
    ],

    computed: {
        checkboxId() {
            return this.id + '-checkbox'
        }
    },

    methods: {
        ...mapActions([
            'markTask',
        ]),
        toggleCheckbox() {
            const checkbox = document.getElementById(this.checkboxId)
            checkbox.checked = !checkbox.checked
            const data = {
                'id': this.id,
                'value': checkbox.checked
            }
            // Here I protect sending the mutation if user mistakenly toggled done for 3secs
            setTimeout(() => {
                if (checkbox.checked !== true) return
                this.markTask(data)
            }, 3000)
        }
    }
}
</script>
<style lang="stylus" scoped>
.round
    position absolute
    top 12px
    right 16px
    display inline-block
    width 2em
    margin-left 28px
    z-index 3
    vertical-align top
    visibility hidden

    label
        position absolute
        top 0
        left 0
        height 28px
        width 28px
        border 1px solid #ccc
        border-radius 50%
        background-color transparent
        cursor pointer
        transition all 0.5s ease

        &:after
            position absolute
            top 8px
            left 7px
            height 6px
            width 12px
            border 2px solid #fff
            border-top none
            border-right none
            content ""
            opacity 0
            transform rotate(-45deg)

    input[type="checkbox"]
        visibility hidden

    input[type="checkbox"]:checked + label
        background-color #66bb6a
        border-color #66bb6a
        visibility visible !important

    input[type="checkbox"]:checked + label:after
        opacity 1
</style>