
 const  getPrice = (product, activeCurrency) => {
    return product.prices.filter(price => {
      return  price.currency.label === activeCurrency.label;
    })[0];
  };

  const isProductHasAttributes = (product) => {
    return !!product.attributes.length;
  }

  const getAttributeNameList = (attributes) => {
    return attributes.map(attributeSet => attributeSet.name);
  }

  const isSelectedAllAttributes = (product, selectedAttributeList) => {
    if (!isProductHasAttributes(product)) {
      return true;
    }

    const productAttributeNameList = getAttributeNameList(product.attributes);
    const selectedAttributeNameList = getAttributeNameList(selectedAttributeList)

    return productAttributeNameList.every(
      attributeName => selectedAttributeNameList.includes(attributeName)
    );
  }

  const setInitialtAttributes = (product) => {
    if (!isProductHasAttributes(product)) {
      return [];
    }

    return product.attributes.map(attributeSet => {
      return {
        name: attributeSet.name,
        id: attributeSet.items[0].id
      }
    })

  }

  const getSelectedAttributeId = (selectedAttributeList, name) => {
     return selectedAttributeList.find(attributeSet => {
      return attributeSet.name === name;
    }).id;
  };

  const updateAttributeList = (attributeList, attribyte) => {
    const updatedAttributeList = [...attributeList];
    updatedAttributeList.forEach(attributeSet => {
      if (attributeSet.name === attribyte.name) {
        attributeSet.id = attribyte.id
      }
    });
    return updatedAttributeList;
  }

  const getProductsFromCartWithSameId = (productsInCart, product) => {
    return productsInCart.filter(productInCart => {
      return productInCart.id === product.id;
    })
  }


  const isProductsHasSameSelectedAttributes = (productInCart, product) => {
    return productInCart.selectedAttributeList.every(selectedAttribute => {
      const productAttributeSameName = product.selectedAttributeList.find(attribute => {
        return attribute.name === selectedAttribute.name;
      })
      return selectedAttribute.id === productAttributeSameName.id;
    })
  }

  const getProductWithSameAttributesInCart = (productsInCart, product) => {
    const productsWithSameId = getProductsFromCartWithSameId(productsInCart, product);
    if (!productsWithSameId.length) {
      return null;
    }
    return productsWithSameId.find(prodctWithSameId => {
      return isProductsHasSameSelectedAttributes(prodctWithSameId, product)
    });
  }

  const getTotalPrice = (productList, activeCurrency) => {
    const totalPrice = productList.reduce((result, product) => {
      const productPrice = getPrice(product, activeCurrency)
      return result + productPrice.amount * product.count;
    },0);

    return {
      amount: Math.round(totalPrice * 100) / 100,
      currency: activeCurrency
    }
  }

 const getProductsTotalCount = (product) => {
    return product.reduce((result, product) => {
      return result + product.count;
    },0);
  }


  const getTotalTax = (total, tax) => {
    return Math.round(total * tax) / 100;
  }

export {
  getPrice,
  isProductHasAttributes,
  isSelectedAllAttributes,
  setInitialtAttributes,
  getSelectedAttributeId,
  updateAttributeList,
  getProductWithSameAttributesInCart,
  getTotalPrice,
  getProductsTotalCount,
  getTotalTax
};
