export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateRegaxNumber = (detailToCheck) => {
  var regex = /^[0-9]+$/;
  if (regex.test(detailToCheck)) {
    return true;
  } else {
    return false;
  }
};

export const validateRegaxAlphabets = (detailToCheck) => {
  var regex = /^[a-zA-Z]*$/;
  if (regex.test(detailToCheck)) {
    return true;
  } else {
    return false;
  }
};

export const validateSpaceExist = (value) => {
  const hasWhiteSpace = /\s/.test(value);
  if (hasWhiteSpace) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  return passwordPattern.test(password);
};

export const ValidateAnyStringExit = (value) => {
  var containsString = /[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
    value.slice(1)
  );
  return containsString;
};

export const validate = (name, altStatus) => {
  let data = {
    ...name,
  };

  data["notValid"] = false;

  for (let key of Object.keys(name).filter((key) => !key.includes("Error"))) {
    const type = typeof name[key];
    const val = type == "string" ? name[key]?.trim() : name[key];
    if (
      key !== "alternateNumber" &&
      key !== "itemsPerPack" &&
      key !== "subscriptionPrice" &&
      key !== "brand" &&
      key !== "expires" &&
      (!val || val == 0)
    ) {
      data[key + "Error"] = true;
      data["notValid"] = true;
    } else {
      if (Array.isArray(val)) {
        data[key + "Error"] = val.length < 1;
        data["notValid"] = !data["notValid"] ? val.length < 1 : true;
      } else {
        data[key + "Error"] = false;
      }
    }
  }

  if (data.planType == "yearly") {
    data["notValid"] = data.expires ? data.notValid : true;
    data["expiresError"] = data.expires ? false : true;
  }

  if (data.phoneNumber && data.phoneNumber.length < 10) {
    data["phoneNumberError"] = true;
    data["notValid"] = true;
  }
  if (altStatus) {
    if (data.alternateNumber && data.alternateNumber.length < 10) {
      data["alternateNumberError"] = true;
      data["notValid"] = true;
    }
  }
  if (
    data.phoneNumber &&
    data.phoneNumber.length > 9 &&
    data.alternateNumber &&
    data.alternateNumber.length > 9
  ) {
    if (data.phoneNumber === data.alternateNumber) {
      data["phoneNumberSameError"] = true;
      data["notValid"] = true;
    }
  }

  if (
    typeof data.subscriptionPrice === "number" ||
    data.subscriptionPrice === "" ||
    data.subscriptionPrice === 0
  ) {
    data["subscriptionPriceError"] = false;
    data["notValid"] = !data["notValid"] ? false : true;
  }

  if (data.packageType == "pack") {
    data["itemsPerPackError"] = data.itemsPerPack < 1;
    data["notValid"] = !data["notValid"] ? data.itemsPerPack < 1 : true;
  }

  if (data.sku) {
    data["notValid"] = !data["notValid"] ? data.sku.length < 10 : true;
    data["skuError"] = data.sku.length < 10;
  }
  if (data.ProductTitle) {
    const stringWithoutSpaces = data.ProductTitle.replace(/\s/g, "");

    data["ProductTitleError"] = stringWithoutSpaces.length < 3;
    data["notValid"] = !data["notValid"]
      ? stringWithoutSpaces.length < 3
      : true;
  }

  if (data.title) {
    const stringWithoutSpaces = data.title.replace(/\s/g, "");
    data["notValid"] = !data["notValid"]
      ? stringWithoutSpaces.length < 4
      : true;
    data["titleError"] = stringWithoutSpaces.length < 4;
  }

  return data;
};

export const orderValidation = (details) => {
  let data = [...details];
  let isValid = true;

  for (let item of data) {
    let notValid = false;

    for (let key of Object.keys(item)) {
      if (!key.includes("Error")) {
        if (!item[key]) {
          item[key + "Error"] = true;
          notValid = true;
          isValid = false;
        } else {
          item[key + "Error"] = false;
        }
      }
    }

    item["notValid"] = notValid;
  }

  return { data, isValid };
};

export const validateMobileNumber = (mobileNumber) => {
  const mobileNumberPattern = /^[0-9]\d{9}$/;
  return mobileNumberPattern.test(mobileNumber);
};

export const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
