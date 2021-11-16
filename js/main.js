'use strict'

var vm = new Vue({
  el: '#app',
  data: {
    newItem: '',
    buttonLabel: 'Add',
    editingIndex: -1,
    todos: []
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      deep: true
    }
  },
  mounted: function() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  methods: {
    setItem: function() {
      const item = this.newItem
      if (this.isEditing()) {
        this.todos[this.editingIndex] = this.newItem
        this.editingIndex = -1
        this.buttonLabel = 'Add'
      } else {
        this.todos.push(item)
      }
      this.newItem = ''
    },
    isEditing: function () {
      return this.editingIndex !== -1
    },
    deleteItem: function(index) {
      if (confirm('Are you sure?')) {
        this.todos.splice(index, 1)
      }
    },
    editItem: function(index) {
      this.newItem = this.todos[index]
      this.editingIndex = index
      this.setButtonText()
    },
    setButtonText: function () {
      this.buttonLabel = 'Update'
    }
  }
})
