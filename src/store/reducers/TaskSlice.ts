import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { taskList } from "../../serverData/taskList";
import type { Task } from "../../serverData/taskList";
import { Prioroty } from "../../types";

type TaskState = {
  tasks: Task[];
  showAddEditModal: boolean;
  showDeleteModal: boolean;
  selectedTaskId: string | null;
  taskText: string;
  prioritySelected: Prioroty;
};

const initialState: TaskState = {
  tasks: taskList,
  showAddEditModal: false,
  showDeleteModal: false,
  selectedTaskId: null,
  taskText: "",
  prioritySelected: Prioroty.HIGH,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },

    editTask: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    openAddModal: (state) => {
      state.selectedTaskId = null;
      state.taskText = "";
      state.prioritySelected = Prioroty.HIGH;
      state.showAddEditModal = true;
      state.showDeleteModal = false;
    },

    openEditModal: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);

      if (task) {
        state.selectedTaskId = task.id;
        state.taskText = task.title;
        state.prioritySelected = task.priority;
        state.showAddEditModal = true;
        state.showDeleteModal = false;
      }
    },

    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
      state.showDeleteModal = true;
      state.showAddEditModal = false;
    },

    closeModals: (state) => {
      state.showAddEditModal = false;
      state.showDeleteModal = false;
      state.selectedTaskId = null;
      state.taskText = "";
      state.prioritySelected = Prioroty.HIGH;
    },

    changeTaskText: (state, action: PayloadAction<string>) => {
      state.taskText = action.payload;
    },

    changePriority: (state, action: PayloadAction<Prioroty>) => {
      state.prioritySelected = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  openAddModal,
  openEditModal,
  openDeleteModal,
  closeModals,
  changeTaskText,
  changePriority,
} = taskSlice.actions;

export default taskSlice.reducer;
