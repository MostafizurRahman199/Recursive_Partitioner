import React, { useState } from "react";
import "./App.css";

const App = () => {
  // Function moved above to prevent ReferenceError
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const [partitions, setPartitions] = useState([
    { id: 1, color: getRandomColor(), parent: null, width: 100, height: 100, x: 0, y: 0 },
  ]);

  const splitPartition = (id, direction) => {
    setPartitions((prevPartitions) => {
      const target = prevPartitions.find((p) => p.id === id);
      if (!target) return prevPartitions;

      const newId = prevPartitions.length + 1;

      // Calculate the new dimensions based on the split direction
      const newPartition = {
        id: newId,
        color: getRandomColor(),
        parent: id,
        width: direction === "h" ? target.width : target.width / 2,
        height: direction === "v" ? target.height : target.height / 2,
        x: direction === "h" ? target.x : target.x + target.width / 2,
        y: direction === "v" ? target.y : target.y + target.height / 2,
      };

      // Update the original partition size
      const updatedPartitions = prevPartitions.map((p) =>
        p.id === id
          ? {
              ...p,
              width: direction === "h" ? target.width : target.width / 2,
              height: direction === "v" ? target.height : target.height / 2,
            }
          : p
      );

      return [...updatedPartitions, newPartition];
    });
  };

  const removePartition = (id) => {
    setPartitions((prevPartitions) =>
      prevPartitions.filter((partition) => partition.id !== id)
    );
  };

  const renderPartition = (partition) => {
    const { id, color, width, height, x, y } = partition;

    return (
      <div
        key={id}
        className="absolute border"
        style={{
          backgroundColor: color,
          width: `${width}%`,
          height: `${height}%`,
          left: `${x}%`,
          top: `${y}%`,
        }}
      >
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => splitPartition(id, "v")}
          >
            v
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => splitPartition(id, "h")}
          >
            h
          </button>
          {partitions.length > 1 && (
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => removePartition(id)}
            >
              -
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100">
      {partitions.map((partition) => renderPartition(partition))}
    </div>
  );
};

export default App;
