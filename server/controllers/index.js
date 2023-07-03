import Derivative from "../models/derivative.js"

const pushDerivativeEntry = async (entry) => {
  const newDerivativeEntry = new Derivative(entry);
  try {
    await newDerivativeEntry.save();
  } catch (error) {
    console.log({ message: error.message });
  }
};

export default pushDerivativeEntry