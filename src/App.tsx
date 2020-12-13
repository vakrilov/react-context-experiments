import * as React from "react";
import "./styles.scss";

const MyButton: React.FC<{ disabled?: boolean }> = (props) => (
  <button {...props} onClick={() => alert("I was clicked")}>
    {props.children}{" "}
  </button>
);

const SomeComponent: React.FC = (props) => (
  <div className="nested">
    <MyButton> Nested 1</MyButton>
    <MyButton> Nested 2</MyButton>
  </div>
);

const Overlay: React.FC<{ visible: boolean; hide: () => void }> = ({
  visible,
  hide
}) =>
  visible ? (
    <div className="overlay">
      <span onClick={hide}> Click me to hide the overlay</span>
    </div>
  ) : null;

export default function App() {
  const [showOnboarding, setShowOnboarding] = React.useState(true);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <MyButton> Hey there 1</MyButton>
      <MyButton> Hey there 2</MyButton>
      <MyButton disabled={true}> Hey there 3</MyButton>
      <MyButton> Hey there 4</MyButton>

      <SomeComponent />
      <Overlay visible={showOnboarding} hide={() => setShowOnboarding(false)} />
    </div>
  );
}
