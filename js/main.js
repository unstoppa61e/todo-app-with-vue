const additionIndex = -1

const app = Vue.createApp({
  data () {
    return {
      newItem: '',
      editingItemIndex: additionIndex,
      todos: []
    }
  },
  methods: {
    setItem () {
      const item = this.newItem
      if (item === '') {
        return
      }
      if (this.isEditionMode) {
        this.todos[this.editingItemIndex] = item
      } else {
        this.todos.push(item)
      }
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.resetStatus()
    },
    deleteItem (index) {
      if (confirm('Are you sure?')) {
        this.todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(this.todos))
        this.resetStatus()
      }
    },
    editItem (index) {
      this.newItem = this.todos[index]
      this.editingItemIndex = index
    },
    isEditingItem (index) {
      return index === this.editingItemIndex
    },
    resetStatus () {
      this.editingItemIndex = additionIndex
      this.newItem = ''
    }
  },
  mounted () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  computed: {
    noToDos () {
      return !this.todos.length
    },
    isEditionMode () {
      return this.editingItemIndex !== additionIndex
    },
    buttonLabel () {
      return this.isEditionMode ? 'Update' : 'Add'
    }
  }
})

app.mount('#app')
