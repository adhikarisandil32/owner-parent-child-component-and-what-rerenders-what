import { createContext, useContext, useState } from "react"

type ParentComponentProps = {
  children: React.ReactNode
}

type ChildComponentProps = {
  children: React.ReactNode
}

type ParentComponentContextTypes = {
  dummyState?: boolean
  setDummyState?: (prev: boolean) => void
}

const ParentComponentContext = createContext<ParentComponentContextTypes | null>(null)

const useParentComponent = () => {
  const context = useContext(ParentComponentContext)

  if (!context) {
    throw new Error("use useParentComponent within the sope of ParentComponentProvider")
  }

  return context
}

function ParentComponent({ children }: ParentComponentProps) {
  const [dummyState, setDummyState] = useState<boolean>(true)

  console.log("ParentComponent rendered")

  return (
    <ParentComponentContext.Provider value={{ dummyState, setDummyState }}>
      <div>
        <h1 className="text-center">Parent Component's Children</h1>

        {children}

        <button
          className="px-4 py-1 bg-red-600 text-white border-black border-2"
          onClick={() => setDummyState((prev) => !prev)}
        >
          Change Parent's State
        </button>
      </div>
    </ParentComponentContext.Provider>
  )
}

function ChildComponent({ children }: ChildComponentProps) {
  console.log("Child component rendred")

  const { dummyState } = useParentComponent()

  // comment line 54 and the parent's state change won't re-render this child component
  // uncomment and the parnet's state also cause re-render of this child component

  return (
    <>
      {children}

      <p className="text-center"> This is p tag that depends on the parent component's boolean.</p>
    </>
  )
}

function App() {
  const [booleanState, setBsooleanState] = useState<boolean>(false)

  console.log("App Rendered")

  return (
    <>
      <p>Click on the Vite and React logos to learn more</p>

      <ParentComponent>
        <ChildComponent>
          <div>
            <p className="text-white text-justify w-96 mx-auto bg-blue-800 p-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores in perspiciatis quis labore eos autem
              animi veritatis deserunt vitae, natus expedita, odit quos vel quo maiores quas. Quasi, vel dolorem!
            </p>
          </div>
        </ChildComponent>
      </ParentComponent>

      <button
        className="px-4 py-1 bg-red-600 text-white border-2 border-black"
        onClick={() => setBsooleanState((prev) => !prev)}
      >
        Change App's State
      </button>
    </>
  )
}

export default App
