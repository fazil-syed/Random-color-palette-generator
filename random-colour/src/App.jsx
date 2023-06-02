import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
function App() {
  const [colorCodes, setColorCodes] = useState([]);
  const [copied, setCopied] = useState(false);

  const valueToHex = (color) => {
    return color.toString(16);
  };
  const RGBToHex = (red, green, blue) => {
    return `#${valueToHex(red)}${valueToHex(green)}${valueToHex(blue)}`;
  };
  const generateRandomColors = async () => {
    const response = await fetch("http://colormind.io/api/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ model: "default" }),
    });
    const data = await response.json();
    const codes = [];
    data.result.forEach((color) => {
      codes.push(RGBToHex(...color));
    });
    setColorCodes(codes);
  };
  useEffect(() => {
    generateRandomColors();
    // window.addEventListener("keydown", handleKeyDown);

    // return () => {
    // 	window.removeEventListener("keydown", handleKeyDown);
    // };
  }, []);
  return (
    <div className="App">
      <h1>Color palette Generator</h1>
      <div className="colors-grid">
        {colorCodes.map((code, index) => {
          return (
            <CopyToClipboard text={code} key={index}>
              <div className="color-container">
                <div className="color" style={{ background: code }}></div>
                <p>{code}</p>
              </div>
            </CopyToClipboard>
          );
        })}
      </div>
    </div>
  );
}

export default App;
