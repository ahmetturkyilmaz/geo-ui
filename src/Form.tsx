import React, {useState} from "react";

export function Form(props: { onSubmit: (distance: number) => void }) {
    const [text, setText] = useState<string>("")
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let distance: number = +text;
        if (isNaN(distance)) {

        }
        props.onSubmit(distance)
    }
    return (
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
            placeholder="Destination"
            required
          />
          <button>Submit</button>
      </form>
    );

}
