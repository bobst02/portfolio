var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      /*
      id:'',
      content:'',
      completed:false
      */
    ],
    page: 'allTodo',
    cacheTodo: {},
    cacheContent: '',
  },
  methods: {
    addTodo: function() {
      // 去除頭尾空白
      let value = this.newTodo.trim();
      // 輸入空白不會成立待辦事項
      if (!value) {
        this.newTodo = '';
        return;
      }
      // 將當下的時間作為id
      let time = Math.floor(Date.now());
      // 新增至 todos 陣列
      this.todos.unshift({
        id: time,
        content: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo: function(todo) {
      let delKey = this.todos.findIndex(function(todos) {
        return todo.id === todos.id
        // 當將刪除的id === 儲存todos id時，回傳todos索引
      })
      this.todos.splice(delKey, 1);
    },
    editTodo: function(todo) {
      this.cacheTodo = todo;
      this.cacheContent = todo.content;
    },
    doneEdit: function(todo) {
      todo.content = this.cacheContent.trim();
      this.cacheTitle = '';
      this.cacheTodo = {};
    },
    cancelEdit:function(){
      this.cacheTodo = {};
    }
  },
  computed: {
    changePage: function() {
      let pageTodo = [];
      if (this.page === 'allTodo') {
        console.log(this.todos);
        return this.todos;
      } else if (this.page === 'compTodo') {
        this.todos.forEach(function(todo) {
          if (todo.completed) {
            pageTodo.unshift(todo);
          }
        })
        return pageTodo; //如果狀態為完成，回傳已完成陣列
      } else if (this.page === 'uncompTodo') {
        this.todos.forEach(function(todo) {
          if (!todo.completed) {
            pageTodo.unshift(todo);
          }
        })
        return pageTodo;
      }
    }
  }
})