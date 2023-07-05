import React, { useState } from 'react';

const CustomSwitch = ({
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <div>
      <div
        style={{
          height: 40,
          width: 200,
          backgroundColor: 'black',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <button
          onClick={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 1 ? selectionColor : 'black',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            outline: 'none',
            border: 'none',
            color: getSelectionMode === 1 ? 'black' : selectionColor,
          }}
        >
          {option1}
        </button>
        <button
          onClick={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 2 ? selectionColor : 'black',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            outline: 'none',
            border: 'none',
            color: getSelectionMode === 2 ? 'black' : selectionColor,
          }}
        >
          {option2}
        </button>
      </div>
    </div>
  );
};

export default CustomSwitch;
