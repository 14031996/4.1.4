import classNames from "classnames";
import type { ChangeEvent, FormEvent } from "react";
import Close from "../../assets/icons/close.svg?react";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/Input/Input";
import { Modal } from "../../ui/Modal/Modal";
import { Prioroty, Status } from "../../types";
import type { Task } from "../../serverData/taskList";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  addTask,
  editTask,
  changeTaskText,
  changePriority,
} from "../../store/reducers/TaskSlice";
import Style from "./AddEditTaskModal.style.module.scss";

type AddEditTaskModalType = {
  onClose: () => void;
  selectedTaskId: string | null;
};

export const AddEditTaskModal = ({
  onClose,
  selectedTaskId,
}: AddEditTaskModalType) => {
  const dispatch = useTypedDispatch();

  const { tasks, taskText, prioritySelected } = useTypedSelector(
    (state) => state.tasks,
  );

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskText(event.target.value));
  };

  const handleChangePriority = (priority: Prioroty) => {
    dispatch(changePriority(priority));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskText.trim() === "") {
      return;
    }

    if (selectedTaskId !== null) {
      const selectedTask = tasks.find((task) => task.id === selectedTaskId);

      if (!selectedTask) {
        return;
      }

      dispatch(
        editTask({
          ...selectedTask,
          title: taskText,
          priority: prioritySelected,
        }),
      );
    } else {
      const newTask: Task = {
        id: Math.random().toString(),
        title: taskText,
        priority: prioritySelected,
        status: Status.TODO,
        progress: 0,
      };

      dispatch(addTask(newTask));
    }

    onClose();
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className={Style["add-edit-modal"]}>
          <div className="flx-between">
            <span className={Style["modal-title"]}>
              {selectedTaskId !== null ? "Редактировать" : "Добавить"} задачу
            </span>

            <Button
              title=""
              type="button"
              classNames={["btn--reset"]}
              icon={<Close className="cp" />}
              onClick={onClose}
            />
          </div>

          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={handleChangeText}
            name="title"
            value={taskText}
          />

          <div className={Style["modal-priority"]}>
            <span>Приоритет</span>

            <ul className={Style["priority-buttons"]}>
              {[Prioroty.HIGH, Prioroty.MEDIUM, Prioroty.LOW].map(
                (priority) => (
                  <li
                    key={priority}
                    onClick={() => handleChangePriority(priority)}
                    className={classNames(
                      Style[
                        `${priority}${
                          priority === prioritySelected ? "-selected" : ""
                        }`
                      ],
                      Style.priority,
                    )}
                  >
                    {priority}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flx-right mt-50">
            <Button
              type="submit"
              title={selectedTaskId !== null ? "Редактировать" : "Добавить"}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
