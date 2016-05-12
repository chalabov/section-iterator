"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function (_ref) {
  var data = _ref.data;
  var multiSection = _ref.multiSection;
  var _ref$allowNull = _ref.allowNull;
  var allowNull = _ref$allowNull === undefined ? true : _ref$allowNull;

  var isEmpty = multiSection ? !data.some(function (i) {
    return i > 0;
  }) : data === 0;

  function nextNonEmptySectionIndex(sectionIndex) {
    if (isEmpty) {
      return null;
    }

    if (sectionIndex == null) {
      sectionIndex = 0;
    } else {
      sectionIndex++;
    }

    while (sectionIndex < data.length && data[sectionIndex] === 0) {
      sectionIndex++;
    }

    if (sectionIndex === data.length) {
      return allowNull ? null : nextNonEmptySectionIndex(null);
    }

    return sectionIndex;
  }

  function prevNonEmptySectionIndex(sectionIndex) {
    if (isEmpty) {
      return null;
    }

    if (sectionIndex === null) {
      sectionIndex = data.length - 1;
    } else {
      sectionIndex--;
    }

    while (sectionIndex >= 0 && data[sectionIndex] === 0) {
      sectionIndex--;
    }

    if (sectionIndex === -1) {
      return allowNull ? null : prevNonEmptySectionIndex(null);
    }

    return sectionIndex;
  }

  function next(position) {
    var _position = _slicedToArray(position, 2);

    var sectionIndex = _position[0];
    var itemIndex = _position[1];


    if (isEmpty) {
      return [null, null];
    }

    if (multiSection) {
      if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
        sectionIndex = nextNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, 0];
      }

      return [sectionIndex, itemIndex + 1];
    }

    if (itemIndex === data - 1) {
      return allowNull ? [null, null] : next([null, null]);
    }

    if (itemIndex === null) {
      return [null, 0];
    }

    return [null, itemIndex + 1];
  }

  function prev(position) {
    var _position2 = _slicedToArray(position, 2);

    var sectionIndex = _position2[0];
    var itemIndex = _position2[1];


    if (isEmpty) {
      return [null, null];
    }

    if (multiSection) {
      if (itemIndex === null || itemIndex === 0) {
        sectionIndex = prevNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, data[sectionIndex] - 1];
      }

      return [sectionIndex, itemIndex - 1];
    }

    if (itemIndex === 0) {
      return allowNull ? [null, null] : prev([null, null]);
    }

    if (itemIndex === null) {
      return [null, data - 1];
    }

    return [null, itemIndex - 1];
  }

  function isLast(position) {
    var _position3 = _slicedToArray(position, 2);

    var sectionIndex = _position3[0];
    var itemIndex = _position3[1];


    if (isEmpty) {
      return sectionIndex === null && itemIndex === null;
    }

    if (multiSection) {
      var _data$reduceRight = data.reduceRight(function (_ref2, item, index) {
        var _ref3 = _slicedToArray(_ref2, 2);

        var lastSection = _ref3[0];
        var lastItem = _ref3[1];

        if (item > 0 && lastSection === null) {
          return [index, item - 1];
        }
        return [lastSection, lastItem];
      }, [null, null]);

      var _data$reduceRight2 = _slicedToArray(_data$reduceRight, 2);

      var lastSection = _data$reduceRight2[0];
      var lastItem = _data$reduceRight2[1];


      return sectionIndex === lastSection && itemIndex === lastItem;
    }

    return itemIndex === data - 1;
  }

  return {
    next: next,
    prev: prev,
    isLast: isLast
  };
};
