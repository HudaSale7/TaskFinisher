/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import "./workspace.css";
import { useQuery } from "react-query";
import { getWorkspace } from "./workspaceApi";
import Board from "./board";
import NavBar from "./navbar";
import TaskForm from "./taskForm";
import { useState } from "react";
import { modalContext } from "./modalContext";

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskStatusId, setTaskStatusId] = useState({taskId: "-1", statusId: "-1"});
  const { id } = useParams();
  const workspaceId = id as string;
  const query = useQuery(["workspace", id], () => getWorkspace(workspaceId));

  return (
    <>
      <modalContext.Provider
        value={{
          modal: isModalOpen,
          setModal: setIsModalOpen,
          taskStatusId: taskStatusId,
          setTaskStatusId: setTaskStatusId,
        }}
      >
        <div className="workspace">
          {query.data && (
            <>
              <NavBar
                workspaceId={workspaceId}
                workspace={query.data.getWorkspace.workspace}
              />
              <Board
                workspaceId={workspaceId}
                workspace={query.data?.getWorkspace.workspace}
              />
              {isModalOpen && (
                <TaskForm
                  workspaceId={workspaceId}
                  workspace={query.data?.getWorkspace.workspace}
                />
              )}
            </>
          )}
        </div>
      </modalContext.Provider>
    </>
  );
}

export default Workspace;
