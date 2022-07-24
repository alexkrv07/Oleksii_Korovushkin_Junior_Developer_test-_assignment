
 const  getPrice = (product, activeCurrency) => {
    return product.prices.filter(price => {
      return  price.currency.label === activeCurrency.label;
    })[0];
  };

  const isProductHasAttributes = (product) => {
    return !!product.attributes.length;
  }

  const isSelectedAllAttributes = (product, selectedAttributeList) => {
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


export {
  getPrice,
  isProductHasAttributes,
  isSelectedAllAttributes,
  setInitialtAttributes,
  getSelectedAttributeId,
  updateAttributeList
};
