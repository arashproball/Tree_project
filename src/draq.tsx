import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";

interface TreeNode {
  id: number;
  text: string;
  level: number;
  children: TreeNode[];
}

interface NodeProps {
  initialList: TreeNode[];
}
let SelectedText = '';
let rerenderKey = 0; // Key to trigger re-render

function Node({ initialList }: NodeProps) {
  const [list, setList] = useState<TreeNode[]>(initialList);
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    // This effect will be called whenever 'list' changes
    //console.log("List updated:", list);
  }, [list]);

  const handleDrop = (id: number, level: number) => {
    const updatedList = [...list];
    const targetNodeIndex = updatedList.findIndex(node => node.id === id);
    if (targetNodeIndex > -1) {
      const newChild: TreeNode = {
        id: updatedList[targetNodeIndex].children.length,
        text: SelectedText,
        level: level + 1,
        children: []
      };
      updatedList[targetNodeIndex].children.push(newChild);
      setList(updatedList);
      rerenderKey++;
      console.log("List updated:", updatedList); // Use updatedList instead of list
    }
  };

  const handleLeftClick = () => {
    console.log('Clicked in the first 50%');
  };

  const handleRightClick = () => {
    console.log('Clicked in the second 50%');
  };

  const renderNode = (node: TreeNode) => {
    return (
      <li
        className="scroll"
        key={node.id}
        draggable={true}
      >
        <div
          className="Node"
          data-level={node.level + 1}
          draggable={true}
          onDragStart={(e) => {
            e.stopPropagation();
            handleDragStart(node);
          }}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
            const clickPosition = event.clientX - rect.left;
            const halfWidth = rect.width / 2;

            if (clickPosition < halfWidth) {
              handleLeftClick();
            } else {
              handleRightClick();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDrop(node.id, node.level);
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
          <div className="button"><IoAdd className="icon" /></div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="children">
            <Node key={node.id} initialList={node.children} />
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleDragStart = (node: TreeNode) => {
    SelectedText = node.text;
    console.log(SelectedText);
  };

  return (
    <ul className="">{list.map(renderNode)}</ul>
  );
}

export default Node;
