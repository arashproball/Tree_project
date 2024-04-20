import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowDown } from "react-icons/io5";
import "../Css/Node.css";
// Define TreeNode interface
interface TreeNode {
  id: number;
  text: string;
  level: number;
  children: TreeNode[];
}

interface NodeProps {
  initialList: TreeNode[];
}

let SelectedText = "";
function Node({ initialList }: NodeProps) {
  const [list, setList] = useState<TreeNode[]>(initialList);
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [rerenderKey, setRerenderKey] = useState<number>(0);
  useEffect(() => {}, [list]);

  const adddown = (targetNode: TreeNode, text: string) => {
    setList((prevList) => {
      // Find the index of the target node
      const targetNodeIndex = prevList.findIndex(
        (node) => node.id === targetNode.id
      );
      if (targetNodeIndex !== -1) {
        // Create a new node to be inserted at the same level as the target node
        const newNode: TreeNode = {
          id: prevList.length,
          text: text,
          level: targetNode.level,
          children: [],
        };
        // Create a new list with the new node inserted after the target node
        const updatedList = [
          ...prevList.slice(0, targetNodeIndex + 1),
          newNode,
          ...prevList.slice(targetNodeIndex + 1),
        ];
        // Return the updated list
        return updatedList;
      }
      // If the target node is not found, return the previous list unchanged
      initialList = prevList;
      return prevList;
    });
  };
  const addfront = (targetNode: TreeNode) => {
    debugger
    setList((prevList) => {
      const targetNodeIndex = prevList.findIndex((node) => node.id === targetNode.id);
      if (targetNodeIndex !== -1) {
        const newChild = {
          id: targetNode.children.length,
          text: "NEW",
          level: targetNode.level + 1,
          children: [],
        };
        // Update state in an immutable way
        if(targetNode.children.length>0){
          alert('این حرکت فقط در Node های پایانی امکان پذیر است');
          
        }else{
        return [
          ...prevList.slice(0, targetNodeIndex),
          { ...prevList[targetNodeIndex], children: [...prevList[targetNodeIndex].children, newChild] },
          ...prevList.slice(targetNodeIndex + 1),
        ];
      }
      }
      return prevList;
    });
    //setRerenderKey(prevkey=>prevkey+1)
  };
  

  const handleLeftClick = (targetNode: TreeNode) => {
    setList((prevList) => {
      const targetNodeIndex = prevList.findIndex(
        (node) => node.id === targetNode.id
      );
      if (targetNodeIndex !== -1) {
        const newChild = {
          id: targetNode.children.length,
          text: targetNode.text,
          level: targetNode.level + 1,
          children: [],
        };
        if(targetNode.children.length>0){
          alert('این حرکت فقط در Node .های پایانی امکان پذیر است');
          
        }else{
        return [
          ...prevList.slice(0, targetNodeIndex),
          { ...prevList[targetNodeIndex], children: [...prevList[targetNodeIndex].children, newChild] },
          ...prevList.slice(targetNodeIndex + 1),
        ];
      }}
      
      return prevList;
    });
    //setRerenderKey((prevkey) => prevkey + 1);
  };

  const handleRightClick = (targetNode: TreeNode) => {
    // const newNode: TreeNode = {
    //   id: list.length,
    //   text: SelectedText,
    //   level: targetNode.level,
    //   children: [],
    // };

    // const updatedList = [...list];
    // const targetNodeIndex = updatedList.findIndex((node) => node.id === targetNode.id);

    // if (targetNodeIndex !== -1) {
    //   const parentNode = list[targetNodeIndex]; // Get the parent node

    //   // If the parent node has no children or it's the selected node, add the new node as its child
    //   const updatedList = [...list.slice(0, targetNodeIndex + 1), newNode, ...list.slice(targetNodeIndex + 1)];

    //   // Otherwise, insert the new node after the parent node

    //   setList(updatedList);
    //   console.log(list)
    // }
    adddown(targetNode, SelectedText);
  };

  const renderNode = (node: TreeNode) => {
    return (
      <li className="scroll" key={node.id} draggable={true}>
        <div
          className="Node"
          data-level={node.level + 1}
          draggable={true}
          onDragStart={(e) => {
            e.stopPropagation();
            handleDragStart(node);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const rect = (
              e.currentTarget as HTMLDivElement
            ).getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const halfWidth = rect.width / 2;

            if (clickPosition < halfWidth) {
              handleLeftClick(node);
            } else {
              handleRightClick(node);
            }
          }}
        >
          <div onDoubleClick={() => handleDoubleClick(node.id, node.text)}>
            {editingNodeId === node.id ? (
              <textarea
                value={editedText}
                onChange={handleChange}
                autoFocus
                onBlur={() => handleBlur(node.id)}
                style={{ width: "100%", height: "60px" }}
              />
            ) : (
              <span>{node.text}</span>
            )}
          </div>
          <div
            className="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
            }}
          >
            <IoAdd className="icon" />
          </div>
          {selectedNodeId === node.id && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  adddown(node, "NEW");
                  setSelectedNodeId(
                    selectedNodeId === node.id ? null : node.id
                  );
                }}
                className="downbutton"
              >
                <IoArrowDown className="icon" />
              </button>
              {node.children.length===0 &&
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addfront(node);
                  setSelectedNodeId(
                    selectedNodeId === node.id ? null : node.id
                  );
                }}
                className="frontbutton"
              >
                <IoArrowBackOutline className="icon" />
              </button>}
            </>
          )}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="children">
            <Node key={rerenderKey} initialList={node.children} />
          </div>
        )}
      </li>
    );
  };

  const handleDoubleClick = (nodeId: number, text: string) => {
    setEditingNodeId(nodeId);
    setEditedText(text);
  };

  const handleBlur = (nodeId: number) => {
    const updatedList = list.map((node) => {
      if (node.id === nodeId) {
        return { ...node, text: editedText };
      }
      return node;
    });
    setList(updatedList);
    setEditingNodeId(null);
    setRerenderKey((prevKey) => prevKey + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleDragStart = (node: TreeNode) => {
    SelectedText = node.text;
    console.log(SelectedText);
  };

  return <ul className="" key={rerenderKey}>{list.map(renderNode)}</ul>;
}

export default Node;
