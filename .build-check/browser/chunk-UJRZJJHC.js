import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtrustConstantResourceUrl
} from "./chunk-S7EWJBAE.js";

// src/app/features/puplic/pages/home/home.ts
function Home_Conditional_27_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 78)(1, "label", 82);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 83);
    \u0275\u0275domElement(3, "path", 84)(4, "path", 85);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6, "Choose File");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "input", 86);
    \u0275\u0275domListener("change", function Home_Conditional_27_Conditional_12_Template_input_change_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectFile($event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "span", 87);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275domProperty("title", ctx_r1.fileName());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fileName());
  }
}
function Home_Conditional_27_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "input", 79);
  }
}
function Home_Conditional_27_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 81)(1, "a", 88);
    \u0275\u0275text(2, "Download Example");
    \u0275\u0275domElementEnd()();
  }
}
function Home_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "fieldset", 75)(1, "legend");
    \u0275\u0275text(2, "Tracking type");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "label")(4, "input", 76);
    \u0275\u0275domListener("change", function Home_Conditional_27_Template_input_change_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setMultiple(false));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6, "Single DWB");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "label")(8, "input", 76);
    \u0275\u0275domListener("change", function Home_Conditional_27_Template_input_change_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setMultiple(true));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "span");
    \u0275\u0275text(10, "Multiple DWB");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(11, "form", 77);
    \u0275\u0275domListener("submit", function Home_Conditional_27_Template_form_submit_11_listener($event) {
      return $event.preventDefault();
    });
    \u0275\u0275conditionalCreate(12, Home_Conditional_27_Conditional_12_Template, 10, 2, "div", 78)(13, Home_Conditional_27_Conditional_13_Template, 1, 0, "input", 79);
    \u0275\u0275domElementStart(14, "button", 80);
    \u0275\u0275text(15, "TRACK");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(16, Home_Conditional_27_Conditional_16_Template, 3, 0, "div", 81);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("checked", !ctx_r1.multiple());
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("checked", ctx_r1.multiple());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.multiple() ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.multiple() ? 16 : -1);
  }
}
function Home_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 14);
    \u0275\u0275text(1, "GET RATES AND TRANSIT TIMES");
    \u0275\u0275domElementEnd();
  }
}
function Home_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 15);
    \u0275\u0275text(1, "SHIP A SHIPMENT");
    \u0275\u0275domElementEnd();
  }
}
var Home = class _Home {
  selectedAction = signal(
    "track",
    ...ngDevMode ? [{ debugName: "selectedAction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  multiple = signal(
    false,
    ...ngDevMode ? [{ debugName: "multiple" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fileName = signal(
    "No file chosen",
    ...ngDevMode ? [{ debugName: "fileName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setMultiple(value) {
    this.multiple.set(value);
    this.fileName.set("No file chosen");
  }
  selectFile(event) {
    const input = event.target;
    this.fileName.set(input.files?.[0]?.name ?? "No file chosen");
  }
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], decls: 136, vars: 10, consts: [["aria-labelledby", "welcome-heading", 1, "welcome"], [1, "welcome-content"], ["id", "welcome-heading"], ["role", "group", "aria-label", "Shipping services", 1, "service-cards"], ["type", "button", 1, "service-card", 3, "click"], ["viewBox", "0 0 48 48", "fill", "none", "stroke", "currentColor", "stroke-width", "1.3", "stroke-linejoin", "round", "aria-hidden", "true"], ["d", "m17 12 13-6 13 6-13 7-13-7Zm0 0v14m26-14v16l-13 7V19m-7-10 13 7"], ["d", "M5 23h18v21H5zM9 28h10M9 32h10M9 36h4m3 0h3M9 40h10"], ["d", "m6 12 15-7 15 7-15 7-15-7Zm0 0v19l15 8V19m15-7v10M13 9l15 7"], ["cx", "32", "cy", "31", "r", "8"], ["d", "m38 37 7 7"], ["d", "m5 12 14-7 14 7-14 7-14-7Zm0 0v22l14 7V19m14-7v12M12 9l14 7"], ["d", "m22 30 8-1 5-9 3 1-2 9 8 3v3l-10-1-5 7-3-1 2-7-6-1z"], [1, "service-panel"], ["href", "#get-rate", 1, "service-link"], ["href", "#ship", 1, "service-link"], ["aria-labelledby", "account-banner-title", 1, "account-banner"], [1, "account-banner-inner"], [1, "account-banner-message"], ["aria-hidden", "true", 1, "account-banner-icon"], ["viewBox", "0 0 64 64", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "m9 34 25-25 17 4 4 17-25 25L9 34Z"], ["cx", "43", "cy", "22", "r", "4"], ["d", "m23 33 10 10m-4-16 10 10m-22 2 10 10"], [1, "account-banner-copy"], ["id", "account-banner-title"], [1, "desktop-break"], [1, "account-banner-action"], ["href", "#open-account", 1, "account-banner-button"], ["aria-labelledby", "manage-shipments-title", 1, "manage-shipments"], [1, "manage-inner"], ["id", "manage-shipments-title"], [1, "shipment-services"], ["href", "#schedule-pickup", 1, "shipment-service"], ["viewBox", "0 0 88 88", "fill", "none", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["cx", "44", "cy", "44", "r", "35", "stroke", "#252525"], ["d", "M44 9a35 35 0 0 1 0 70", "stroke", "var(--color-primary)"], ["cx", "44", "cy", "35", "r", "13", "stroke", "#252525"], ["d", "M44 22a13 13 0 0 1 0 26M23 71l2-13c1-7 7-10 19-10s18 3 19 10l2 13", "stroke", "var(--color-primary)"], ["d", "m23 71 2-13c1-7 7-10 19-10", "stroke", "#252525"], ["href", "#find-locations", 1, "shipment-service"], ["cx", "44", "cy", "71", "rx", "24", "ry", "7", "stroke", "var(--color-primary)"], ["d", "M44 69S22 46 22 31a22 22 0 0 1 44 0c0 15-22 38-22 38Z", "stroke", "#252525"], ["cx", "44", "cy", "31", "r", "8", "stroke", "#252525"], ["href", "#check-shipping-rate", 1, "shipment-service"], ["x", "21", "y", "9", "width", "46", "height", "70", "rx", "2", "stroke", "#252525"], ["d", "M44 9h21a2 2 0 0 1 2 2v66a2 2 0 0 1-2 2H44", "stroke", "var(--color-primary)"], ["d", "M27 15h34v20H27z", "stroke", "var(--color-primary)"], ["d", "m31 24 5-5m-5 12 11-11", "stroke", "#252525"], ["d", "M27 42h6v6h-6zM38 42h6v6h-6zM49 42h6v6h-6zM27 53h6v6h-6zM38 53h6v6h-6zM49 53h6v6h-6zM27 64h6v6h-6zM38 64h6v6h-6zM49 64h6v6h-6z", "stroke", "#252525"], ["d", "M60 42h2v6h-2M60 53h2v17h-2", "stroke", "var(--color-primary)"], ["href", "#faqs", 1, "shipment-service"], ["cx", "44", "cy", "44", "r", "38", "stroke", "var(--color-primary)"], ["cx", "44", "cy", "44", "r", "33", "stroke", "#252525"], ["d", "M33 31a11 11 0 1 1 18 8c-5 4-7 6-7 12", "stroke", "#252525", "stroke-width", "4"], ["d", "M44 20a11 11 0 0 1 7 19c-5 4-7 6-7 12", "stroke", "var(--color-primary)", "stroke-width", "4"], ["cx", "44", "cy", "62", "r", "2.6", "fill", "var(--color-primary)", "stroke", "none"], ["aria-label", "Discover EGXPRESS Logistics", 1, "company-video"], [1, "company-video-player"], ["src", \u0275\u0275trustConstantResourceUrl`https://www.youtube.com/embed/a2Xq2Q1u970`, "title", "Your Logistics Partner of Choice \u2014 EGXpress Logistics", "width", "900", "height", "506", "loading", "lazy", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "referrerpolicy", "strict-origin-when-cross-origin", "allowfullscreen", ""], ["id", "services", "aria-labelledby", "logistics-services-title", 1, "logistics-services"], [1, "logistics-services-inner"], ["id", "logistics-services-title"], [1, "logistics-services-intro"], [1, "logistics-services-grid"], [1, "logistics-service"], ["src", "/images/domestic-express-302-164.png", "alt", "Orange EGXPRESS van for domestic deliveries", "width", "302", "height", "164", "loading", "lazy"], ["href", "#domestic-express", 1, "logistics-learn-more"], ["aria-hidden", "true"], [1, "service-link-description"], ["src", "/images/international-express-302-164.png", "alt", "FedEx cargo aircraft for international shipping", "width", "302", "height", "164", "loading", "lazy"], ["href", "#international-express", 1, "logistics-learn-more"], ["src", "/images/freight-forwarding-302-164.png", "alt", "Aircraft, cargo ship and truck for freight forwarding", "width", "302", "height", "164", "loading", "lazy"], ["href", "#freight-forwarding", 1, "logistics-learn-more"], ["href", "#all-services", 1, "logistics-all-services"], [1, "tracking-options"], ["type", "radio", "name", "tracking-type", 3, "change", "checked"], [1, "tracking-input", 3, "submit"], [1, "file-picker"], ["type", "text", "name", "waybill", "aria-label", "Your way bill number", "placeholder", "Your way bill number"], ["type", "submit"], [1, "example-row"], [1, "choose-file"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true"], ["d", "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"], ["d", "M14 3v6h6M8 13h8M8 17h5"], ["type", "file", "name", "waybills", "aria-label", "Choose shipment tracking file", 1, "file-control", 3, "change"], ["aria-live", "polite", 1, "file-name", 3, "title"], ["href", "#download-example", 1, "download-example"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Welcome to ");
      \u0275\u0275domElementStart(4, "strong");
      \u0275\u0275text(5, "EGXPRESS");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275domListener("click", function Home_Template_button_click_7_listener() {
        ctx.selectedAction.set("rate");
        return ctx.fileName.set("No file chosen");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(8, "svg", 5);
      \u0275\u0275domElement(9, "path", 6)(10, "path", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(11, "span");
      \u0275\u0275text(12, "GET RATE");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(13, "button", 4);
      \u0275\u0275domListener("click", function Home_Template_button_click_13_listener() {
        return ctx.selectedAction.set("track");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(14, "svg", 5);
      \u0275\u0275domElement(15, "path", 8)(16, "circle", 9)(17, "path", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(18, "span");
      \u0275\u0275text(19, "TRACK");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(20, "button", 4);
      \u0275\u0275domListener("click", function Home_Template_button_click_20_listener() {
        ctx.selectedAction.set("ship");
        return ctx.fileName.set("No file chosen");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(21, "svg", 5);
      \u0275\u0275domElement(22, "path", 11)(23, "path", 12);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(24, "span");
      \u0275\u0275text(25, "SHIP");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(26, "div", 13);
      \u0275\u0275conditionalCreate(27, Home_Conditional_27_Template, 17, 4)(28, Home_Conditional_28_Template, 2, 0, "a", 14)(29, Home_Conditional_29_Template, 2, 0, "a", 15);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(30, "section", 16)(31, "div", 17)(32, "div", 18)(33, "div", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(34, "svg", 20);
      \u0275\u0275domElement(35, "path", 21)(36, "circle", 22)(37, "path", 23);
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(38, "div", 24)(39, "h2", 25);
      \u0275\u0275text(40, "Sign up now to enjoy tailored shipping rates");
      \u0275\u0275domElement(41, "br", 26);
      \u0275\u0275text(42, " designed around your needs.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(43, "p");
      \u0275\u0275text(44, "Services and solutions built to meet all your shipping needs.");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(45, "div", 27)(46, "a", 28);
      \u0275\u0275text(47, "OPEN AN ACCOUNT");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(48, "section", 29)(49, "div", 30)(50, "h2", 31);
      \u0275\u0275text(51, "Manage your shipments");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(52, "div", 32)(53, "a", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(54, "svg", 34);
      \u0275\u0275domElement(55, "circle", 35)(56, "path", 36)(57, "circle", 37)(58, "path", 38)(59, "path", 39);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(60, "span");
      \u0275\u0275text(61, "SCHEDULE PICKUP");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(62, "a", 40);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(63, "svg", 34);
      \u0275\u0275domElement(64, "ellipse", 41)(65, "path", 42)(66, "circle", 43);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(67, "span");
      \u0275\u0275text(68, "FIND LOCATIONS");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(69, "a", 44);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(70, "svg", 34);
      \u0275\u0275domElement(71, "rect", 45)(72, "path", 46)(73, "path", 47)(74, "path", 48)(75, "path", 49)(76, "path", 50);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(77, "span");
      \u0275\u0275text(78, "CHECK SHIPPING RATE");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(79, "a", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(80, "svg", 34);
      \u0275\u0275domElement(81, "circle", 52)(82, "circle", 53)(83, "path", 54)(84, "path", 55)(85, "circle", 56);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(86, "span");
      \u0275\u0275text(87, "FAQS");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(88, "section", 57)(89, "div", 58);
      \u0275\u0275domElement(90, "iframe", 59);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(91, "section", 60)(92, "div", 61)(93, "h2", 62);
      \u0275\u0275text(94, "Your Logistics Partner of Choice!");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(95, "p", 63);
      \u0275\u0275text(96, "Built around your business needs, EGXPRESS delivers seamless end to end logistics solutions covering everything from Express shipping and Freight Forwarding to Customs Clearance and Warehousing, ensuring smooth operations and global reach");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(97, "div", 64)(98, "article", 65);
      \u0275\u0275domElement(99, "img", 66);
      \u0275\u0275domElementStart(100, "h3");
      \u0275\u0275text(101, "Domestic Express");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(102, "p");
      \u0275\u0275text(103, "Domestic Express Service provides fast, reliable, and secure delivery across Egypt, ensuring your shipments reach their destination on time with full...");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(104, "a", 67);
      \u0275\u0275text(105, "LEARN MORE ");
      \u0275\u0275domElementStart(106, "span", 68);
      \u0275\u0275text(107, "\u203A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(108, "span", 69);
      \u0275\u0275text(109, " about Domestic Express");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(110, "article", 65);
      \u0275\u0275domElement(111, "img", 70);
      \u0275\u0275domElementStart(112, "h3");
      \u0275\u0275text(113, "International Express");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(114, "p");
      \u0275\u0275text(115, "International Express Service offers fast, secure, and reliable global shipping, ensuring your shipments reach destinations worldwide with full...");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(116, "a", 71);
      \u0275\u0275text(117, "LEARN MORE ");
      \u0275\u0275domElementStart(118, "span", 68);
      \u0275\u0275text(119, "\u203A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(120, "span", 69);
      \u0275\u0275text(121, " about International Express");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(122, "article", 65);
      \u0275\u0275domElement(123, "img", 72);
      \u0275\u0275domElementStart(124, "h3");
      \u0275\u0275text(125, "Freight Forwarding");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(126, "p");
      \u0275\u0275text(127, "Reliable freight forwarding by air, sea, and land, ensuring secure and efficient global cargo movement with full tracking.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(128, "a", 73);
      \u0275\u0275text(129, "LEARN MORE ");
      \u0275\u0275domElementStart(130, "span", 68);
      \u0275\u0275text(131, "\u203A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(132, "span", 69);
      \u0275\u0275text(133, " about Freight Forwarding");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(134, "a", 74);
      \u0275\u0275text(135, "VIEW ALL SERVICES");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("selected", ctx.selectedAction() === "rate");
      \u0275\u0275attribute("aria-pressed", ctx.selectedAction() === "rate");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("selected", ctx.selectedAction() === "track");
      \u0275\u0275attribute("aria-pressed", ctx.selectedAction() === "track");
      \u0275\u0275advance(7);
      \u0275\u0275classProp("selected", ctx.selectedAction() === "ship");
      \u0275\u0275attribute("aria-pressed", ctx.selectedAction() === "ship");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.selectedAction() === "track" ? 27 : ctx.selectedAction() === "rate" ? 28 : 29);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.company-video[_ngcontent-%COMP%] {\n  padding: 36px 24px 60px;\n  background: var(--%NS%color-white);\n}\n.company-video-player[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 900px;\n  aspect-ratio: 16 / 9;\n  margin-inline: auto;\n  overflow: hidden;\n  border-radius: 10px;\n  background: #000;\n}\n.company-video-player[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n@media (max-width: 640px) {\n  .company-video[_ngcontent-%COMP%] {\n    padding: 24px 20px 40px;\n  }\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.welcome[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  place-items: center;\n  min-height: clamp(560px, 78svh, 735px);\n  padding: 48px 24px;\n  background:\n    linear-gradient(\n      90deg,\n      #03192585,\n      #07192550 90%,\n      #06172670),\n    url(/images/home-page-1920-735.png) center / cover no-repeat;\n  color: var(--%NS%color-white);\n  font-family: var(--%NS%font-family-base);\n}\n.welcome-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 620px;\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0 0 46px;\n  font-size: clamp(29px, 3vw, 44px);\n  font-weight: var(--%NS%font-weight-regular);\n  line-height: 1.2;\n  letter-spacing: -.8px;\n  text-shadow: 0 2px 14px #00000026;\n}\nh1[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: var(--%NS%font-weight-regular);\n}\n.service-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  align-items: center;\n  max-width: 540px;\n  margin: 0 auto;\n  filter: drop-shadow(0 10px 24px #0000001f);\n}\n.service-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 19px;\n  min-width: 0;\n  min-height: 148px;\n  padding: 24px 12px;\n  border: 0;\n  background: var(--%NS%color-white);\n  color: var(--%NS%color-black);\n  font: inherit;\n  cursor: pointer;\n  transition:\n    background-color .2s,\n    color .2s,\n    transform .2s;\n}\n.service-card[_ngcontent-%COMP%]:first-child {\n  border-radius: 8px 0 0 8px;\n}\n.service-card[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 8px 8px 0;\n}\n.service-card[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n}\n.service-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: var(--%NS%font-weight-bold);\n  line-height: 1.4;\n}\n.service-card.selected[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background: var(--%NS%color-primary);\n  color: var(--%NS%color-white);\n  border-radius: 8px;\n  transform: scaleY(1.13);\n}\n.service-card.selected[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  transform: scaleY(.885);\n}\n.service-card[_ngcontent-%COMP%]:not(.selected):hover {\n  background: #fff3e9;\n  color: var(--%NS%color-primary);\n}\n.service-panel[_ngcontent-%COMP%] {\n  max-width: 540px;\n  min-height: 145px;\n  margin: 44px auto 0;\n}\n.tracking-options[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 34px;\n  padding: 0;\n  margin: 0 0 22px;\n  border: 0;\n}\n.tracking-options[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  clip-path: inset(50%);\n  overflow: hidden;\n}\n.tracking-options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 32px;\n  font-size: 15px;\n  cursor: pointer;\n}\n.tracking-options[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  margin: 0;\n  flex-shrink: 0;\n  border: 1px solid #d1d1d1;\n  border-radius: 50%;\n  background: var(--%NS%color-white);\n  cursor: pointer;\n}\n.tracking-options[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked {\n  border: 5px solid var(--%NS%color-white);\n  background: var(--%NS%color-primary);\n}\n.tracking-input[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 58px;\n  border-radius: 6px;\n  background: var(--%NS%color-white);\n  box-shadow: 0 8px 25px #0000001a;\n}\n.tracking-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.tracking-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  min-width: 0;\n  padding: 18px;\n  border: 0;\n  border-radius: 6px 0 0 6px;\n  font: inherit;\n  font-size: 16px;\n  color: var(--%NS%color-black);\n  background: var(--%NS%color-white);\n}\n.tracking-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.file-picker[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  flex: 1;\n  min-width: 0;\n}\n.choose-file[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex-shrink: 0;\n  padding: 16px;\n  border-radius: 6px 0 0 6px;\n  background: #30363b;\n  color: var(--%NS%color-white);\n  font-size: 14px;\n  font-weight: var(--%NS%font-weight-bold);\n  cursor: pointer;\n  transition: background-color .18s;\n}\n.choose-file[_ngcontent-%COMP%]:hover {\n  background: #41494f;\n}\n.choose-file[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 19px;\n  height: 19px;\n  flex-shrink: 0;\n}\n.tracking-input[_ngcontent-%COMP%]   .file-control[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n.choose-file[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid var(--%NS%color-primary);\n  outline-offset: 3px;\n  z-index: 1;\n}\n.file-name[_ngcontent-%COMP%] {\n  align-self: center;\n  min-width: 0;\n  padding: 16px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #777;\n  font-size: 14px;\n  text-align: left;\n}\n.example-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.download-example[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 36px;\n  padding: 6px 2px;\n  color: var(--%NS%color-white);\n  font-size: 13px;\n  text-decoration: underline;\n  text-decoration-color: #ffffff70;\n  text-underline-offset: 5px;\n  transition: text-decoration-color .18s;\n}\n.download-example[_ngcontent-%COMP%]:hover {\n  text-decoration-color: var(--%NS%color-white);\n}\n.tracking-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.tracking-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #999;\n  opacity: 1;\n}\n.tracking-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.service-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 18px 30px;\n  border: 0;\n  border-radius: 0 6px 6px 0;\n  background: var(--%NS%color-primary);\n  color: var(--%NS%color-white);\n  font: inherit;\n  font-size: 15px;\n  font-weight: var(--%NS%font-weight-bold);\n  text-decoration: none;\n  cursor: pointer;\n}\n.tracking-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.service-link[_ngcontent-%COMP%]:hover {\n  background: #e85f00;\n}\n.service-link[_ngcontent-%COMP%] {\n  min-height: 58px;\n  border-radius: 6px;\n  margin-top: 20px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%color-primary);\n  outline-offset: 4px;\n}\n@media (max-width: 1200px) {\n  .welcome[_ngcontent-%COMP%] {\n    min-height: clamp(540px, 76svh, 680px);\n  }\n}\n@media (max-width: 640px) {\n  .welcome[_ngcontent-%COMP%] {\n    min-height: 540px;\n    padding: 44px 20px;\n    background-position: 53% center;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: clamp(26px, 6.3vw, 36px);\n    margin-bottom: 38px;\n    letter-spacing: -.5px;\n  }\n  .service-card[_ngcontent-%COMP%] {\n    min-height: 120px;\n    padding: 20px 8px;\n    gap: 14px;\n  }\n  .service-card[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 35px;\n    height: 35px;\n  }\n  .service-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .service-panel[_ngcontent-%COMP%] {\n    margin-top: 32px;\n    min-height: 140px;\n  }\n  .tracking-options[_ngcontent-%COMP%] {\n    gap: 24px;\n    margin-bottom: 16px;\n  }\n  .tracking-options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 14px;\n    gap: 8px;\n  }\n  .tracking-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n   .tracking-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n    padding: 16px 12px;\n  }\n  .tracking-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding-inline: 20px;\n    font-size: 14px;\n  }\n  .choose-file[_ngcontent-%COMP%] {\n    gap: 6px;\n    padding: 14px 10px;\n    font-size: 12px;\n  }\n  .choose-file[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 16px;\n    height: 16px;\n  }\n  .file-name[_ngcontent-%COMP%] {\n    padding-inline: 10px;\n    font-size: 12px;\n  }\n  .file-picker[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n    padding-inline: 16px;\n  }\n}\n@media (max-width: 360px) {\n  .welcome[_ngcontent-%COMP%] {\n    padding-inline: 14px;\n  }\n  .tracking-options[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .tracking-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding-inline: 15px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .service-card[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.account-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to right,\n      var(--%NS%color-primary) 0%,\n      var(--%NS%color-primary) 60%,\n      var(--%NS%color-white) 60%,\n      var(--%NS%color-white) 100%);\n}\n.account-banner-inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 3fr 2fr;\n  max-width: 1280px;\n  margin-inline: auto;\n}\n.account-banner-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  min-width: 0;\n  padding: 30px 32px;\n  background: var(--%NS%color-primary);\n  color: var(--%NS%color-white);\n}\n.account-banner-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 78px;\n  height: 78px;\n  flex-shrink: 0;\n  border: 1px solid #ffffff38;\n  border-radius: 20px;\n  background: #ffffff0d;\n}\n.account-banner-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n}\n.account-banner-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.account-banner-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(19px, 1.6vw, 23px);\n  font-weight: var(--%NS%font-weight-bold);\n  line-height: 1.45;\n  letter-spacing: -.3px;\n}\n.account-banner-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  color: #ffffffe6;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.account-banner-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 30px 32px;\n  background: var(--%NS%color-white);\n}\n.account-banner-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50px;\n  padding: 14px 28px;\n  border: 1.5px solid var(--%NS%color-primary);\n  border-radius: 28px;\n  color: var(--%NS%color-primary);\n  background: var(--%NS%color-white);\n  font-size: 13px;\n  font-weight: var(--%NS%font-weight-bold);\n  letter-spacing: .6px;\n  line-height: 1.5;\n  text-align: center;\n  text-decoration: none;\n  transition:\n    background-color .2s,\n    color .2s,\n    box-shadow .2s;\n}\n.account-banner-button[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%color-primary);\n  color: var(--%NS%color-white);\n  box-shadow: 0 5px 16px #ff6b0026;\n}\n@media (max-width: 1000px) {\n  .account-banner-inner[_ngcontent-%COMP%] {\n    grid-template-columns: 2fr 1fr;\n  }\n  .account-banner-message[_ngcontent-%COMP%] {\n    gap: 18px;\n    padding: 26px 24px;\n  }\n  .account-banner-icon[_ngcontent-%COMP%] {\n    width: 62px;\n    height: 62px;\n    border-radius: 16px;\n  }\n  .account-banner-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 46px;\n    height: 46px;\n  }\n  .account-banner-action[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .account-banner-button[_ngcontent-%COMP%] {\n    padding-inline: 20px;\n  }\n  .desktop-break[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 640px) {\n  .account-banner[_ngcontent-%COMP%] {\n    background: var(--%NS%color-primary);\n  }\n  .account-banner-inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .account-banner-message[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    padding: 28px 24px 22px;\n    gap: 16px;\n  }\n  .account-banner-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .account-banner-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .account-banner-action[_ngcontent-%COMP%] {\n    padding: 20px 24px;\n  }\n  .account-banner-button[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 320px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .account-banner-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.manage-shipments[_ngcontent-%COMP%] {\n  background: var(--%NS%color-white);\n  color: var(--%NS%color-black);\n  padding: 68px 24px 48px;\n}\n.manage-inner[_ngcontent-%COMP%] {\n  max-width: 980px;\n  margin-inline: auto;\n  text-align: center;\n}\n.manage-inner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 40px;\n  font-size: clamp(26px, 2.5vw, 34px);\n  line-height: 1.3;\n  font-weight: var(--%NS%font-weight-regular);\n  letter-spacing: -.6px;\n}\n.shipment-services[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 24px;\n}\n.shipment-service[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 24px;\n  min-width: 0;\n  padding: 12px 8px 18px;\n  border-radius: 12px;\n  color: #393939;\n  text-decoration: none;\n  transition: color .2s, background-color .2s;\n}\n.shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 88px;\n  flex-shrink: 0;\n  transition: transform .2s;\n}\n.shipment-service[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: var(--%NS%font-weight-bold);\n  letter-spacing: .2px;\n}\n.shipment-service[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%color-primary);\n}\n.shipment-service[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateY(-3px);\n}\n.shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   [stroke][_ngcontent-%COMP%]:not([stroke=none]) {\n  transition: stroke .2s;\n}\n.shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   [fill][_ngcontent-%COMP%]:not([fill=none]) {\n  transition: fill .2s;\n}\n.shipment-service[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   [stroke][_ngcontent-%COMP%]:not([stroke=none]) {\n  stroke: var(--%NS%color-black);\n}\n.shipment-service[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   [fill][_ngcontent-%COMP%]:not([fill=none]) {\n  fill: var(--%NS%color-black);\n}\n@media (max-width: 640px) {\n  .manage-shipments[_ngcontent-%COMP%] {\n    padding: 42px 20px 32px;\n  }\n  .manage-inner[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin-bottom: 26px;\n  }\n  .shipment-services[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 18px 12px;\n  }\n  .shipment-service[_ngcontent-%COMP%] {\n    gap: 16px;\n    padding: 12px 4px 16px;\n  }\n  .shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 72px;\n    height: 72px;\n  }\n  .shipment-service[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .shipment-service[_ngcontent-%COMP%], \n   .shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n   .shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   [stroke][_ngcontent-%COMP%], \n   .shipment-service[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   [fill][_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .shipment-service[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}\n.logistics-services[_ngcontent-%COMP%] {\n  padding: 64px 24px 0;\n  background: var(--%NS%color-white);\n  color: #414141;\n  text-align: center;\n}\n.logistics-services-inner[_ngcontent-%COMP%] {\n  max-width: 956px;\n  margin-inline: auto;\n  padding-bottom: 60px;\n  border-bottom: 1px solid #e3e3e3;\n}\n.logistics-services[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 18px;\n  font-size: clamp(30px, 3.2vw, 44px);\n  font-weight: var(--%NS%font-weight-regular);\n  line-height: 1.2;\n}\n.logistics-services-intro[_ngcontent-%COMP%] {\n  margin: 0 0 30px;\n  font-size: 16px;\n  line-height: 1.5;\n}\n.logistics-services-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 24px;\n}\n.logistics-service[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  align-items: center;\n}\n.logistics-service[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  aspect-ratio: 302 / 164;\n  object-fit: cover;\n}\n.logistics-service[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 24px 0 4px;\n  font-size: 30px;\n  font-weight: var(--%NS%font-weight-regular);\n  line-height: 1.2;\n}\n.logistics-service[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  line-height: 1.5;\n}\n.logistics-learn-more[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 44px;\n  margin-top: auto;\n  padding: 32px 8px 8px;\n  color: var(--%NS%color-primary);\n  font-size: 14px;\n  font-weight: var(--%NS%font-weight-bold);\n  letter-spacing: .5px;\n  text-decoration: none;\n}\n.logistics-learn-more[_ngcontent-%COMP%]   span[aria-hidden][_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n  font-weight: var(--%NS%font-weight-regular);\n}\n.logistics-learn-more[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n  text-underline-offset: 4px;\n}\n.service-link-description[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n.logistics-all-services[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 49px;\n  margin-top: 42px;\n  padding: 12px 21px;\n  border: 1px solid var(--%NS%color-primary);\n  border-radius: 26px;\n  color: var(--%NS%color-primary);\n  font-size: 16px;\n  line-height: 1.5;\n  text-decoration: none;\n  transition: background-color .2s, color .2s;\n}\n.logistics-all-services[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%color-primary);\n  color: var(--%NS%color-white);\n}\n@media (min-width: 641px) and (max-width: 1000px) {\n  .logistics-service[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n@media (max-width: 640px) {\n  .logistics-services[_ngcontent-%COMP%] {\n    padding: 36px 20px 0;\n  }\n  .logistics-services-inner[_ngcontent-%COMP%] {\n    padding-bottom: 40px;\n  }\n  .logistics-services-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 36px;\n    max-width: 380px;\n    margin-inline: auto;\n  }\n  .logistics-service[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    font-size: 28px;\n  }\n  .logistics-learn-more[_ngcontent-%COMP%] {\n    padding-top: 18px;\n  }\n  .logistics-all-services[_ngcontent-%COMP%] {\n    margin-top: 32px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .logistics-all-services[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=home.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ imports: [], selector: "app-home", template: `<section class="welcome" aria-labelledby="welcome-heading">
  <div class="welcome-content">
    <h1 id="welcome-heading">Welcome to <strong>EGXPRESS</strong></h1>
    <div class="service-cards" role="group" aria-label="Shipping services">
      <button type="button" class="service-card" [class.selected]="selectedAction() === 'rate'" [attr.aria-pressed]="selectedAction() === 'rate'" (click)="selectedAction.set('rate'); fileName.set('No file chosen')">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="m17 12 13-6 13 6-13 7-13-7Zm0 0v14m26-14v16l-13 7V19m-7-10 13 7"/><path d="M5 23h18v21H5zM9 28h10M9 32h10M9 36h4m3 0h3M9 40h10"/></svg>
        <span>GET RATE</span>
      </button>
      <button type="button" class="service-card" [class.selected]="selectedAction() === 'track'" [attr.aria-pressed]="selectedAction() === 'track'" (click)="selectedAction.set('track')">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="m6 12 15-7 15 7-15 7-15-7Zm0 0v19l15 8V19m15-7v10M13 9l15 7"/><circle cx="32" cy="31" r="8"/><path d="m38 37 7 7"/></svg>
        <span>TRACK</span>
      </button>
      <button type="button" class="service-card" [class.selected]="selectedAction() === 'ship'" [attr.aria-pressed]="selectedAction() === 'ship'" (click)="selectedAction.set('ship'); fileName.set('No file chosen')">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 14-7 14 7-14 7-14-7Zm0 0v22l14 7V19m14-7v12M12 9l14 7"/><path d="m22 30 8-1 5-9 3 1-2 9 8 3v3l-10-1-5 7-3-1 2-7-6-1z"/></svg>
        <span>SHIP</span>
      </button>
    </div>
    <div class="service-panel">
      @if (selectedAction() === 'track') {
        <fieldset class="tracking-options">
          <legend>Tracking type</legend>
          <label><input type="radio" name="tracking-type" [checked]="!multiple()" (change)="setMultiple(false)" /><span>Single DWB</span></label>
          <label><input type="radio" name="tracking-type" [checked]="multiple()" (change)="setMultiple(true)" /><span>Multiple DWB</span></label>
        </fieldset>
        <form class="tracking-input" (submit)="$event.preventDefault()">
          @if (multiple()) {
            <div class="file-picker">
              <label class="choose-file">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>
                <span>Choose File</span>
                <input class="file-control" type="file" name="waybills" aria-label="Choose shipment tracking file" (change)="selectFile($event)" />
              </label>
              <span class="file-name" aria-live="polite" [title]="fileName()">{{ fileName() }}</span>
            </div>
          } @else {
            <input type="text" name="waybill" aria-label="Your way bill number" placeholder="Your way bill number" />
          }
          <button type="submit">TRACK</button>
        </form>
        @if (multiple()) {
          <div class="example-row"><a class="download-example" href="#download-example">Download Example</a></div>
        }
      } @else if (selectedAction() === 'rate') {
        <a class="service-link" href="#get-rate">GET RATES AND TRANSIT TIMES</a>
      } @else {
        <a class="service-link" href="#ship">SHIP A SHIPMENT</a>
      }
    </div>
  </div>
</section>\r
\r
<section class="account-banner" aria-labelledby="account-banner-title">
  <div class="account-banner-inner">
    <div class="account-banner-message">
      <div class="account-banner-icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 34 25-25 17 4 4 17-25 25L9 34Z"/><circle cx="43" cy="22" r="4"/><path d="m23 33 10 10m-4-16 10 10m-22 2 10 10"/></svg>
      </div>
      <div class="account-banner-copy">
        <h2 id="account-banner-title">Sign up now to enjoy tailored shipping rates<br class="desktop-break" /> designed around your needs.</h2>
        <p>Services and solutions built to meet all your shipping needs.</p>
      </div>
    </div>
    <div class="account-banner-action">
      <a class="account-banner-button" href="#open-account">OPEN AN ACCOUNT</a>
    </div>
  </div>
</section>\r
<section class="manage-shipments" aria-labelledby="manage-shipments-title">
  <div class="manage-inner">
    <h2 id="manage-shipments-title">Manage your shipments</h2>
    <div class="shipment-services">
      <a class="shipment-service" href="#schedule-pickup">
        <svg viewBox="0 0 88 88" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="44" cy="44" r="35" stroke="#252525"/>
          <path d="M44 9a35 35 0 0 1 0 70" stroke="var(--color-primary)"/>
          <circle cx="44" cy="35" r="13" stroke="#252525"/>
          <path d="M44 22a13 13 0 0 1 0 26M23 71l2-13c1-7 7-10 19-10s18 3 19 10l2 13" stroke="var(--color-primary)"/>
          <path d="m23 71 2-13c1-7 7-10 19-10" stroke="#252525"/>
        </svg>
        <span>SCHEDULE PICKUP</span>
      </a>
      <a class="shipment-service" href="#find-locations">
        <svg viewBox="0 0 88 88" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <ellipse cx="44" cy="71" rx="24" ry="7" stroke="var(--color-primary)"/>
          <path d="M44 69S22 46 22 31a22 22 0 0 1 44 0c0 15-22 38-22 38Z" stroke="#252525"/>
          <circle cx="44" cy="31" r="8" stroke="#252525"/>
        </svg>
        <span>FIND LOCATIONS</span>
      </a>
      <a class="shipment-service" href="#check-shipping-rate">
        <svg viewBox="0 0 88 88" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="21" y="9" width="46" height="70" rx="2" stroke="#252525"/>
          <path d="M44 9h21a2 2 0 0 1 2 2v66a2 2 0 0 1-2 2H44" stroke="var(--color-primary)"/>
          <path d="M27 15h34v20H27z" stroke="var(--color-primary)"/>
          <path d="m31 24 5-5m-5 12 11-11" stroke="#252525"/>
          <path d="M27 42h6v6h-6zM38 42h6v6h-6zM49 42h6v6h-6zM27 53h6v6h-6zM38 53h6v6h-6zM49 53h6v6h-6zM27 64h6v6h-6zM38 64h6v6h-6zM49 64h6v6h-6z" stroke="#252525"/>
          <path d="M60 42h2v6h-2M60 53h2v17h-2" stroke="var(--color-primary)"/>
        </svg>
        <span>CHECK SHIPPING RATE</span>
      </a>
      <a class="shipment-service" href="#faqs">
        <svg viewBox="0 0 88 88" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="44" cy="44" r="38" stroke="var(--color-primary)"/>
          <circle cx="44" cy="44" r="33" stroke="#252525"/>
          <path d="M33 31a11 11 0 1 1 18 8c-5 4-7 6-7 12" stroke="#252525" stroke-width="4"/>
          <path d="M44 20a11 11 0 0 1 7 19c-5 4-7 6-7 12" stroke="var(--color-primary)" stroke-width="4"/>
          <circle cx="44" cy="62" r="2.6" fill="var(--color-primary)" stroke="none"/>
        </svg>
        <span>FAQS</span>
      </a>
    </div>
  </div>
</section>\r

<section class="company-video" aria-label="Discover EGXPRESS Logistics">
  <div class="company-video-player">
    <iframe
      src="https://www.youtube.com/embed/a2Xq2Q1u970"
      title="Your Logistics Partner of Choice \u2014 EGXpress Logistics"
      width="900"
      height="506"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</section>

<section class="logistics-services" id="services" aria-labelledby="logistics-services-title">
  <div class="logistics-services-inner">
    <h2 id="logistics-services-title">Your Logistics Partner of Choice!</h2>
    <p class="logistics-services-intro">Built around your business needs, EGXPRESS delivers seamless end to end logistics solutions covering everything from Express shipping and Freight Forwarding to Customs Clearance and Warehousing, ensuring smooth operations and global reach</p>
    <div class="logistics-services-grid">
      <article class="logistics-service">
        <img src="/images/domestic-express-302-164.png" alt="Orange EGXPRESS van for domestic deliveries" width="302" height="164" loading="lazy" />
        <h3>Domestic Express</h3>
        <p>Domestic Express Service provides fast, reliable, and secure delivery across Egypt, ensuring your shipments reach their destination on time with full...</p>
        <a class="logistics-learn-more" href="#domestic-express">LEARN MORE <span aria-hidden="true">\u203A</span><span class="service-link-description"> about Domestic Express</span></a>
      </article>
      <article class="logistics-service">
        <img src="/images/international-express-302-164.png" alt="FedEx cargo aircraft for international shipping" width="302" height="164" loading="lazy" />
        <h3>International Express</h3>
        <p>International Express Service offers fast, secure, and reliable global shipping, ensuring your shipments reach destinations worldwide with full...</p>
        <a class="logistics-learn-more" href="#international-express">LEARN MORE <span aria-hidden="true">\u203A</span><span class="service-link-description"> about International Express</span></a>
      </article>
      <article class="logistics-service">
        <img src="/images/freight-forwarding-302-164.png" alt="Aircraft, cargo ship and truck for freight forwarding" width="302" height="164" loading="lazy" />
        <h3>Freight Forwarding</h3>
        <p>Reliable freight forwarding by air, sea, and land, ensuring secure and efficient global cargo movement with full tracking.</p>
        <a class="logistics-learn-more" href="#freight-forwarding">LEARN MORE <span aria-hidden="true">\u203A</span><span class="service-link-description"> about Freight Forwarding</span></a>
      </article>
    </div>
    <a class="logistics-all-services" href="#all-services">VIEW ALL SERVICES</a>
  </div>
</section>\r
`, styles: ["/* src/app/features/puplic/pages/home/home.css */\n:host {\n  display: block;\n}\n.company-video {\n  padding: 36px 24px 60px;\n  background: var(--color-white);\n}\n.company-video-player {\n  width: 100%;\n  max-width: 900px;\n  aspect-ratio: 16 / 9;\n  margin-inline: auto;\n  overflow: hidden;\n  border-radius: 10px;\n  background: #000;\n}\n.company-video-player iframe {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n@media (max-width: 640px) {\n  .company-video {\n    padding: 24px 20px 40px;\n  }\n}\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.welcome {\n  position: relative;\n  display: grid;\n  place-items: center;\n  min-height: clamp(560px, 78svh, 735px);\n  padding: 48px 24px;\n  background:\n    linear-gradient(\n      90deg,\n      #03192585,\n      #07192550 90%,\n      #06172670),\n    url(/images/home-page-1920-735.png) center / cover no-repeat;\n  color: var(--color-white);\n  font-family: var(--font-family-base);\n}\n.welcome-content {\n  width: 100%;\n  max-width: 620px;\n  text-align: center;\n}\nh1 {\n  margin: 0 0 46px;\n  font-size: clamp(29px, 3vw, 44px);\n  font-weight: var(--font-weight-regular);\n  line-height: 1.2;\n  letter-spacing: -.8px;\n  text-shadow: 0 2px 14px #00000026;\n}\nh1 strong {\n  font-weight: var(--font-weight-regular);\n}\n.service-cards {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  align-items: center;\n  max-width: 540px;\n  margin: 0 auto;\n  filter: drop-shadow(0 10px 24px #0000001f);\n}\n.service-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 19px;\n  min-width: 0;\n  min-height: 148px;\n  padding: 24px 12px;\n  border: 0;\n  background: var(--color-white);\n  color: var(--color-black);\n  font: inherit;\n  cursor: pointer;\n  transition:\n    background-color .2s,\n    color .2s,\n    transform .2s;\n}\n.service-card:first-child {\n  border-radius: 8px 0 0 8px;\n}\n.service-card:last-child {\n  border-radius: 0 8px 8px 0;\n}\n.service-card svg {\n  width: 42px;\n  height: 42px;\n}\n.service-card span {\n  font-size: 14px;\n  font-weight: var(--font-weight-bold);\n  line-height: 1.4;\n}\n.service-card.selected {\n  position: relative;\n  z-index: 1;\n  background: var(--color-primary);\n  color: var(--color-white);\n  border-radius: 8px;\n  transform: scaleY(1.13);\n}\n.service-card.selected > * {\n  transform: scaleY(.885);\n}\n.service-card:not(.selected):hover {\n  background: #fff3e9;\n  color: var(--color-primary);\n}\n.service-panel {\n  max-width: 540px;\n  min-height: 145px;\n  margin: 44px auto 0;\n}\n.tracking-options {\n  display: flex;\n  justify-content: center;\n  gap: 34px;\n  padding: 0;\n  margin: 0 0 22px;\n  border: 0;\n}\n.tracking-options legend {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  clip-path: inset(50%);\n  overflow: hidden;\n}\n.tracking-options label {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 32px;\n  font-size: 15px;\n  cursor: pointer;\n}\n.tracking-options input {\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  margin: 0;\n  flex-shrink: 0;\n  border: 1px solid #d1d1d1;\n  border-radius: 50%;\n  background: var(--color-white);\n  cursor: pointer;\n}\n.tracking-options input:checked {\n  border: 5px solid var(--color-white);\n  background: var(--color-primary);\n}\n.tracking-input {\n  display: flex;\n  min-height: 58px;\n  border-radius: 6px;\n  background: var(--color-white);\n  box-shadow: 0 8px 25px #0000001a;\n}\n.tracking-input input,\n.tracking-input textarea {\n  flex: 1;\n  width: 100%;\n  min-width: 0;\n  padding: 18px;\n  border: 0;\n  border-radius: 6px 0 0 6px;\n  font: inherit;\n  font-size: 16px;\n  color: var(--color-black);\n  background: var(--color-white);\n}\n.tracking-input textarea {\n  resize: vertical;\n}\n.file-picker {\n  display: flex;\n  align-items: stretch;\n  flex: 1;\n  min-width: 0;\n}\n.choose-file {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  flex-shrink: 0;\n  padding: 16px;\n  border-radius: 6px 0 0 6px;\n  background: #30363b;\n  color: var(--color-white);\n  font-size: 14px;\n  font-weight: var(--font-weight-bold);\n  cursor: pointer;\n  transition: background-color .18s;\n}\n.choose-file:hover {\n  background: #41494f;\n}\n.choose-file svg {\n  width: 19px;\n  height: 19px;\n  flex-shrink: 0;\n}\n.tracking-input .file-control {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n.choose-file:focus-within {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 3px;\n  z-index: 1;\n}\n.file-name {\n  align-self: center;\n  min-width: 0;\n  padding: 16px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #777;\n  font-size: 14px;\n  text-align: left;\n}\n.example-row {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.download-example {\n  display: inline-flex;\n  align-items: center;\n  min-height: 36px;\n  padding: 6px 2px;\n  color: var(--color-white);\n  font-size: 13px;\n  text-decoration: underline;\n  text-decoration-color: #ffffff70;\n  text-underline-offset: 5px;\n  transition: text-decoration-color .18s;\n}\n.download-example:hover {\n  text-decoration-color: var(--color-white);\n}\n.tracking-input input::placeholder,\n.tracking-input textarea::placeholder {\n  color: #999;\n  opacity: 1;\n}\n.tracking-input button,\n.service-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 18px 30px;\n  border: 0;\n  border-radius: 0 6px 6px 0;\n  background: var(--color-primary);\n  color: var(--color-white);\n  font: inherit;\n  font-size: 15px;\n  font-weight: var(--font-weight-bold);\n  text-decoration: none;\n  cursor: pointer;\n}\n.tracking-input button:hover,\n.service-link:hover {\n  background: #e85f00;\n}\n.service-link {\n  min-height: 58px;\n  border-radius: 6px;\n  margin-top: 20px;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 4px;\n}\n@media (max-width: 1200px) {\n  .welcome {\n    min-height: clamp(540px, 76svh, 680px);\n  }\n}\n@media (max-width: 640px) {\n  .welcome {\n    min-height: 540px;\n    padding: 44px 20px;\n    background-position: 53% center;\n  }\n  h1 {\n    font-size: clamp(26px, 6.3vw, 36px);\n    margin-bottom: 38px;\n    letter-spacing: -.5px;\n  }\n  .service-card {\n    min-height: 120px;\n    padding: 20px 8px;\n    gap: 14px;\n  }\n  .service-card svg {\n    width: 35px;\n    height: 35px;\n  }\n  .service-card span {\n    font-size: 12px;\n  }\n  .service-panel {\n    margin-top: 32px;\n    min-height: 140px;\n  }\n  .tracking-options {\n    gap: 24px;\n    margin-bottom: 16px;\n  }\n  .tracking-options label {\n    font-size: 14px;\n    gap: 8px;\n  }\n  .tracking-input input,\n  .tracking-input textarea {\n    padding: 16px 12px;\n  }\n  .tracking-input button {\n    padding-inline: 20px;\n    font-size: 14px;\n  }\n  .choose-file {\n    gap: 6px;\n    padding: 14px 10px;\n    font-size: 12px;\n  }\n  .choose-file svg {\n    width: 16px;\n    height: 16px;\n  }\n  .file-name {\n    padding-inline: 10px;\n    font-size: 12px;\n  }\n  .file-picker + button {\n    padding-inline: 16px;\n  }\n}\n@media (max-width: 360px) {\n  .welcome {\n    padding-inline: 14px;\n  }\n  .tracking-options {\n    gap: 16px;\n  }\n  .tracking-input button {\n    padding-inline: 15px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .service-card {\n    transition: none;\n  }\n}\n.account-banner {\n  background:\n    linear-gradient(\n      to right,\n      var(--color-primary) 0%,\n      var(--color-primary) 60%,\n      var(--color-white) 60%,\n      var(--color-white) 100%);\n}\n.account-banner-inner {\n  display: grid;\n  grid-template-columns: 3fr 2fr;\n  max-width: 1280px;\n  margin-inline: auto;\n}\n.account-banner-message {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  min-width: 0;\n  padding: 30px 32px;\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.account-banner-icon {\n  display: grid;\n  place-items: center;\n  width: 78px;\n  height: 78px;\n  flex-shrink: 0;\n  border: 1px solid #ffffff38;\n  border-radius: 20px;\n  background: #ffffff0d;\n}\n.account-banner-icon svg {\n  width: 58px;\n  height: 58px;\n}\n.account-banner-copy {\n  min-width: 0;\n}\n.account-banner-copy h2 {\n  margin: 0;\n  font-size: clamp(19px, 1.6vw, 23px);\n  font-weight: var(--font-weight-bold);\n  line-height: 1.45;\n  letter-spacing: -.3px;\n}\n.account-banner-copy p {\n  margin: 10px 0 0;\n  color: #ffffffe6;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.account-banner-action {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 30px 32px;\n  background: var(--color-white);\n}\n.account-banner-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50px;\n  padding: 14px 28px;\n  border: 1.5px solid var(--color-primary);\n  border-radius: 28px;\n  color: var(--color-primary);\n  background: var(--color-white);\n  font-size: 13px;\n  font-weight: var(--font-weight-bold);\n  letter-spacing: .6px;\n  line-height: 1.5;\n  text-align: center;\n  text-decoration: none;\n  transition:\n    background-color .2s,\n    color .2s,\n    box-shadow .2s;\n}\n.account-banner-button:hover {\n  background: var(--color-primary);\n  color: var(--color-white);\n  box-shadow: 0 5px 16px #ff6b0026;\n}\n@media (max-width: 1000px) {\n  .account-banner-inner {\n    grid-template-columns: 2fr 1fr;\n  }\n  .account-banner-message {\n    gap: 18px;\n    padding: 26px 24px;\n  }\n  .account-banner-icon {\n    width: 62px;\n    height: 62px;\n    border-radius: 16px;\n  }\n  .account-banner-icon svg {\n    width: 46px;\n    height: 46px;\n  }\n  .account-banner-action {\n    padding: 24px;\n  }\n  .account-banner-button {\n    padding-inline: 20px;\n  }\n  .desktop-break {\n    display: none;\n  }\n}\n@media (max-width: 640px) {\n  .account-banner {\n    background: var(--color-primary);\n  }\n  .account-banner-inner {\n    grid-template-columns: 1fr;\n  }\n  .account-banner-message {\n    flex-direction: column;\n    text-align: center;\n    padding: 28px 24px 22px;\n    gap: 16px;\n  }\n  .account-banner-copy h2 {\n    font-size: 20px;\n  }\n  .account-banner-copy p {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .account-banner-action {\n    padding: 20px 24px;\n  }\n  .account-banner-button {\n    width: 100%;\n    max-width: 320px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .account-banner-button {\n    transition: none;\n  }\n}\n.manage-shipments {\n  background: var(--color-white);\n  color: var(--color-black);\n  padding: 68px 24px 48px;\n}\n.manage-inner {\n  max-width: 980px;\n  margin-inline: auto;\n  text-align: center;\n}\n.manage-inner h2 {\n  margin: 0 0 40px;\n  font-size: clamp(26px, 2.5vw, 34px);\n  line-height: 1.3;\n  font-weight: var(--font-weight-regular);\n  letter-spacing: -.6px;\n}\n.shipment-services {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 24px;\n}\n.shipment-service {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 24px;\n  min-width: 0;\n  padding: 12px 8px 18px;\n  border-radius: 12px;\n  color: #393939;\n  text-decoration: none;\n  transition: color .2s, background-color .2s;\n}\n.shipment-service svg {\n  width: 88px;\n  height: 88px;\n  flex-shrink: 0;\n  transition: transform .2s;\n}\n.shipment-service span {\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: var(--font-weight-bold);\n  letter-spacing: .2px;\n}\n.shipment-service:hover {\n  color: var(--color-primary);\n}\n.shipment-service:hover svg {\n  transform: translateY(-3px);\n}\n.shipment-service svg [stroke]:not([stroke=none]) {\n  transition: stroke .2s;\n}\n.shipment-service svg [fill]:not([fill=none]) {\n  transition: fill .2s;\n}\n.shipment-service:hover svg [stroke]:not([stroke=none]) {\n  stroke: var(--color-black);\n}\n.shipment-service:hover svg [fill]:not([fill=none]) {\n  fill: var(--color-black);\n}\n@media (max-width: 640px) {\n  .manage-shipments {\n    padding: 42px 20px 32px;\n  }\n  .manage-inner h2 {\n    margin-bottom: 26px;\n  }\n  .shipment-services {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 18px 12px;\n  }\n  .shipment-service {\n    gap: 16px;\n    padding: 12px 4px 16px;\n  }\n  .shipment-service svg {\n    width: 72px;\n    height: 72px;\n  }\n  .shipment-service span {\n    font-size: 12px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .shipment-service,\n  .shipment-service svg,\n  .shipment-service svg [stroke],\n  .shipment-service svg [fill] {\n    transition: none;\n  }\n  .shipment-service:hover svg {\n    transform: none;\n  }\n}\n.logistics-services {\n  padding: 64px 24px 0;\n  background: var(--color-white);\n  color: #414141;\n  text-align: center;\n}\n.logistics-services-inner {\n  max-width: 956px;\n  margin-inline: auto;\n  padding-bottom: 60px;\n  border-bottom: 1px solid #e3e3e3;\n}\n.logistics-services h2 {\n  margin: 0 0 18px;\n  font-size: clamp(30px, 3.2vw, 44px);\n  font-weight: var(--font-weight-regular);\n  line-height: 1.2;\n}\n.logistics-services-intro {\n  margin: 0 0 30px;\n  font-size: 16px;\n  line-height: 1.5;\n}\n.logistics-services-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 24px;\n}\n.logistics-service {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  align-items: center;\n}\n.logistics-service img {\n  display: block;\n  width: 100%;\n  height: auto;\n  aspect-ratio: 302 / 164;\n  object-fit: cover;\n}\n.logistics-service h3 {\n  margin: 24px 0 4px;\n  font-size: 30px;\n  font-weight: var(--font-weight-regular);\n  line-height: 1.2;\n}\n.logistics-service p {\n  margin: 0;\n  font-size: 16px;\n  line-height: 1.5;\n}\n.logistics-learn-more {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 44px;\n  margin-top: auto;\n  padding: 32px 8px 8px;\n  color: var(--color-primary);\n  font-size: 14px;\n  font-weight: var(--font-weight-bold);\n  letter-spacing: .5px;\n  text-decoration: none;\n}\n.logistics-learn-more span[aria-hidden] {\n  font-size: 22px;\n  line-height: 1;\n  font-weight: var(--font-weight-regular);\n}\n.logistics-learn-more:hover {\n  text-decoration: underline;\n  text-underline-offset: 4px;\n}\n.service-link-description {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n.logistics-all-services {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 49px;\n  margin-top: 42px;\n  padding: 12px 21px;\n  border: 1px solid var(--color-primary);\n  border-radius: 26px;\n  color: var(--color-primary);\n  font-size: 16px;\n  line-height: 1.5;\n  text-decoration: none;\n  transition: background-color .2s, color .2s;\n}\n.logistics-all-services:hover {\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n@media (min-width: 641px) and (max-width: 1000px) {\n  .logistics-service h3 {\n    font-size: 24px;\n  }\n}\n@media (max-width: 640px) {\n  .logistics-services {\n    padding: 36px 20px 0;\n  }\n  .logistics-services-inner {\n    padding-bottom: 40px;\n  }\n  .logistics-services-grid {\n    grid-template-columns: 1fr;\n    gap: 36px;\n    max-width: 380px;\n    margin-inline: auto;\n  }\n  .logistics-service h3 {\n    margin-top: 20px;\n    font-size: 28px;\n  }\n  .logistics-learn-more {\n    padding-top: 18px;\n  }\n  .logistics-all-services {\n    margin-top: 32px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .logistics-all-services {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=home.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/app/features/puplic/pages/home/home.ts", lineNumber: 9 });
})();
export {
  Home
};
//# debugId=85b5dadc-5d4d-542d-a3c2-e6b82e8f3e57
//# sourceMappingURL=chunk-UJRZJJHC.js.map
