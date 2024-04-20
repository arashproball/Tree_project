import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";

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

let SelectedText = '';
let rerenderKey = 0; // Key to trigger re-render

function Node({ initialList }: NodeProps) {
  const [list, setList] = useState<TreeNode[]>(initialList);
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  useEffect(() => {
    // This effect will be called whenever 'list' changes
    //console.log("List updated:", list);
  }, [list]);



//   const handleDrop = (id: number, level: number) => {
//     const updatedList = [...list];
//     const targetNodeIndex = updatedList.findIndex(node => node.id === id);
//     if (targetNodeIndex === id) {
//         const newChild: TreeNode = {
//             id: updatedList[targetNodeIndex].children.length,
//             text: SelectedText,
//             level: level+1,
//             children: []
//         };
//         updatedList[targetNodeIndex].children.push(newChild);
//         setList(updatedList);
//         rerenderKey += 1; // Trigger re-render
//         console.log("List updated:", list);
//     }
// };

const handleLeftClick = (targetNode:TreeNode) => {
  const updatedList = [...list];
    
    
        const newChild: TreeNode = {
            id: targetNode.children.length,
            text: SelectedText,
            level: targetNode.level+1,
            children: []
        }
        targetNode.children.push(newChild);
        setList(updatedList);
        //rerenderKey += 1; // Trigger re-render
        console.log("List updated:", list);
        rerenderKey++;
    };
    const handleRightClick = (targetNode: TreeNode) => {
      const updatedList = [...list];
      // Find the index of the target node
      const targetNodeIndex = updatedList.findIndex(node => node.id === targetNode.id);
      if (targetNodeIndex !== -1) {
        // Create a new node to be inserted at the same level as the target node
        const newNode: TreeNode = {
          id: updatedList.length,
          text: SelectedText,
          level: targetNode.level,
          children: []
        };
        // Insert the new node after the target node
        updatedList.splice(targetNodeIndex + 1, 0, newNode);
        setList(updatedList);
        console.log("List updated:", list);
        rerenderKey++;
      }
      
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
          
          onDragOver={(e)=>
            {e.preventDefault();}
          }
          onDrop={(e) => {
            e.stopPropagation;
            e.preventDefault;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
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
          <div className="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
            }}
          >
            <IoAdd className="icon" />
          </div>
          {selectedNodeId === node.id && <><button className="downbutton"><IoAdd className="icon"/></button><button className="frontbutton"><IoAdd className="icon"/></button></>}
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleDragStart = (node: TreeNode) => {
    SelectedText = node.text;
    console.log(SelectedText);
  };


  return (
    <ul key={rerenderKey} className="">{list.map(renderNode)}</ul>
  );
}

export default Node;
