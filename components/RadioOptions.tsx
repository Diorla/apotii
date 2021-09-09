import { Form, Icon, Radio } from "semantic-ui-react";
import ToolProps from "../types/ToolProps";
import React, { useState } from "react";
import toolsType from "../types/toolsType";
import createInitialToolList from "../scripts/createInitialToolList";

export default function RadioOptions({
  tools,
  name,
  updateList,
  initialList,
  style,
}: {
  tools: ToolProps[];
  name: string;
  updateList: (prev: string, next: string) => void;
  initialList: toolsType[];
  style: React.CSSProperties;
}) {
  const [state, setState] = useState({
    value: createInitialToolList(tools, initialList),
  });
  const handleChange = (value: string) => setState({ value });
  const [expand, setExpand] = useState(false);
  const expandStyle = { display: expand ? "initial" : "none" };

  return (
    <Form style={style}>
      <Form.Field
        onClick={() => setExpand(!expand)}
        style={{ cursor: "pointer" }}
      >
        {name}
        {expand ? <Icon name="caret down" /> : <Icon name="caret right" />}
      </Form.Field>
      <div style={expandStyle}>
        {tools.map((item) => {
          if (item)
            return (
              <Form.Field key={item.id}>
                <Radio
                  label={item.name}
                  name="radioGroup"
                  value={state.value}
                  checked={state.value === item.id}
                  onChange={() => {
                    updateList(state.value, item.id);
                    handleChange(item.id);
                  }}
                />
              </Form.Field>
            );
        })}
      </div>
    </Form>
  );
}
