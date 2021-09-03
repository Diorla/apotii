import React from "react";
import { Button, Form, Rating, Select, TextArea } from "semantic-ui-react";
import FormModal from "./FormModal";
import ToolProps from "../types/ToolProps";
import addTool from "../firebase/addTool";

export default function ToolForm({
  setOpenTool,
  openTool,
  uid,
  tool,
  setTool,
  options,
}: {
  setOpenTool: React.Dispatch<React.SetStateAction<boolean>>;
  openTool: boolean;
  uid: string;
  tool: ToolProps;
  setTool: React.Dispatch<React.SetStateAction<ToolProps>>;
  options: { value: string; text: string }[];
}): JSX.Element {
  return (
    <FormModal
      title="Create new tool"
      trigger={<Button onClick={() => setOpenTool(!openTool)}>New tool</Button>}
      open={openTool}
      toggleModal={setOpenTool}
      submit={() =>
        addTool(uid, tool, () => {
          setOpenTool(false);
          setTool({
            id: "",
            name: "",
            category: "",
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
