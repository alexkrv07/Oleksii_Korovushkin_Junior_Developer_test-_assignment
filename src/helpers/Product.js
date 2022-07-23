
 const  getPrice = (product, activeCurrency) => {
    return product.prices.filter(price => {
      return  price.currency.label === activeCurrency.label;
    })[0];
  };

  const isProductHasAttributes = (product) => {
    return !!product.attributes.length;
  }

  const isSelectedAllAttributes = (product, selectedAttributeList) => {
    console.log(!isProductHasAttributes(product))

    if (!isProductHasAttributes(product)) {
      return true;
    }

    const productAttributeNameList = product.attributes.map(attributeSet => attributeSet.name);
    const selectedAttributeNameList = selectedAttributeList.map(attributeSet => attributeSet.name);
    console.log(productAttributeNameList, selectedAttributeNameList)

    return productAttributeNameList.every(
      attributeName => selectedAttributeNameList.includes(attributeName)
    );
  }


export {
  getPrice,
  isProductHasAttributes,
  isSelectedAllAttributes,
};
