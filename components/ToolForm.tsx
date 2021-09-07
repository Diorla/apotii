import React from "react";
import { Button, Form, Rating, Select, TextArea } from "semantic-ui-react";
import FormModal from "./FormModal";
import ToolProps from "../types/ToolProps";
import addTool from "../firebase/addTool";
import { useUser } from "../context";

export default function ToolForm({
  setOpenTool,
  openTool,
  tool,
  setTool,
  title = "Add tool",
}: {
  setOpenTool: React.Dispatch<React.SetStateAction<boolean>>;
  openTool: boolean;
  tool: ToolProps;
  setTool: React.Dispatch<React.SetStateAction<ToolProps>>;
  title?: string;
}): JSX.Element {
  const {
    user: { uid, categories = [] },
  } = useUser();
  const options = [
    { name: "Misc", description: "The default categories" },
    ...categories,
  ].map((item) => {
    return {
      value: item.name,
      text: item.name,
    };
  });
  return (
    <FormModal
      title="Tool"
      trigger={<Button onClick={() => setOpenTool(!openTool)}>{title}</Button>}
      open={openTool}
      toggleModal={setOpenTool}
      submit={() =>
        addTool(uid, tool, () => {
          tool.id && setOpenTool(false);
          // If it is add a new tool, then reset it
          !tool.id &&
            setTool({
              id: "",
              name: "",
              category: tool.category,
              rating: 1,
              description: "",
            });
        })
      }
    >
      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="React, Electron, Vanilla JS"
            value={tool.name}
            onChange={(e) =>
              setTool({
                ...tool,
                name: e.target.value,
              })
            }
          />
        </Form.Field>
        <Form.Field
          control={TextArea}
          label="About"
          placeholder="Describe the tool, framework or library"
          value={tool.description}
          onChange={(e: any) =>
            setTool({
              ...tool,
              description: e.target.value,
            })
          }
        />
        <Form.Field>
          <label htmlFor="select category">Select Category</label>
          <Select
            placeholder="Frontend, Backend"
            options={options}
            value={tool.category}
            onChange={(_e, data) =>
              setTool({
                ...tool,
                category: String(data.value),
              })
            }
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="rating">Rating</label>
          <Rating
            id="rating"
            icon="star"
            defaultRating={tool.rating}
            value={tool.rating}
            maxRating={5}
            onRate={(_e, data) =>
              setTool({
                ...tool,
                rating: Number(data.rating),
              })
            }
          />
        </Form.Field>
      </Form>
    </FormModal>
  );
}
