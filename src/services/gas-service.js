import axios from "axios";

const HOST = "https://ethgasstation.info/api";

const ethGasInstance = axios.create({
  baseURL: HOST,
  headers: { "content-type": "application/json", accept: "application/json" },
});

export async function fetchGas() {
  try {
    const gasData = await ethGasInstance.get(
      `/ethgasAPI.json?api-key=${process.env.REACT_APP_DEFI_PULSE_KEY}`
    );
    return gasData.data;
  } catch (e) {
    console.log({ e });
    throw new Error("Issue fetching gas");
  }
}
