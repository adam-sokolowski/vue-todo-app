<template>
  <div class="app" id="app">
    <p class="date">
      {{ day }}<span @click="visible = 'todo'">, {{ today }}</span>
      <span
        v-if="doneTasks.length && visible === 'todo'"
        class="list-toggle"
        @click="visible = 'done'">
          {{ otherList }}
      </span>
      <span
        v-else-if="doneTasks.length"
        class="list-toggle"
        @click="visible = 'todo'">
          {{ otherList }}
      </span>
    </p>

    <todo v-if="visible === 'todo'"/>
    <done v-else/>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import todo from './components/todo'
import done from './components/done'
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    todo,
    done
  },

  data() {
    return {
      visible: 'todo'
    }
  },

  computed: {
    ...mapGetters({
      doneTasks: 'completedTasks'
    }),
    day() {
      return dayjs().format('dddd')
    },
    today() {
      dayjs.extend(advancedFormat);
      return dayjs().format('Do MMM');
    },
    otherList() {
      return (this.visible === 'todo') ? 'Done' : 'Main'
    }
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

html
  display flex
  align-items center
  box-sizing border-box
  min-height 100vh
  max-height 100vh
  width 100vw
  justify-content center
  font-family 'Montserrat', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  box-sizing border-box
  color #484848

h1, h2, h3
  font-family 'Playfair Display', serif

p
  margin 0
  padding 0
  font-size 1.2em
  line-height 1.6

a
  text-decoration none

img
  user-select none

.app
  display block
  max-height 100vh
  text-align left
  overflow-x hidden

  p.date
    font-family 'Playfair Display', serif
    font-size 1.6em
    font-weight 600
    color #484848

    span
      font-size 0.8em
      font-weight 400

.list-toggle
  position relative
  left 14px
  border-radius 4px
  padding 8px 24px
  color #340068
  background lighten(#340068, 90%)
  font-size 0.6em !important
  font-weight bold !important
  text-decoration underline
  cursor pointer

.item-holder
  padding 16px
  width 100%
  min-width 50vw
  max-width 800px
  box-sizing border-box

@media only screen and (max-width: 670px)
  html
    display block
    min-height 100vh
    max-height 100vh
    width 100vw
    font-family 'Montserrat', sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    box-sizing border-box
    color #484848

  body
    margin 0

  h1
    font-size 1.4em
    padding 8px

  p
    font-size 1em

  .date
    position fixed
    top 0
    padding 8px
    background #fffcf9
    width 100%
    box-sizing border-box
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    z-index 10

</style>
