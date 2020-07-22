import React from 'react';
import PropTypes from 'prop-types';

var INJECTION_STATE_NOT_YET = 'not yet';
var INJECTION_STATE_IN_PROGRESS = 'in progress';
var INJECTION_STATE_DONE = 'done';
var injectionState = INJECTION_STATE_NOT_YET;
var injectionError = null;
var onScriptLoadCallbacks = [];
var onScriptLoadErrorCallbacks = []; // Returns a promise that resolves
//   - when the script becomes available or
//   - immediately, if the script had already been injected due to a prior call.
//
// The promise is rejected in case the injection fails (e.g. due to a network
// error).
//
// Note that only the first call of the function will actually trigger an
// injection with the provided API key, the subsequent calls will be
// resolved/rejected when the first one succeeds/fails.

var injectScript = function injectScript(apiKey, language) {
  switch (injectionState) {
    case INJECTION_STATE_DONE:
      return injectionError ? Promise.reject(injectionError) : Promise.resolve();

    case INJECTION_STATE_IN_PROGRESS:
      return new Promise(function (resolve, reject) {
        onScriptLoadCallbacks.push(resolve);
        onScriptLoadErrorCallbacks.push(reject);
      });

    default:
      // INJECTION_STATE_NOT_YET
      injectionState = INJECTION_STATE_IN_PROGRESS;
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        var src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&libraries=places";
        if (language) src += "&language=" + language;
        script.src = src;
        script.async = true;
        script.defer = true;

        var onScriptLoad = function onScriptLoad() {
          // Resolve current promise
          resolve(); // Resolve the pending promises in their respective order

          onScriptLoadCallbacks.forEach(function (cb) {
            return cb();
          });
          cleanup();
        };

        var onScriptLoadError = function onScriptLoadError() {
          // Reject all promises with this error
          injectionError = new Error('[react-google-places-autocomplete] Could not inject Google script'); // Reject current promise with the error

          reject(injectionError); // Reject all pending promises in their respective order with the error

          onScriptLoadErrorCallbacks.forEach(function (cb) {
            return cb(injectionError);
          });
          cleanup();
        }; // Release callbacks and unregister listeners


        var cleanup = function cleanup() {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptLoadError);
          onScriptLoadCallbacks = [];
          onScriptLoadErrorCallbacks = [];
          injectionState = INJECTION_STATE_DONE;
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptLoadError);
        document.body.appendChild(script);
      });
  }
};

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var autocompletionRequestBuilder = (function (autocompletionRequest) {
  var res = _extends({}, autocompletionRequest);

  if (autocompletionRequest.bounds) {
    res.bounds = _construct(google.maps.LatLngBounds, autocompletionRequest.bounds);
  }

  if (autocompletionRequest.location) {
    res.location = new google.maps.LatLng(autocompletionRequest.location);
  }

  return res;
});

/* eslint-disable */
var debounce = function debounce(callback, timeout) {
  var d, e;
  return function () {
    function helper() {
      d = null, e = callback.apply(thisRef, argumentsRef);
    }

    var thisRef = this,
        argumentsRef = arguments;
    return clearTimeout(d), d = setTimeout(helper, timeout), !d && (e = callback.apply(thisRef, argumentsRef)), e;
  };
};

var latLngBoundsType = function latLngBoundsType(props, propName, componentName) {
  var prop = props[propName];

  if (!prop) {
    return null;
  }

  if (Array.isArray(prop) && prop.length === 2 && prop.every(function (value) {
    return Object.keys(value).length === 2 && value.hasOwnProperty('lat') && value.hasOwnProperty('lng') // eslint-disable-line no-prototype-builtins
    && Number(value.lat) && Number(value.lng);
  })) {
    return null;
  }

  return new Error("Invalid prop `" + propName + "` supplied to `" + componentName + "`. Validation failed.");
};

var componentRestrictionsType = PropTypes.shape({
  country: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
});
var latLngType = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});
var autocompletionRequestType = PropTypes.shape({
  bounds: latLngBoundsType,
  componentRestrictions: componentRestrictionsType,
  location: latLngType,
  offset: PropTypes.number,
  radius: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.string)
});
var suggestionClassNamesType = PropTypes.shape({
  container: PropTypes.string,
  suggestion: PropTypes.string,
  suggestionActive: PropTypes.string
});
var suggestionStylesType = PropTypes.shape({
  container: PropTypes.object,
  suggestion: PropTypes.object
});

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GooglePlacesAutocomplete = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(GooglePlacesAutocomplete, _React$Component);

  // eslint-disable-line react/destructuring-assignment
  function GooglePlacesAutocomplete(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "fetchSuggestions", debounce(function (value) {
      // If initialization fails, there's nothing to do
      if (!_this.placesService) return;
      var _this$props = _this.props,
          autocompletionRequest = _this$props.autocompletionRequest,
          withSessionToken = _this$props.withSessionToken;
      var sessionToken = _this.state.sessionToken;

      var autocompletionReq = _extends$1({}, autocompletionRequest);

      if (withSessionToken && sessionToken) autocompletionReq.sessionToken = sessionToken;

      _this.setState({
        loading: true
      });

      _this.placesService.getPlacePredictions(_extends$1({}, autocompletionRequestBuilder(autocompletionReq), {
        input: value
      }), _this.fetchSuggestionsCallback);
    }, _this.props.debounce));

    _defineProperty(_assertThisInitialized(_this), "initializeService", function () {
      if (!window.google) {
        throw new Error('[react-google-places-autocomplete]: Google script not loaded');
      }

      if (!window.google.maps) {
        throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
      }

      if (!window.google.maps.places) {
        throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');
      }

      _this.placesService = new window.google.maps.places.AutocompleteService();

      _this.setState({
        placesServiceStatus: window.google.maps.places.PlacesServiceStatus.OK
      });

      _this.generateSessionToken();
    });

    _defineProperty(_assertThisInitialized(_this), "generateSessionToken", function () {
      var sessionToken = new google.maps.places.AutocompleteSessionToken();

      _this.setState({
        sessionToken: sessionToken
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (ev) {
      var idPrefix = _this.props.idPrefix;

      if (!ev.target.id.includes(idPrefix + "-google-places-autocomplete")) {
        _this.clearSuggestions();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeValue", function (value) {
      var minLengthAutocomplete = _this.props.minLengthAutocomplete;

      _this.setState({
        value: value
      });

      if (value.length > minLengthAutocomplete) {
        _this.fetchSuggestions(value);
      } else {
        _this.setState({
          suggestions: []
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionSelect", function (suggestion, ev) {
      if (ev === void 0) {
        ev = null;
      }

      if (ev) ev.stopPropagation();
      var _this$props2 = _this.props,
          displayFromSuggestionSelected = _this$props2.displayFromSuggestionSelected,
          onSelect = _this$props2.onSelect;

      _this.setState({
        activeSuggestion: null,
        suggestions: [],
        value: displayFromSuggestionSelected(suggestion)
      });

      _this.generateSessionToken();

      onSelect(suggestion);
    });

    _defineProperty(_assertThisInitialized(_this), "fetchSuggestionsCallback", function (suggestions, status) {
      var placesServiceStatus = _this.state.placesServiceStatus;

      _this.setState({
        loading: false,
        suggestions: suggestions || []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$state = _this.state,
          activeSuggestion = _this$state.activeSuggestion,
          suggestions = _this$state.suggestions;

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (activeSuggestion !== null) _this.onSuggestionSelect(suggestions[activeSuggestion]);
          break;

        case 'ArrowDown':
          _this.changeActiveSuggestion(1);

          break;

        case 'ArrowUp':
          _this.changeActiveSuggestion(-1);

          break;

        case 'Escape':
          _this.clearSuggestions();

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearSuggestions", function () {
      _this.setState({
        activeSuggestion: null,
        suggestions: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          value = _assertThisInitialize.state.value,
          _assertThisInitialize2 = _assertThisInitialize.props,
          idPrefix = _assertThisInitialize2.idPrefix,
          inputClassName = _assertThisInitialize2.inputClassName,
          inputStyle = _assertThisInitialize2.inputStyle,
          placeholder = _assertThisInitialize2.placeholder,
          renderInput = _assertThisInitialize2.renderInput,
          required = _assertThisInitialize2.required,
          disabled = _assertThisInitialize2.disabled;

      if (renderInput) {
        return renderInput({
          autoComplete: 'off',
          id: (idPrefix ? idPrefix + "-" : '') + "react-google-places-autocomplete-input",
          value: value,
          onChange: function onChange(_ref) {
            var target = _ref.target;
            return _this.changeValue(target.value);
          },
          onKeyDown: _this.handleKeyDown,
          type: 'text',
          placeholder: placeholder,
          required: required,
          disabled: disabled
        });
      }

      return /*#__PURE__*/React.createElement("input", {
        autoComplete: "off",
        className: inputClassName || 'google-places-autocomplete__input',
        id: (idPrefix ? idPrefix + "-" : '') + "react-google-places-autocomplete-input",
        onChange: function onChange(_ref2) {
          var target = _ref2.target;
          return _this.changeValue(target.value);
        },
        onKeyDown: _this.handleKeyDown,
        placeholder: placeholder,
        style: inputStyle,
        type: "text",
        value: value,
        required: required,
        disabled: disabled
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLoader", function () {
      var loader = _this.props.loader;
      if (loader) return loader;
      return /*#__PURE__*/React.createElement("div", {
        className: "google-places-autocomplete__suggestions-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "google-places-autocomplete__suggestions"
      }, "Loading..."));
    });

    _defineProperty(_assertThisInitialized(_this), "renderSuggestions", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          _assertThisInitialize4 = _assertThisInitialize3.state,
          activeSuggestion = _assertThisInitialize4.activeSuggestion,
          suggestions = _assertThisInitialize4.suggestions,
          _assertThisInitialize5 = _assertThisInitialize3.props,
          idPrefix = _assertThisInitialize5.idPrefix,
          renderSuggestions = _assertThisInitialize5.renderSuggestions,
          suggestionsClassNames = _assertThisInitialize5.suggestionsClassNames,
          suggestionsStyles = _assertThisInitialize5.suggestionsStyles;

      if (renderSuggestions) {
        return renderSuggestions(activeSuggestion, suggestions, _this.onSuggestionSelect);
      }

      if (suggestions.length === 0) return null;
      return /*#__PURE__*/React.createElement("div", {
        id: idPrefix + "-google-places-suggestions-container",
        className: suggestionsClassNames.container || 'google-places-autocomplete__suggestions-container',
        style: suggestionsStyles.container
      }, suggestions.map(function (suggestion, index) {
        return /*#__PURE__*/React.createElement("div", {
          id: idPrefix + "-google-places-autocomplete-suggestion--" + index,
          key: suggestion.id,
          className: (suggestionsClassNames.suggestion || 'google-places-autocomplete__suggestion') + " " + (activeSuggestion === index ? suggestionsClassNames.suggestionActive || 'google-places-autocomplete__suggestion--active' : ''),
          style: suggestionsStyles.suggestion,
          onClick: function onClick(event) {
            return _this.onSuggestionSelect(suggestion, event);
          },
          role: "presentation"
        }, suggestion.description);
      }));
    });

    _this.state = {
      activeSuggestion: null,
      loading: false,
      placesServiceStatus: null,
      sessionToken: null,
      suggestions: [],
      value: props.initialValue
    };
    return _this;
  }

  var _proto = GooglePlacesAutocomplete.prototype;

  _proto.componentDidMount = /*#__PURE__*/function () {
    var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props3, apiKey, language, onLoadFailed;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props3 = this.props, apiKey = _this$props3.apiKey, language = _this$props3.language, onLoadFailed = _this$props3.onLoadFailed;
              _context.prev = 1;

              if (!apiKey) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return injectScript(apiKey, language);

            case 5:
              this.initializeService();
              document.addEventListener('click', this.handleClick);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              onLoadFailed(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 9]]);
    }));

    function componentDidMount() {
      return _componentDidMount.apply(this, arguments);
    }

    return componentDidMount;
  }();

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-line
    var initialValue = this.props.initialValue;

    if (nextProps.initialValue !== initialValue) {
      this.setState({
        value: nextProps.initialValue
      });
    }
  };

  _proto.changeActiveSuggestion = function changeActiveSuggestion(direction) {
    var suggs = this.state.suggestions;
    if (suggs.length === 0) return;

    switch (direction) {
      case 1:
        this.setState(function (_ref3) {
          var activeSuggestion = _ref3.activeSuggestion,
              suggestions = _ref3.suggestions;
          if (activeSuggestion === null || activeSuggestion === suggestions.length - 1) return {
            activeSuggestion: 0
          };
          return {
            activeSuggestion: activeSuggestion + 1
          };
        });
        break;

      case -1:
        this.setState(function (_ref4) {
          var activeSuggestion = _ref4.activeSuggestion,
              suggestions = _ref4.suggestions;
          if (!activeSuggestion) return {
            activeSuggestion: suggestions.length - 1
          };
          return {
            activeSuggestion: activeSuggestion - 1
          };
        });
        break;
    }
  };

  _proto.render = function render() {
    var loading = this.state.loading;
    return /*#__PURE__*/React.createElement("div", {
      className: "google-places-autocomplete"
    }, this.renderInput(), loading ? this.renderLoader() : this.renderSuggestions());
  };

  return GooglePlacesAutocomplete;
}(React.Component);

GooglePlacesAutocomplete.propTypes = process.env.NODE_ENV !== "production" ? {
  apiKey: PropTypes.string,
  autocompletionRequest: autocompletionRequestType,
  debounce: PropTypes.number,
  disabled: PropTypes.bool,
  displayFromSuggestionSelected: PropTypes.func,
  idPrefix: PropTypes.string,
  initialValue: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  language: PropTypes.string,
  loader: PropTypes.node,
  minLengthAutocomplete: PropTypes.number,
  onLoadFailed: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  renderInput: PropTypes.func,
  renderSuggestions: PropTypes.func,
  required: PropTypes.bool,
  suggestionsClassNames: suggestionClassNamesType,
  suggestionsStyles: suggestionStylesType,
  withSessionToken: PropTypes.bool
} : {};
GooglePlacesAutocomplete.defaultProps = {
  apiKey: '',
  autocompletionRequest: {},
  debounce: 300,
  disabled: false,
  displayFromSuggestionSelected: function displayFromSuggestionSelected(suggestion) {
    return suggestion.description;
  },
  idPrefix: '',
  initialValue: '',
  inputClassName: '',
  inputStyle: {},
  language: undefined,
  loader: null,
  minLengthAutocomplete: 0,
  onLoadFailed: console.error,
  // eslint-disable-line no-console
  onSelect: function onSelect() {},
  placeholder: 'Address...',
  renderInput: undefined,
  renderSuggestions: undefined,
  required: false,
  suggestionsClassNames: {
    container: '',
    suggestion: '',
    suggestionActive: ''
  },
  suggestionsStyles: {
    container: {},
    suggestion: {}
  },
  withSessionToken: false
};

var geocodeByAddress = function geocodeByAddress(address) {
  var geocoder = new window.google.maps.Geocoder();
  var OK = window.google.maps.GeocoderStatus.OK;
  return new Promise(function (resolve, reject) {
    geocoder.geocode({
      address: address
    }, function (results, status) {
      if (status !== OK) {
        return reject(status);
      }

      return resolve(results);
    });
  });
};

var getLatLng = function getLatLng(result) {
  return new Promise(function (resolve, reject) {
    try {
      var latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng()
      };
      return resolve(latLng);
    } catch (e) {
      return reject(e);
    }
  });
};

var geocodeByPlaceId = function geocodeByPlaceId(placeId) {
  var geocoder = new window.google.maps.Geocoder();
  var OK = window.google.maps.GeocoderStatus.OK;
  return new Promise(function (resolve, reject) {
    geocoder.geocode({
      placeId: placeId
    }, function (results, status) {
      if (status !== OK) {
        return reject(status);
      }

      return resolve(results);
    });
  });
};

export default GooglePlacesAutocomplete;
export { geocodeByAddress, geocodeByPlaceId, getLatLng, injectScript };
