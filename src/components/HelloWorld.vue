<template>
  <v-container>
    <v-app-bar app color="primary">
      <v-toolbar-title>Моё приложение</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Пользователи</v-btn>
      <v-btn to="/payment" text>Платежи</v-btn>
    </v-app-bar>
    <h2>Список пользователей</h2>
    <v-card v-for="(user, index) in users" :key="index" class="user-card">
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>{{ user.email }}</v-card-text>
      <v-card-text>{{ user.phone }}</v-card-text>
      <v-card-title>Текущие задачи</v-card-title>
      <v-card-text>
        <ul>
          <li v-for="(task, taskIndex) in user.tasks" :key="taskIndex">
            <div class="task-wrapper">
              <span :class="{ 'completed-task': task.completed }">{{ task.description }}</span>
              <v-checkbox v-model="task.completed" class="task-checkbox"></v-checkbox>
            </div>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!editingUser" color="primary" @click="showEditModal(user)">Редактировать</v-btn>
        <v-btn v-if="!editingUser" color="primary" @click="performPayment(user)">Совершить платеж</v-btn>
      </v-card-actions>
    </v-card>

    <h2>Добавление пользователя</h2>
    <v-form>
      <v-text-field v-model="newUser.email" label="Email"></v-text-field>
      <v-text-field v-model="newUser.name" label="Имя"></v-text-field>
      <v-text-field v-model="newUser.phone" label="Номер телефона"></v-text-field>
      <v-btn color="primary" @click="addUser">Добавить</v-btn>
    </v-form>

    <v-dialog v-model="editingUser" max-width="500px">
      <v-card v-if="editingUser">
        <v-card-title>
          <h2>Редактирование пользователя</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="editingUser.email" label="Email"></v-text-field>
            <v-text-field v-model="editingUser.name" label="Имя"></v-text-field>
            <v-text-field v-model="editingUser.phone" label="Номер телефона"></v-text-field>
            <h3>Задачи пользователя</h3>
            <ul>
              <li v-for="(task, taskIndex) in editingUser.tasks" :key="taskIndex">
                <div class="task-wrapper-modal">
                  <span :class="{ 'completed-task': task.completed }">{{ task.description }}</span>
                  <v-icon @click="removeTask(editingUser, task)" class="delete-task-icon">mdi-delete</v-icon>
                </div>
              </li>
            </ul>
            <v-text-field v-model="newTaskDescription" label="Описание задачи"></v-text-field>
            <v-btn color="primary" @click="addTask">Добавить задачу</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveUser">Сохранить</v-btn>
          <v-btn color="secondary" @click="cancelEdit">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          email: 'user1@example.com',
          name: 'Пользователь 1',
          phone: '1234567890',
          tasks: []
        },
        {
          email: 'user2@example.com',
          name: 'Пользователь 2',
          phone: '0987654321',
          tasks: []
        }
      ],
      newUser: {
        email: '',
        name: '',
        phone: '',
        tasks: []
      },
      editingUser: null,
      newTaskDescription: '',
      payments: [] 
    };
  },
  methods: {
    addUser() {
      if (this.newUser.email && this.newUser.name && this.newUser.phone) {
        this.users.push({ ...this.newUser, tasks: [] });
        this.newUser.email = '';
        this.newUser.name = '';
        this.newUser.phone = '';
      }
    },
    showEditModal(user) {
      this.editingUser = { ...user };
    },
    saveUser() {
      const index = this.users.findIndex((user) => user.email === this.editingUser.email);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser };
        this.editingUser = null;
      }
    },
    cancelEdit() {
      this.editingUser = null;
    },
    addTask() {
      if (this.newTaskDescription) {
        this.editingUser.tasks.push({ description: this.newTaskDescription, completed: false });
        this.newTaskDescription = '';
      }
    },
    removeTask(user, task) {
      const index = user.tasks.indexOf(task);
      if (index !== -1) {
        user.tasks.splice(index, 1);
      }
    },
    performPayment(user) {
      const payment = {
        user: user.name,
        time: new Date().toLocaleString()
      };
      this.$store.dispatch('performPayment', payment);
    }
  }
};
</script>

<style scoped>
.user-card {
  margin-bottom: 20px;
}

.completed-task {
  text-decoration: line-through;
}

.delete-task-icon {
  cursor: pointer;
  color: red;
}

.task-wrapper {
  display: flex;
  align-items: center;
}

.task-checkbox {
  margin-top: 20px;
  margin-left: 8px;
}

.task-wrapper-modal {
  margin-top: 20px;
  margin-bottom: 20px;
}

.edit-user-icon {
  cursor: pointer;
}
</style>
