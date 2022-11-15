import Address from "../models/Address";
import DropTypes from "../models/DropType";
import Currency from "../models/Currency";
import Product from "../models/Product";
import User from "../models/User";

export const getProducts = async (req: any, res: any): Promise<void> => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json({ err: "No Products Found" });
    } else {
      res.status(200).json(products);
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const addProduct = async (req: any, res: any): Promise<void> => {
  try {
    const product = req.body;
    if (!product) {
      return res.status(404).json({ err: "Product data not provided" });
    } else {
      Product.create(product, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const updateProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productSlug } = req.query;
    const productData = req.body;
    if (productSlug && productData) {
      await Product.findOneAndUpdate({ slug: productSlug }, productData);
      return res.status(200).json(productData);
    } else {
      res.status(404).json({ err: "Product not found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const deleteProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productSlug } = req.query;
    if (productSlug) {
      await Product.findOneAndDelete({ slug: productSlug });
      return res.status(200).json(productSlug);
    } else {
      res.status(404).json({ err: "Product not found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getProduct = async (req: any, res: any): Promise<void> => {
  try {
    const { productSlug } = req.query;
    if (productSlug) {
      const product = await Product.findOne({ slug: productSlug });
      res.status(200).json(product);
    } else {
      res.status(404).json({ err: "Product Not Found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getDropTypes = async (req: any, res: any): Promise<void> => {
  try {
    const dropTypes = await DropTypes.find({});
    if (!dropTypes) {
      return res.status(404).json({ err: "No Products Found" });
    } else {
      return res.status(200).json(dropTypes);
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const addDropType = async (req: any, res: any): Promise<void> => {
  try {
    const dropType = req.body;
    if (!dropType) {
      return res.status(404).json({ err: "Drop Type data not provided" });
    } else {
      DropTypes.create(dropType, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
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
      return res.status(404).json({ err: "Drop Type not found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const deleteDropType = async (req: any, res: any): Promise<void> => {
  try {
    const { dropTypeId } = req.query;
    if (dropTypeId) {
      await DropTypes.findByIdAndDelete(dropTypeId);
      return res.status(200).json(dropTypeId);
    } else {
      return res.status(404).json({ err: "Drop Type not found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getDropType = async (req: any, res: any): Promise<void> => {
  try {
    const { dropTypeId } = req.query;
    if (dropTypeId) {
      const dropType = await DropTypes.findById(dropTypeId);
      return res.status(200).json(dropType);
    } else {
      return res.status(404).json({ err: "Drop Type Not Found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getAddress = async (req: any, res: any): Promise<void> => {
  try {
    const { addressId } = req.query;
    if (addressId) {
      const addressType = await Address.findById(addressId);
      return res.status(200).json(addressType);
    } else {
      return res.status(404).json({ err: "Address Not Found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const addAddress = async (req: any, res: any): Promise<void> => {
  try {
    const address = req.body;
    if (!address) {
      return res.status(404).json({ err: "Address data not provided" });
    } else {
      Address.create(address, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getUsers = async (req: any, res: any): Promise<void> => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ err: "No Users Found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const addUser = async (req: any, res: any): Promise<void> => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(404).json({ err: "User data not provided" });
    } else {
      User.create(user, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const addCurrency = async (req: any, res: any): Promise<void> => {
  try {
    const currency = req.body;
    if (!currency) {
      return res.status(404).json({ err: "Currency data not provided" });
    } else {
      Currency.create(currency, (err: any, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getCurrency = async (req: any, res: any): Promise<void> => {
  try {
    const { currencySlug } = req.query;
    if (currencySlug) {
      const currency = await Currency.findOne({ itemSlug: currencySlug });
      return res.status(200).json(currency);
    } else {
      return res.status(404).json({ err: "Currencies Not Found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const updateCurrency = async (req: any, res: any): Promise<void> => {
  try {
    const { currencySlug } = req.query;
    const currencyData = req.body;
    if (currencySlug && currencyData) {
      await Currency.findOneAndUpdate({ itemSlug: currencySlug }, currencyData);
      return res.status(200).json(currencyData);
    } else {
      res.status(404).json({ err: "Product not found" });
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};

export const getCurrencies = async (req: any, res: any): Promise<void> => {
  try {
    const currencies = await Currency.find({});
    if (!currencies) {
      return res.status(404).json({ err: "No Currencies Found" });
    } else {
      return res.status(200).json(currencies);
    }
  } catch (err: any) {
    return res.status(404).json({ err: err.message });
  }
};
