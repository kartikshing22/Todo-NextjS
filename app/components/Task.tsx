"use client";

import { ITask } from "@/types/task";
import { TiEdit } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  proptask: ITask[];
}

const Task: React.FC<TaskProps> = ({ proptask }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(proptask.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: proptask.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={proptask.id}>
      <td className="w-full">{proptask.text}</td>
      <td className="flex gap-5">
        <TiEdit
          onClick={() => setOpenModalEdit(true)}
          className="text-blue-500"
          cursor="pointer"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpenpass={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FaTrash
          onClick={() => setOpenModalDelete(true)}
          className="text-red-500"
          cursor="pointer"
          size={25}
        />
        <Modal
          modalOpen={openModalDelete}
          setModalOpenpass={setOpenModalDelete}
        >
          <h3 className="text-lg">Want to Delete</h3>
          <div>
            <button onClick={() => handleDeleteTask(proptask.id)}>Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
