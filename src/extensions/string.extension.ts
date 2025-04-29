declare global {
  export interface String {
    toBoolean(): boolean | null;
    toNumber(): number;
    isNotEmpty(): boolean;
    isEmpty(): boolean;
  }
}

String.prototype.toBoolean = function () {
  if (this === "true") {
    return true;
  } else if (this === "false") {
    return false;
  } else {
    return null;
  }
};

String.prototype.toNumber = function () {
  const value = this.trim();
  return +value;
};

String.prototype.isNotEmpty = function () {
  const value = this.trim();
  if (value) {
    return true;
  } else {
    return false;
  }
};

String.prototype.isEmpty = function () {
  const value = this.trim();
  return !value.isNotEmpty();
};

export {};
