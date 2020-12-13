import * as React from "react";
import "./styles.scss";

const DisableContext = React.createContext(false);

const DisableContextProvider: React.FC<{ value: boolean }> = ({
  value,
  children
}) => {
  const rootValue = React.useContext(DisableContext);

  return (
    <DisableContext.Provider value={value || rootValue}>
      {children}
    </DisableContext.Provider>
  );
};

const MyButton: React.FC<{ disabled?: boolean }> = (props) => {
  const disableFromContext = React.useContext(DisableContext);

  const { disabled, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={disabled || disableFromContext}
      onClick={() => alert("I was clicked")}
    >
      {props.children}
    </button>
  );
};

const Overlay: React.FC<{ visible: boolean; hide: () => void }> = ({
  visible,
  hide
}) =>
  visible ? (
    <div className="overlay">
      <span onClick={hide}> Click me to hide the overlay</span>
    </div>
  ) : null;

const SomeComponent: React.FC = (props) => {
  const [showOnboarding, setShowOnboarding] = React.useState(true);

  return (
    <DisableContextProvider value={showOnboarding}>
      <div className="nested">
        <h2> I'm a component </h2>
        <MyButton>Nested 1</MyButton>
        <MyButton>Nested 2</MyButton>

        <Overlay
          visible={showOnboarding}
          hide={() => setShowOnboarding(false)}
        />
      </div>
    </DisableContextProvider>
  );
};

export default function App() {
  const [showOnboarding, setShowOnboarding] = React.useState(true);

  return (
    <DisableContextProvider value={showOnboarding}>
      <div className="App">
        <h1>React Context</h1>
        <h2>Let's have some fun</h2>

        <MyButton> Hey there 1</MyButton>
        <MyButton> Hey there 2</MyButton>
        <MyButton disabled={true}> Hey there 3</MyButton>
        <MyButton> Hey there 4</MyButton>

        <SomeComponent />
        <SomeComponent />

        <Overlay
          visible={showOnboarding}
          hide={() => setShowOnboarding(false)}
        />
      </div>
    </DisableContextProvider>
  );
}
