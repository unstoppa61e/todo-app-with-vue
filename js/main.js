const additionButtonLabel = 'Add'
const additionIndex = -1

const app = Vue.createApp({
  data: () => ({
    newItem: '',
    buttonLabel: additionButtonLabel,
    editingItemIndex: additionIndex,
    todos: []
  }),
  watch: {
    todos: {
      handler: function () {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      deep: true
    }
  },
  methods: {
    setItem: function () {
      const item = this.newItem
      if (item === '') {
        return
      }
      if (this.isEditionMode()) {
        this.todos[this.editingItemIndex] = item
      } else {
        this.todos.push(item)
      }
      this.resetStatus()
    },
    isEditionMode: function () {
      return this.editingItemIndex !== additionIndex
    },
    deleteItem: function (index) {
      if (confirm('Are you sure?')) {
        this.todos.splice(index, 1)
        this.resetStatus()
      }
    },
    editItem: function (index) {
      this.newItem = this.todos[index]
      this.editingItemIndex = index
      this.buttonLabel = 'Update'
    },
    isEditingItem: function (index) {
      return index === this.editingItemIndex
    },
    resetStatus: function () {
      this.buttonLabel = additionButtonLabel
      this.editingItemIndex = additionIndex
      this.newItem = ''
    }
  },
  mounted: function () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  }
})

app.mount('#app')
