import './App.css'

export const Square = () => {
  return (<button className="square">
    X
  </button>);
}

export const App = () => {
  return <div>
    <Square />
  </div>
}