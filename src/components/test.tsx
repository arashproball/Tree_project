import React, { useState } from 'react';

interface TreeNodeData {
  id: number;
  text: string;
  level: number;
  children: TreeNodeData[];
}


interface MyComponentProps {
  initialList: TreeNodeData[];
}

function MyComponent({ initialList }:MyComponentProps) {
    const [list, setList] = useState<TreeNodeData[]>(initialList);

    const handleNodeDoubleClick = (nodeId: number, newText: string) => {
        const updatedList = list.map((node) => {
            if (node.id === nodeId) {
                return { ...node, text: newText }; // Update the text of the clicked node
            }
            return node;
        });

        setList(updatedList); // Update the state with the new list
    };

    return (
        <div>
            <h1>Tree Example</h1>
            <ul>
                {list.map((node) => (
                    <li key={node.id}>
                        <TreeNode node={node} onDoubleClick={handleNodeDoubleClick} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface TreeNodeProps {
  node: TreeNodeData;
  onDoubleClick: (nodeId: number, newText: string) => void;
}

function TreeNode({ node, onDoubleClick }:TreeNodeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(node.text);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onDoubleClick(node.id, editedText); // Update the text when editing is finished
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value); // Update the edited text
    };

    return (
        <div onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus />
            ) : (
                <span>{node.text}</span>
            )}
        </div>
    );
}

export default MyComponent;
