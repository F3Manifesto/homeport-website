import DropTypes from "../models/DropType";
import Product from "../models/Product";

export const getProducts = async (req: any, res: any): Promise<void> => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json({ err: "No Products Found" });
    } else {
      res.status(200).json(products);
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const addProduct = async (req: any, res: any): Promise<void> => {
  try {
    const productData = req.body;
    if (!productData) {
      res.status(404).json({ err: "Product data not provided" });
    } else {
      Product.create(productData, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const updateProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productId } = req.query;
    const productData = req.body;
    if (productId && productData) {
      await Product.findByIdAndUpdate(productId, productData);
      return res.status(200).json(productData);
    } else {
      res.status(404).json({ err: "Product not found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const deleteProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productId } = req.query;
    if (productId) {
      await Product.findByIdAndDelete(productId);
      return res.status(200).json(productId);
    } else {
      res.status(404).json({ err: "Product not found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const getProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productId } = req.query;
    if (productId) {
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } else {
      res.status(404).json({ err: "Product Not Found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const getDropTypes = async (req: any, res: any): Promise<void> => {
  try {
    const dropTypes = await DropTypes.find({});
    if (!dropTypes) {
      res.status(404).json({ err: "No Products Found" });
    } else {
      res.status(200).json(dropTypes);
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const addDropType = async (req: any, res: any): Promise<void> => {
  try {
    const dropType = req.body;
    if (!dropType) {
      res.status(404).json({ err: "Drop Type data not provided" });
    } else {
      DropTypes.create(dropType, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const updateDropType = async (req: any, res: any): Promise<void> => {
  try {
    const { dropTypeId } = req.query;
    const dropType = req.body;
    if (dropTypeId && dropType) {
      await DropTypes.findByIdAndUpdate(dropTypeId, dropType);
      return res.status(200).json(dropType);
    } else {
      res.status(404).json({ err: "Drop Type not found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const deleteDropType = async (req: any, res: any): Promise<void> => {
  try {
    const { dropTypeId } = req.query;
    if (dropTypeId) {
      await DropTypes.findByIdAndDelete(dropTypeId);
      return res.status(200).json(dropTypeId);
    } else {
      res.status(404).json({ err: "Drop Type not found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};

export const getDropType = async (req: any, res: any): Promise<void> => {
  try {
    const { dropTypeId } = req.query;
    if (dropTypeId) {
      const dropType = await DropTypes.findById(dropTypeId);
      res.status(200).json(dropType);
    } else {
      res.status(404).json({ err: "Drop Type Not Found" });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message });
  }
};
