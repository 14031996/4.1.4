import Style from "./TodoList.style.module.scss";
import Add from "../../assets/icons/add.svg?react";
import { AddEditTaskModal } from "../AddEditTaskModal/AddEditTaskModal";
import { Button } from "../../ui/button/Button";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { TaskCard } from "../TaskCard/TaskCard";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  openAddModal,
  openEditModal,
  openDeleteModal,
  closeModals,
  deleteTask,
} from "../../store/reducers/TaskSlice";

export const TodoList = () => {
  const dispatch = useTypedDispatch();

  const { tasks, showAddEditModal, showDeleteModal, selectedTaskId } =
    useTypedSelector((state) => state.tasks);

  const handleClickOpenModal = () => {
    dispatch(openAddModal());
  };

  const handleClickCloseModal = () => {
    dispatch(closeModals());
  };

  const handleClickEditTask = (id: string) => {
    dispatch(openEditModal(id));
  };

  const handleClickDeleteTaskModal = (id: string) => {
    dispatch(openDeleteModal(id));
  };

  const handleClickDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
    dispatch(closeModals());
  };

  return (
    <>
      <div className={Style["page-wrapper"]}>
        <div className={Style["top-title"]}>
          <h2>Список задач</h2>

          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={handleClickOpenModal}
          />
        </div>

        <div className={Style["task-container"]}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleClickEditTask}
              onDelete={handleClickDeleteTaskModal}
            />
          ))}
        </div>
      </div>

      {showAddEditModal && (
        <AddEditTaskModal
          onClose={handleClickCloseModal}
          selectedTaskId={selectedTaskId}
        />
      )}

      {showDeleteModal && selectedTaskId !== null && (
        <DeleteModal
          onClose={handleClickCloseModal}
          handleClickDeleteTask={handleClickDeleteTask}
          selectedTaskId={selectedTaskId}
        />
      )}
    </>
  );
};
