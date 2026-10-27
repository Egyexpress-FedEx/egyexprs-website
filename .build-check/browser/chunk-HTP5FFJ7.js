import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-S7EWJBAE.js";

// src/app/features/identity/Auth/login/login.ts
var Login = class _Login {
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 2, vars: 0, template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "p");
      \u0275\u0275text(1, "login works!");
      \u0275\u0275domElementEnd();
    }
  }, styles: ["\n/*# sourceMappingURL=login.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ imports: [], selector: "app-login", template: "<p>login works!</p>\n", styles: ["/* src/app/features/identity/Auth/login/login.css */\n/*# sourceMappingURL=login.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/identity/auth/login/login.ts", lineNumber: 9 });
})();
export {
  Login
};
//# debugId=2910bdba-c817-5547-9aa8-7d38a6a29597
//# sourceMappingURL=chunk-HTP5FFJ7.js.map
